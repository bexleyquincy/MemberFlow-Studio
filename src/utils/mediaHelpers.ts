export type DetectedMediaKind = 'youtube' | 'vimeo' | 'loom' | 'video' | 'image' | 'iframe';

export interface ParsedMediaSource {
  kind: DetectedMediaKind;
  embedUrl: string;
  originalUrl: string;
}

export function normalizeExternalUrl(rawUrl: string): string {
  const trimmed = (rawUrl || '').trim();
  if (!trimmed) return '';
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:')
  ) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function parseMediaSource(rawUrl: string): ParsedMediaSource {
  const originalUrl = normalizeExternalUrl(rawUrl);
  const lower = originalUrl.toLowerCase();

  if (!originalUrl) {
    return { kind: 'image', embedUrl: '', originalUrl: '' };
  }

  // Data URL detection
  if (lower.startsWith('data:video/')) {
    return { kind: 'video', embedUrl: originalUrl, originalUrl };
  }
  if (lower.startsWith('data:image/')) {
    return { kind: 'image', embedUrl: originalUrl, originalUrl };
  }

  // YouTube
  const ytMatch = originalUrl.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i
  );
  if (ytMatch && ytMatch[1]) {
    return {
      kind: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&autoplay=1`,
      originalUrl
    };
  }

  // Vimeo
  const vimeoMatch = originalUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      kind: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
      originalUrl
    };
  }

  // Loom
  const loomMatch = originalUrl.match(/loom\.com\/(?:share|embed)\/([A-Za-z0-9]+)/i);
  if (loomMatch && loomMatch[1]) {
    return {
      kind: 'loom',
      embedUrl: `https://www.loom.com/embed/${loomMatch[1]}`,
      originalUrl
    };
  }

  // Direct video files
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(lower)) {
    return { kind: 'video', embedUrl: originalUrl, originalUrl };
  }

  // Direct image files or common image hosts
  if (
    /\.(png|jpe?g|gif|webp|avif|svg|bmp)(\?.*)?$/i.test(lower) ||
    lower.includes('i.ibb.co/') ||
    lower.includes('/assets/')
  ) {
    return { kind: 'image', embedUrl: originalUrl, originalUrl };
  }

  // Fallback: render embeddable iframe
  return { kind: 'iframe', embedUrl: originalUrl, originalUrl };
}

export function isVideoLikeUrl(rawUrl: string): boolean {
  const kind = parseMediaSource(rawUrl).kind;
  return kind === 'youtube' || kind === 'vimeo' || kind === 'loom' || kind === 'video';
}

export function triggerExternalLink(url: string, newTab = true): void {
  const safeUrl = normalizeExternalUrl(url);
  if (!safeUrl) return;
  const anchor = document.createElement('a');
  anchor.href = safeUrl;
  if (newTab) {
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
  }
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export function triggerFileDownload(url: string, filename?: string): void {
  const safeUrl = normalizeExternalUrl(url);
  if (!safeUrl) return;
  const anchor = document.createElement('a');
  anchor.href = safeUrl;
  anchor.download = (filename || '').trim() || 'memberflow-resource';
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
