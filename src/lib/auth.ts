// Server-safe minimal JWT decode (no signature verification).
// Good enough for routing decisions; don't use it for security-sensitive checks.

import { JwtPayload } from "@/types";

/** Decode base64url safely */
function b64urlToString(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 ? 4 - (b64.length % 4) : 0;
  const b64p = b64 + '='.repeat(pad);
  return Buffer.from(b64p, 'base64').toString('utf8');
}

export function decodeJwt(token: string | undefined | null): JwtPayload | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const json = b64urlToString(parts[1] || '');
    const payload = JSON.parse(json);
    return payload as JwtPayload;
  } catch {
    return null;
  }
}
