'use client';

import * as React from 'react';
import PageHeader from 'src/components/ui/PageHeader';
import EntityTable, { Column } from 'src/components/ui/EntityTable';
import StatusChip from 'src/components/ui/StatusChip';
import RightDrawer from 'src/components/ui/RightDrawer';
import AddGroupForm, { GroupFormValue } from 'src/components/forms/AddGroupForm';
import { useTranslations } from 'next-intl';
import { useGroups, createGroup } from '@/features/groups/api';
import type { Group } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const fmtDateRange = (s?: string | null, e?: string | null) =>
  [s, e].filter(Boolean).join(' — ');

export default function GroupsPage() {
  const t = useTranslations('groups');

  // fetch list
  const { data: rows = [], isLoading, error } = useGroups();

  // drawer state
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<GroupFormValue>({
    name: '',
    courseId: 0,
    branchId: 0,
    teacherId: null,
    roomId: null,
    status: 'ACTIVE',
    days: [],
    start_time: '',
    start_date: '',
    end_date: '',
  });

  const qc = useQueryClient();
  const createMut = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['groups'] });
      setOpen(false);
    },
  });

  const columns: Column<Group>[] = [
    { key: 'name', header: t('columns.name') ?? 'Name' },
    { key: 'courseId', header: t('columns.course') ?? 'Course' },
    { key: 'teacherId', header: t('columns.teacher') ?? 'Teacher' },
    {
      key: 'days',
      header: t('columns.days') ?? 'Days',
      render: (r) => Array.isArray(r.days) ? r.days.join(', ') : '',
    },
    {
      key: 'start_time',
      header: t('columns.time') ?? 'Time',
      render: (r) => (r.start_time ?? '').toString().slice(0, 5), // HH:MM from HH:MM:SS
    },
    {
      key: 'start_date',
      header: t('columns.dates') ?? 'Dates',
      render: (r) => fmtDateRange(r.start_date as any, r.end_date as any),
    },
    { key: 'status', header: t('columns.status') ?? 'Status', render: (r) => <StatusChip value={r.status} /> },
  ];

  const openDrawer = () => {
    setForm({
      name: '',
      courseId: 0,
      branchId: 0,
      teacherId: null,
      roomId: null,
      status: 'ACTIVE',
      days: [],
      start_time: '',
      start_date: '',
      end_date: '',
    });
    setOpen(true);
  };

  const save = () => {
    // normalize time to HH:MM:SS for backend if user typed HH:MM
    const time = form.start_time?.length === 5 ? `${form.start_time}:00` : form.start_time;

    createMut.mutate({
      ...form,
      courseId: Number(form.courseId),
      branchId: Number(form.branchId),
      teacherId: form.teacherId ? Number(form.teacherId) : null,
      roomId: form.roomId ? Number(form.roomId) : null,
      start_time: time || null,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
    });
  };

  return (
    <div>
      <PageHeader title={t('title')} actionLabel={t('createGroup')} onAction={openDrawer} />

      {error ? (
        <div className="text-red-600 text-sm mb-3">
          {String((error as any)?.message ?? 'Failed to load')}
        </div>
      ) : null}

      <EntityTable rows={rows} columns={columns} loading={isLoading || createMut.isPending} />

      <RightDrawer
        title={t('addGroup')}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={save}
        submitting={createMut.isPending}
      >
        <AddGroupForm value={form} onChange={setForm} />
      </RightDrawer>
    </div>
  );
}
