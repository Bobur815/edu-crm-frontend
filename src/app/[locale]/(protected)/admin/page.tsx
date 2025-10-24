'use client';
import PageHeader from '@/components/ui/PageHeader';
import StatCard from '@/components/ui/StatCard';
import { Grid2 as Grid } from '@mui/material';
import { useDashboardCounts } from '@/features/stats/useDashboardCounts';

export default function AdminDashboard() {
  const { loading, counts, error } = useDashboardCounts();
  return (
    <div>
      <PageHeader title="Dashboard" />
      {error ? <div className="text-red-600 text-sm">{String((error as any)?.message ?? 'Failed')}</div> : null}
      <Grid container spacing={2} sx={{ opacity: loading ? 0.6 : 1 }}>
        <Grid size={{ xs: 12, md: 3 }}><StatCard title="Branches" value={counts.branches} /></Grid>
        <Grid size={{ xs: 12, md: 3 }}><StatCard title="Students" value={counts.students} /></Grid>
        <Grid size={{ xs: 12, md: 3 }}><StatCard title="Teachers" value={counts.teachers} /></Grid>
        <Grid size={{ xs: 12, md: 3 }}><StatCard title="Courses" value={counts.courses} /></Grid>
        <Grid size={{ xs: 12, md: 3 }}><StatCard title="Groups" value={counts.groups} /></Grid>
      </Grid>
    </div>
  );
}
