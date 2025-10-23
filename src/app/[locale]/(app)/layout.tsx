// src/app/[locale]/(app)/layout.tsx
import { Container } from '@mui/material';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCESS_COOKIE } from '@/lib/tokens';

export default function AppShellLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const token = cookies().get(ACCESS_COOKIE)?.value;
  if (!token) {
    redirect(`/${params.locale}/login`);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 bg-gray-50">
        <Topbar />
        <Container maxWidth="xl" className="py-6">
          {children}
        </Container>
      </main>
    </div>
  );
}
