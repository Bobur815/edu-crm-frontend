'use client';

import { Grid2 as Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useDashboardCounts } from '@/features/stats/useDashboardCounts';
import PageHeader from '@/components/ui/PageHeader';
import StatCard from '@/components/ui/StatCard';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const { loading, error, counts } = useDashboardCounts();

  return (
    <div>
      <PageHeader title={t('title')} />
      {error ? (
        <div className="text-red-600 text-sm mt-2">
          {(error as any)?.message ?? 'Failed to load dashboard counts'}
        </div>
      ) : null}

      <Grid container spacing={2} sx={{ opacity: loading ? 0.6 : 1 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title={t('branches')} value={counts.branches} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title={t('students')} value={counts.students} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title={t('teachers')} value={counts.teachers} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title={t('courses')} value={counts.courses} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title={t('groups')} value={counts.groups} />
        </Grid>
      </Grid>
    </div>
  );
}
