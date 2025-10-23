import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCESS_COOKIE } from '@/lib/tokens';
import { decodeJwt } from '@/lib/auth';

export default function LocaleIndex({ params }: { params: { locale: string } }) {
  const token = cookies().get(ACCESS_COOKIE)?.value;
  if (!token) redirect(`/${params.locale}/login`);

  const payload = decodeJwt(token);
  const role = (payload?.role ?? '').toUpperCase();

  // ADMIN/MANAGER → full app (students is an OK landing)
  // TEACHER → groups (example)
  // STUDENT → courses (profile is reachable from UI)
  if (role === 'STUDENT') return redirect(`/${params.locale}/courses`);
  if (role === 'TEACHER') return redirect(`/${params.locale}/groups`);
  return redirect(`/${params.locale}/students`);
}
