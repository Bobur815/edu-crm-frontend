// src/components/forms/AddCourseForm.tsx
'use client';

import * as React from 'react';
import { Stack, TextField, MenuItem } from '@mui/material';
import type { Course } from '@/types';
import { useTranslations } from 'next-intl';

export type CourseFormValue = Omit<Course, 'id'> & { id?: number };

export default function AddCourseForm({
  value,
  onChange,
}: {
  value: CourseFormValue;
  onChange: (v: CourseFormValue) => void;
}) {
  const t = useTranslations('addCourseForm');

  const set = (k: keyof CourseFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: e.target.value });

  const setNum = (k: keyof CourseFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: Number(e.target.value || 0) });

  return (
    <Stack spacing={2}>
      <TextField label={t('name')} value={value.name ?? ''} onChange={set('name')} />

      {/* If you have category list, replace with a select. For now numeric id */}
      <TextField
        type="number"
        label={t('category')}
        value={value.categoryId ?? 0}
        onChange={setNum('categoryId')}
        inputProps={{ min: 0 }}
      />

      {/* If you assign branch per user context, you can hide this field */}
      <TextField
        type="number"
        label={t('branch')}
        value={value.branchId ?? 0}
        onChange={setNum('branchId')}
        inputProps={{ min: 0 }}
      />

      <TextField
        type="number"
        label={t('price')}
        value={value.price ?? 0}
        onChange={setNum('price')}
        inputProps={{ min: 0 }}
      />

      <TextField
        type="number"
        label={t('durationHours')}
        value={value.duration_hours ?? 0}
        onChange={setNum('duration_hours')}
        inputProps={{ min: 0 }}
      />

      <TextField
        type="number"
        label={t('durationMonths')}
        value={value.duration_months ?? 0}
        onChange={setNum('duration_months')}
        inputProps={{ min: 0 }}
      />

      <TextField
        select
        label={t('status')}
        value={value.status ?? 'ACTIVE'}
        onChange={(e) => onChange({ ...value, status: e.target.value as 'ACTIVE' | 'INACTIVE' })}
      >
        <MenuItem value="ACTIVE">{t('statusActive')}</MenuItem>
        <MenuItem value="INACTIVE">{t('statusInactive')}</MenuItem>
      </TextField>

      <TextField
        label={t('description')}
        value={value.description ?? ''}
        onChange={set('description')}
        multiline
        minRows={3}
      />
    </Stack>
  );
}
