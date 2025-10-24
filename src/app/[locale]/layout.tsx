// src/app/[locale]/layout.tsx
import '../global.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/lib/theme';
import QueryProvider from '@/providers/QueryProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Educational CRM',
  description: 'Simple Educational CRM frontend',
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(params.locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <QueryProvider>{children}</QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}