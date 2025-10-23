// src/i18n.ts
export const locales = ['uz', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'uz';

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}
