// src/app/[locale]/(protected)/admin/settings/courses/page.tsx
'use client';

import * as React from 'react';
import PageHeader from '@/components/ui/PageHeader';
import EntityTable, { Column } from '@/components/ui/EntityTable';
import StatusChip from '@/components/ui/StatusChip';
import RightDrawer from '@/components/ui/RightDrawer';
import AddCourseForm, { CourseFormValue } from '@/components/forms/AddCourseForm';
import type { Course } from '@/types';
import { useTranslations } from 'next-intl';
import { useCourses, createCourse } from '@/features/courses/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const fmtPrice = (n: number) => new Intl.NumberFormat('uz-UZ').format(n) + " so'm";

export default function CoursesPage() {
  const t = useTranslations('courses');

  const { data: rows = [], isLoading, error } = useCourses();

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<CourseFormValue>({
    name: '',
    categoryId: 0,
    branchId: 0,
    price: 0,
    duration_hours: 0,
    duration_months: 0,
    status: 'ACTIVE',
    description: '',
  });

  const qc = useQueryClient();
  const createMut = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['courses'] });
      setOpen(false);
    },
  });

  const columns: Column<Course>[] = [
    { key: 'name', header: t('name') ?? 'Name' },
    { key: 'categoryId', header: t('category') ?? 'Category' },
    {
      key: 'duration_hours',
      header: t('duration') ?? 'Duration',
      render: (r) => `${r.duration_hours}h / ${r.duration_months}mo`,
    },
    { key: 'price', header: t('price') ?? 'Price', render: (r) => fmtPrice(r.price) },
    { key: 'status', header: t('status') ?? 'Status', render: (r) => <StatusChip value={r.status} /> },
  ];

  const openDrawer = () => {
    setForm({
      name: '',
      categoryId: 0,
      branchId: 0,
      price: 0,
      duration_hours: 0,
      duration_months: 0,
      status: 'ACTIVE',
      description: '',
    });
    setOpen(true);
  };

  const save = () => {
    // If your backend sets branchId from JWT, you can omit branchId here.
    createMut.mutate({
      name: form.name,
      categoryId: Number(form.categoryId),
      branchId: Number(form.branchId),
      price: Number(form.price),
      duration_hours: Number(form.duration_hours),
      duration_months: Number(form.duration_months),
      status: form.status,
      description: form.description ?? null,
    } as any);
  };

  return (
    <div>
      <PageHeader title={t('title')} actionLabel={t('addCourse')} onAction={openDrawer} />

      {error ? (
        <div className="text-red-600 text-sm mb-3">
          {String((error as any)?.message ?? 'Failed to load')}
        </div>
      ) : null}

      <EntityTable data={rows} columns={columns} loading={isLoading || createMut.isPending} />

      <RightDrawer
        title={t('addCourse')}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={save}
        submitting={createMut.isPending}
      >
        <AddCourseForm value={form} onChange={setForm} />
      </RightDrawer>
    </div>
  );
}
