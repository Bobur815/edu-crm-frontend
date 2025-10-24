// src/app/[locale]/page.tsx
import { decodeJwt, roleToPanel } from '@/lib/api/auth';
import { ACCESS_COOKIE } from '@/lib/tokens';
import { JwtPayload } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface LocalePageProps {
  params: { locale: string };
}

export default function LocalePage({ params }: LocalePageProps) {
  const token = cookies().get(ACCESS_COOKIE)?.value;
  if (!token) {
    return redirect(`/${params.locale}/login`);
  }
  const payload = decodeJwt<JwtPayload>(token);
  const panel = roleToPanel(payload?.role);
  
  return redirect(`/${params.locale}/${panel}`);
}