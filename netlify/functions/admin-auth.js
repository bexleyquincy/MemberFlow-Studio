import crypto from 'crypto';

const SALT = 'mf_studio_v1';
const DEFAULT_CREDENTIAL_DIGEST =
  '6097266560b4a5b589f22fc74ac2474777acd5c08b2b0f21e6027f755c045367';
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  `mf_session_${DEFAULT_CREDENTIAL_DIGEST.slice(0, 24)}`;
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

// Basic IP-based brute-force protection
const attemptMap = new Map();
const WINDOW_MS = 5 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 30 * 1000;

function getClientIp(headers = {}) {
  return (
    headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    headers['client-ip'] ||
    'unknown'
  );
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = attemptMap.get(ip);
  if (!record) return { blocked: false, retryAfter: 0 };

  if (record.lockedUntil && now < record.lockedUntil) {
    return {
      blocked: true,
      retryAfter: Math.ceil((record.lockedUntil - now) / 1000)
    };
  }

  if (now - record.firstAttempt > WINDOW_MS) {
    attemptMap.delete(ip);
  }
  return { blocked: false, retryAfter: 0 };
}

function recordFailure(ip) {
  const now = Date.now();
  const record = attemptMap.get(ip) || {
    count: 0,
    firstAttempt: now,
    lockedUntil: 0
  };
  if (now - record.firstAttempt > WINDOW_MS) {
    record.count = 0;
    record.firstAttempt = now;
    record.lockedUntil = 0;
  }
  record.count += 1;
  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
  }
  attemptMap.set(ip, record);
}

function clearFailures(ip) {
  attemptMap.delete(ip);
}

function sha256Hex(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function safeHexEqual(hexA, hexB) {
  if (typeof hexA !== 'string' || typeof hexB !== 'string') return false;
  if (hexA.length !== hexB.length) return false;
  return crypto.timingSafeEqual(Buffer.from(hexA, 'utf8'), Buffer.from(hexB, 'utf8'));
}

function verifyCredentials(email, password) {
  if (typeof email !== 'string' || typeof password !== 'string') return false;
  const normalizedEmail = email.trim().toLowerCase();

  // Optional runtime env override
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const envDigest = sha256Hex(
      `${SALT}::${process.env.ADMIN_EMAIL.trim().toLowerCase()}::${process.env.ADMIN_PASSWORD}`
    );
    const inputDigest = sha256Hex(`${SALT}::${normalizedEmail}::${password}`);
    return safeHexEqual(inputDigest, envDigest);
  }

  const inputDigest = sha256Hex(`${SALT}::${normalizedEmail}::${password}`);
  return safeHexEqual(inputDigest, DEFAULT_CREDENTIAL_DIGEST);
}

function signToken(email) {
  const payload = Buffer.from(
    JSON.stringify({
      email,
      exp: Date.now() + SESSION_TTL_MS
    }),
    'utf8'
  ).toString('base64url');
  const sig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  return `${payload}.${sig}`;
}

function verifyToken(token) {
  if (typeof token !== 'string' || !token.includes('.')) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  if (!safeHexEqual(sig, expectedSig)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!parsed.email || typeof parsed.exp !== 'number' || Date.now() > parsed.exp) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json', Allow: 'POST' },
      body: JSON.stringify({ error: 'Method not allowed.' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid request payload.' })
    };
  }

  if (body.action === 'verify') {
    const session = verifyToken(body.token);
    if (!session) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authenticated: false })
      };
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authenticated: true,
        email: session.email,
        expiresAt: session.exp
      })
    };
  }

  const ip = getClientIp(event.headers);
  const limit = checkRateLimit(ip);
  if (limit.blocked) {
    return {
      statusCode: 429,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: `Too many failed attempts. Please wait ${limit.retryAfter}s before trying again.`,
        retryAfter: limit.retryAfter
      })
    };
  }

  const email = (body.email || '').trim().toLowerCase();
  const password = body.password || '';

  if (!verifyCredentials(email, password)) {
    recordFailure(ip);
    const updatedLimit = checkRateLimit(ip);
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: updatedLimit.blocked
          ? `Too many failed attempts. Locked for ${updatedLimit.retryAfter}s.`
          : 'Invalid admin email or password. Access denied.',
        retryAfter: updatedLimit.retryAfter || 0
      })
    };
  }

  clearFailures(ip);
  const token = signToken(email);
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authenticated: true,
      email,
      token,
      expiresAt: Date.now() + SESSION_TTL_MS
    })
  };
};
