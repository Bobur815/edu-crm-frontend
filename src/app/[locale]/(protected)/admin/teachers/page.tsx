'use client';

import * as React from 'react';
import PageHeader from 'src/components/ui/PageHeader';
import EntityTable, { Column } from 'src/components/ui/EntityTable';
import StatusChip from 'src/components/ui/StatusChip';
import RightDrawer from 'src/components/ui/RightDrawer';
import AddTeacherForm, { TeacherFormValue } from 'src/components/forms/AddTeacherForm';
import type { Teacher } from '@/types';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTeachers, createTeacher } from '@/features/teachers/api';

export default function TeachersPage() {
  const t = useTranslations('teachers');

  // Fetch list from API
  const { data: rows = [], isLoading, error } = useTeachers();

  // Drawer state
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<TeacherFormValue>({
    fullname: '',
    phone: '',
    email: '',
    gender: 'MALE',
    branchId: 0,
    status: 'ACTIVE',
    birthday: '',
    photo: '',
    description: '',
  });

  // Create mutation
  const qc = useQueryClient();
  const createMut = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['teachers'] });
      setOpen(false);
    },
  });

  const columns: Column<Teacher>[] = [
    { key: 'fullname', header: t('fullName') ?? 'Full name' },
    { key: 'phone', header: t('phone') ?? 'Phone' },
    { key: 'email', header: t('email') ?? 'Email' },
    { key: 'gender', header: t('gender') ?? 'Gender' },
    { key: 'branchId', header: t('branch') ?? 'Branch' },
    { key: 'status', header: t('status') ?? 'Status', render: (r) => <StatusChip value={r.status} /> },
  ];

  const openDrawer = () => {
    setForm({
      fullname: '',
      phone: '',
      email: '',
      gender: 'MALE',
      branchId: 0,
      status: 'ACTIVE',
      birthday: '',
      photo: '',
      description: '',
    });
    setOpen(true);
  };

  const save = () => {
    createMut.mutate({
      fullname: form.fullname,
      phone: form.phone,
      email: form.email || undefined,
      gender: form.gender,
      branchId: Number(form.branchId),
      status: form.status,
      birthday: form.birthday || null,
      // photo upload is a separate flow; keep as is or omit
      photo: form.photo || undefined,
      description: form.description || undefined,
    });
  };

  return (
    <div>
      <PageHeader title={t('title')} actionLabel={t('addTeacher')} onAction={openDrawer} />

      {error ? (
        <div className="text-red-600 text-sm mb-3">{String((error as any)?.message ?? 'Failed to load')}</div>
      ) : null}

      <EntityTable data={rows} columns={columns} loading={isLoading || createMut.isPending} />

      <RightDrawer
        title={t('addTeacher')}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={save}
        submitting={createMut.isPending}
      >
        <AddTeacherForm value={form} onChange={setForm} />
      </RightDrawer>
    </div>
  );
}
