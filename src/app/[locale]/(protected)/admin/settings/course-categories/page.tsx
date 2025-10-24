// src/app/[locale]/(protected)/admin/settings/course-categories/page.tsx
'use client';

import * as React from 'react';
import PageHeader from '@/components/ui/PageHeader';
import EntityTable, { Column } from '@/components/ui/EntityTable';
import RightDrawer from '@/components/ui/RightDrawer';
import AddCourseCategoryForm, { CourseCategoryFormValue } from '@/components/forms/AddCourseCategoryForm';
import type { CourseCategory } from '@/types';
import { useTranslations } from 'next-intl';
import { useCourseCategories, createCourseCategory } from '@/features/course-categories/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CourseCategoriesPage() {
  const t = useTranslations('courseCategories');

  const { data: rows = [], isLoading, error } = useCourseCategories();

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<CourseCategoryFormValue>({
    name: '',
    branchId: 0,
  });

  const qc = useQueryClient();
  const createMut = useMutation({
    mutationFn: createCourseCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['course-categories'] });
      setOpen(false);
      setForm({ name: '', branchId: 0 });
    },
  });

  const columns: Column<CourseCategory>[] = [
    { key: 'name', header: t('name') ?? 'Category Name' },
    { key: 'branchId', header: t('branch') ?? 'Branch ID' },
  ];

  const openDrawer = () => {
    setForm({
      name: '',
      branchId: 0,
    });
    setOpen(true);
  };

  const save = () => {
    createMut.mutate(form);
  };

  return (
    <div className="p-6">
      <PageHeader title={t('title') || 'Course Categories'} actionLabel={t('addCategory') || 'Add Category'} onAction={openDrawer} />

      {error ? (
        <div className="text-red-600 text-sm mb-3">{String((error as any)?.message ?? 'Failed to load')}</div>
      ) : null}

      <EntityTable data={rows} columns={columns} loading={isLoading || createMut.isPending} />

      <RightDrawer
        title={t('addCategory') || 'Add Course Category'}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={save}
        submitting={createMut.isPending}
      >
        <AddCourseCategoryForm value={form} onChange={setForm} />
      </RightDrawer>
    </div>
  );
}