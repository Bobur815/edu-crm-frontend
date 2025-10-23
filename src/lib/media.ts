// src/lib/media.ts
let cachedOrigin: string | null = null;

function resolveApiOrigin(): string {
  if (cachedOrigin) return cachedOrigin;

  const raw = process.env.NEXT_PUBLIC_API_BASE || "";

  // Try to parse env URL and keep only its origin (scheme + host + port)
  if (raw) {
    try {
      cachedOrigin = new URL(raw).origin;
      return cachedOrigin;
    } catch {
      // ignore and try next fallback
    }
  }

  // On server we don't have window; return empty (absUrl will no-op for relative)
  if (typeof window === "undefined") {
    cachedOrigin = "";
    return cachedOrigin;
  }

  // Client fallback: current site origin
  cachedOrigin = window.location.origin;
  return cachedOrigin;
}

export const API_ORIGIN = resolveApiOrigin();

/** Build an absolute URL using API_ORIGIN for relative paths. */
export function absUrl(url?: string | null): string {
  if (!url) return "";

  // Already absolute (http/https), data URLs, or protocol-relative
  if (/^(https?:)?\/\//i.test(url) || /^data:/i.test(url)) return url;

  const origin = API_ORIGIN; // may be '' on server if env is missing
  const path = url.startsWith("/") ? url : `/${url}`;
  return origin ? `${origin}${path}` : path; // server-safe: returns relative if no origin
}
