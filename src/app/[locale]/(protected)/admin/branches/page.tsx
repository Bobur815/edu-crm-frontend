// src/app/[locale]/branches/page.tsx
'use client';

import * as React from 'react';
import PageHeader from 'src/components/ui/PageHeader';
import EntityTable, { Column } from 'src/components/ui/EntityTable';
import StatusChip from 'src/components/ui/StatusChip';
import RightDrawer from 'src/components/ui/RightDrawer';
import AddBranchForm, { BranchFormValue } from 'src/components/forms/AddBranchForm';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBranches, createBranch } from '@/features/branches/api';
import type { Branch } from '@/features/branches/api';

export default function BranchesPage() {
  const t = useTranslations('branches');

  const { data: rows = [], isLoading, error } = useBranches();

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<BranchFormValue>({
    name: '',
    region: '',
    district: '',
    address: '',
    phone: '',
    status: 'ACTIVE',
  });

  const qc = useQueryClient();
  const createMut = useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['branches'] });
      setOpen(false);
    },
  });

  const columns: Column<Branch>[] = [
    { key: 'name', header: t('name') ?? 'Name' },
    { key: 'region', header: t('region') ?? 'Region' },
    { key: 'district', header: t('district') ?? 'District' },
    { key: 'phone', header: t('phone') ?? 'Phone' },
    { key: 'address', header: t('address') ?? 'Address' },
    { key: 'status', header: t('status') ?? 'Status', render: (r) => <StatusChip value={r.status} /> },
  ];

  const openDrawer = () => {
    setForm({
      name: '',
      region: '',
      district: '',
      address: '',
      phone: '',
      status: 'ACTIVE',
    });
    setOpen(true);
  };

  const save = () => {
    createMut.mutate({
      name: form.name,
      region: form.region || undefined,
      district: form.district || undefined,
      address: form.address || undefined,
      phone: form.phone || undefined,
      status: form.status, // 'ACTIVE' | 'INACTIVE'
    });
  };

  return (
    <div>
      <PageHeader title={t('title')} actionLabel={t('addBranch')} onAction={openDrawer} />

      {error ? (
        <div className="text-red-600 text-sm mb-3">{String((error as any)?.message ?? 'Failed to load')}</div>
      ) : null}

      <EntityTable data={rows} columns={columns} loading={isLoading || createMut.isPending} />

      <RightDrawer
        title={t('addBranch')}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={save}
        submitting={createMut.isPending}
      >
        <AddBranchForm value={form} onChange={setForm} />
      </RightDrawer>
    </div>
  );
}
