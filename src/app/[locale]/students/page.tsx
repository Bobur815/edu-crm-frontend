'use client';

import * as React from 'react';
import PageHeader from 'src/components/ui/PageHeader';
import EntityTable, { Column } from 'src/components/ui/EntityTable';
import StatusChip from 'src/components/ui/StatusChip';
import RightDrawer from 'src/components/ui/RightDrawer';
import AddStudentForm, { StudentFormValue } from 'src/components/forms/AddStudentForm';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStudents, createStudent } from '@/features/students/api';
import type { Student } from '@/types';

const fmtDate = (d?: string | null) => (d ? new Date(d).toISOString().slice(0, 10) : '');

export default function StudentsPage() {
  const t = useTranslations('students');
  const { data: rows = [], isLoading, error } = useStudents();

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<StudentFormValue>({
    fullname: '',
    phone: '',
    email: '',
    gender: 'MALE',
    birthday: '',
    photo: '',
    branchId: 0,
    status: 'ACTIVE',
    other_details: {},
  });

  const qc = useQueryClient();
  const createMut = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['students'] });
      setOpen(false);
    },
  });

  const columns: Column<Student>[] = [
    { key: 'fullname', header: t('columns.fullname') ?? 'Full name' },
    { key: 'phone', header: t('columns.phone') ?? 'Phone' },
    { key: 'email', header: t('columns.email') ?? 'Email' },
    { key: 'gender', header: t('columns.gender') ?? 'Gender' },
    { key: 'birthday', header: t('columns.birthday') ?? 'Birthday', render: (r) => fmtDate(r.birthday as any) },
    { key: 'branchId', header: t('columns.branch') ?? 'Branch' },
    { key: 'status', header: t('columns.status') ?? 'Status', render: (r) => <StatusChip value={r.status} /> },
  ];

  const openDrawer = () => {
    setForm({
      fullname: '',
      phone: '',
      email: '',
      gender: 'MALE',
      birthday: '',
      photo: '',
      branchId: 0,
      status: 'ACTIVE',
      other_details: {},
    });
    setOpen(true);
  };

  const save = () => {
    createMut.mutate({
      fullname: form.fullname,
      phone: form.phone || undefined,
      email: form.email || undefined,
      gender: form.gender, // 'MALE' | 'FEMALE' | 'OTHER' | undefined
      birthday: form.birthday || null, // "YYYY-MM-DD" or null
      photo: form.photo || undefined,
      branchId: Number(form.branchId),
      status: form.status, // 'ACTIVE' | 'INACTIVE'
      other_details: form.other_details && Object.keys(form.other_details).length ? form.other_details : undefined,
      // password is optional here; admin-created students often set later
    });
  };

  return (
    <div>
      <PageHeader title={t('title')} actionLabel={t('addStudent')} onAction={openDrawer} />

      {error ? (
        <div className="text-red-600 text-sm">{String((error as any)?.message ?? 'Failed to load')}</div>
      ) : null}

      <EntityTable rows={rows} columns={columns} loading={isLoading || createMut.isPending} />

      <RightDrawer
        title={t('addStudent')}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={save}
        submitting={createMut.isPending}
      >
        <AddStudentForm value={form} onChange={setForm} />
      </RightDrawer>
    </div>
  );
}
