// src/components/forms/AddBranchForm.tsx
'use client';

import * as React from 'react';
import { Stack, TextField, MenuItem } from '@mui/material';
import type { Branch } from '@/features/branches/api';
import { useTranslations } from 'next-intl';

export type BranchFormValue = Omit<Branch, 'id' | 'rooms' | 'categories' | 'createdAt' | 'updatedAt'> & {
  id?: number;
};

export default function AddBranchForm({
  value,
  onChange,
}: {
  value: BranchFormValue;
  onChange: (v: BranchFormValue) => void;
}) {
  const t = useTranslations('addBranchForm');

  const set = (k: keyof BranchFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: e.target.value });

  return (
    <Stack spacing={2}>
      <TextField label={t('name')} value={value.name ?? ''} onChange={set('name')} />
      <TextField label={t('region')} value={value.region ?? ''} onChange={set('region')} />
      <TextField label={t('district')} value={value.district ?? ''} onChange={set('district')} />
      <TextField label={t('address')} value={value.address ?? ''} onChange={set('address')} />
      <TextField label={t('phone')} value={value.phone ?? ''} onChange={set('phone')} />

      <TextField
        select
        label={t('status')}
        value={value.status ?? 'ACTIVE'}
        onChange={(e) => onChange({ ...value, status: e.target.value as Branch['status'] })}
      >
        <MenuItem value="ACTIVE">{t('statusActive')}</MenuItem>
        <MenuItem value="INACTIVE">{t('statusInactive')}</MenuItem>
      </TextField>
    </Stack>
  );
}
