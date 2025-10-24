// src/app/layout.tsx
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Educational CRM',
  description: 'Simple Educational CRM frontend',
};

// Root layout - minimal setup for locale redirection
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
