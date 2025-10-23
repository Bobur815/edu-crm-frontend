// src/i18n/routing.ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'uz', 'ru'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // pretty URLs for default locale
});
