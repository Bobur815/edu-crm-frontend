// src/app/[locale]/(protected)/admin/settings/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PageHeader from '@/components/ui/PageHeader';

export default function SettingsPage() {
  const t = useTranslations('settings');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  // Redirect to courses as the default settings page
  useEffect(() => {
    router.replace(`/${locale}/admin/settings/courses`);
  }, [router, locale]);

  return (
    <div className='p-6'>
      <PageHeader title={t('title') || 'Settings'} />
      <div className="flex h-64">
        <div className="text-center">
          <div className="text-gray-500 mb-2">{t('loading') || 'Loading...'}</div>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}