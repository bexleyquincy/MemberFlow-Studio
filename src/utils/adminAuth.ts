const SESSION_STORAGE_KEY = 'memberflow_admin_session';
const LOCKOUT_STORAGE_KEY = 'memberflow_admin_lockout';
const AUTH_SALT = 'mf_studio_v1';
const CREDENTIAL_DIGEST =
  '6097266560b4a5b589f22fc74ac2474777acd5c08b2b0f21e6027f755c045367';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

export interface AdminSession {
  email: string;
  token: string;
  expiresAt: number;
}

export interface AuthResult {
  success: boolean;
  session?: AdminSession;
  error?: string;
  retryAfter?: number;
}

async function sha256HexClient(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function getLockoutRemainingSeconds(): number {
  try {
    const raw = sessionStorage.getItem(LOCKOUT_STORAGE_KEY);
    if (!raw) return 0;
    const data = JSON.parse(raw);
    if (data.lockedUntil && Date.now() < data.lockedUntil) {
      return Math.ceil((data.lockedUntil - Date.now()) / 1000);
    }
  } catch {
    return 0;
  }
  return 0;
}

function recordClientFailure(): number {
  try {
    const raw = sessionStorage.getItem(LOCKOUT_STORAGE_KEY);
    const prev = raw ? JSON.parse(raw) : { count: 0, lockedUntil: 0 };
    const count = (prev.count || 0) + 1;
    let lockedUntil = 0;
    if (count >= 5) {
      lockedUntil = Date.now() + 30 * 1000;
    }
    sessionStorage.setItem(
      LOCKOUT_STORAGE_KEY,
      JSON.stringify({ count: count >= 5 ? 0 : count, lockedUntil })
    );
    return lockedUntil ? 30 : 0;
  } catch {
    return 0;
  }
}

function clearClientLockout(): void {
  try {
    sessionStorage.removeItem(LOCKOUT_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getStoredAdminSession(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AdminSession;
    if (!parsed.token || !parsed.email || Date.now() > parsed.expiresAt) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function verifyStoredAdminSession(): Promise<AdminSession | null> {
  const local = getStoredAdminSession();
  if (!local) return null;

  if (local.token.startsWith('local-')) {
    return local;
  }

  try {
    const res = await fetch('/.netlify/functions/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'verify', token: local.token })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.authenticated) return local;
    }
    if (res.status === 401) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
  } catch {
    // Keep valid non-expired session on transient network error
  }
  return local;
}

export async function authenticateAdmin(
  email: string,
  password: string
): Promise<AuthResult> {
  const remaining = getLockoutRemainingSeconds();
  if (remaining > 0) {
    return {
      success: false,
      error: `Too many failed attempts. Please wait ${remaining}s before trying again.`,
      retryAfter: remaining
    };
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return {
      success: false,
      error: 'Please enter both your admin email and password.'
    };
  }

  // Primary: server-side Netlify Function / Vite dev proxy verification
  try {
    const response = await fetch('/.netlify/functions/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'login',
        email: normalizedEmail,
        password
      })
    });

    if (response.status !== 404) {
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.authenticated && data.token) {
        clearClientLockout();
        const session: AdminSession = {
          email: data.email || normalizedEmail,
          token: data.token,
          expiresAt: data.expiresAt || Date.now() + SESSION_DURATION_MS
        };
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
        return { success: true, session };
      }

      return {
        success: false,
        error: data.error || 'Invalid admin email or password. Access denied.',
        retryAfter: data.retryAfter
      };
    }
  } catch {
    // Fall through to Web Crypto SHA-256 verification if function endpoint is unavailable
  }

  // Fallback for static-only hosts: salted SHA-256 comparison (zero plaintext in bundle)
  const digest = await sha256HexClient(`${AUTH_SALT}::${normalizedEmail}::${password}`);
  if (digest === CREDENTIAL_DIGEST) {
    clearClientLockout();
    const session: AdminSession = {
      email: normalizedEmail,
      token: `local-${digest.slice(0, 16)}-${Date.now()}`,
      expiresAt: Date.now() + SESSION_DURATION_MS
    };
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    return { success: true, session };
  }

  const lockSec = recordClientFailure();
  return {
    success: false,
    error: lockSec
      ? `Too many failed attempts. Locked for ${lockSec}s.`
      : 'Invalid admin email or password. Access denied.',
    retryAfter: lockSec
  };
}

export function logoutAdmin(): void {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // ignore
  }
}
