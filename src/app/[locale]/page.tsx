// src/app/[locale]/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCESS_COOKIE } from '@/lib/tokens';
import { decodeJwt } from '@/lib/auth';

export default function LocaleIndex({ params }: { params: { locale: string } }) {
  const token = cookies().get(ACCESS_COOKIE)?.value;
  if (!token) redirect(`/${params.locale}/login`);

  const role = (decodeJwt(token)?.role ?? '').toUpperCase();

  if (role === 'STUDENT')  return redirect(`/${params.locale}/courses`);
  if (role === 'TEACHER')  return redirect(`/${params.locale}/groups`);
  // ✅ ADMIN / MANAGER: open admin panel
  return redirect(`/${params.locale}/dashboard`);
}
