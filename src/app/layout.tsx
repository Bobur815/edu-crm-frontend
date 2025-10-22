import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { CssBaseline, ThemeProvider, Container } from '@mui/material';
import theme from '@/lib/theme';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';


const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'Educational CRM',
  description: 'Simple Educational CRM frontend (mocked)'
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-0 md:ml-64 bg-gray-50">
              <Topbar />
              <Container maxWidth="xl" className="py-6">
                {children}
              </Container>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}