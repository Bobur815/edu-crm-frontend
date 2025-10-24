'use client';

import * as React from 'react';
import { Stack, TextField, MenuItem } from '@mui/material';
import type { Teacher } from '@/types';
import { useTranslations } from 'next-intl';

export type TeacherFormValue = Omit<Teacher, 'id'> & { id?: number };

export default function AddTeacherForm({
  value,
  onChange,
}: {
  value: TeacherFormValue;
  onChange: (v: TeacherFormValue) => void;
}) {
  const t = useTranslations('teachers');

  const set = (k: keyof TeacherFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: e.target.value });

  const setNum = (k: keyof TeacherFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: Number(e.target.value || 0) });

  return (
    <Stack spacing={2}>
      <TextField label={t('fullName')} value={value.fullname ?? ''} onChange={set('fullname')} />
      <TextField label={t('phone')} value={value.phone ?? ''} onChange={set('phone')} />
      <TextField type="email" label={t('email')} value={value.email ?? ''} onChange={set('email')} />

      <TextField
        select
        label={t('gender')}
        value={value.gender ?? 'MALE'}
        onChange={(e) => onChange({ ...value, gender: e.target.value as Teacher['gender'] })}
      >
        <MenuItem value="MALE">{t('genderMale')}</MenuItem>
        <MenuItem value="FEMALE">{t('genderFemale')}</MenuItem>
        <MenuItem value="OTHER">{t('genderOther')}</MenuItem>
      </TextField>

      <TextField
        type="date"
        label={t('birthday')}
        value={value.birthday ?? ''}
        onChange={set('birthday')}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        type="number"
        label={t('branch')}
        value={value.branchId ?? 0}
        onChange={setNum('branchId')}
        inputProps={{ min: 0 }}
      />

      {/* Optional fields; photo is usually uploaded via multipart elsewhere */}
      <TextField label={t('photo')} value={value.photo ?? ''} onChange={set('photo')} />
      <TextField
        label={t('otherDetails')}
        value={value.description ?? ''}
        onChange={set('description')}
        multiline
        minRows={3}
      />

      <TextField
        select
        label={t('status')}
        value={value.status ?? 'ACTIVE'}
        onChange={(e) => onChange({ ...value, status: e.target.value as Teacher['status'] })}
      >
        <MenuItem value="ACTIVE">{t('statusActive')}</MenuItem>
        <MenuItem value="INACTIVE">{t('statusInactive')}</MenuItem>
      </TextField>
    </Stack>
  );
}
