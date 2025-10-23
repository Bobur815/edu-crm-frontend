// src/app/[locale]/layout.tsx
import type { Metadata } from 'next';
import './global.css'; // <-- make sure this file exists next to this layout
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/lib/theme';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import QueryProvider from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'Educational CRM',
  description: 'Simple Educational CRM frontend'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <QueryProvider>
              {children} {/* (app) and (auth) layouts render inside here */}
            </QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
