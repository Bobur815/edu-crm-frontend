export function decodeJwt<T = Record<string, unknown>>(token: string | undefined | null): T | null {
  if (!token) return null;
  try {
    const [, payload] = token.split('.');
    const json = Buffer.from(payload, 'base64').toString('utf8');
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export function roleToPanel(role?: string): 'admin'|'teacher'|'student' {
  switch ((role || '').toUpperCase()) {
    case 'TEACHER': return 'teacher';
    case 'STUDENT': return 'student';
    // ADMIN/MANAGER -> admin
    default: return 'admin';
  }
}
