import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decodeJwt, roleToPanel } from '@/lib/api/auth';
import { Container } from '@mui/material';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { ACCESS_COOKIE } from '@/lib/tokens';
import { JwtPayload } from '@/types';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get(ACCESS_COOKIE)?.value;
  if (!token) return redirect('/login');

  const role = decodeJwt<JwtPayload>(token)?.role;
  if (roleToPanel(role) !== 'teacher') {
    // logged in but wrong panel -> send to their own
    return redirect(`/${roleToPanel(role)}`);
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
