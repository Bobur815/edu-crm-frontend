'use client';

import * as React from 'react';
import { Stack, TextField, MenuItem } from '@mui/material';
import type { Student } from '@/types';
import { useTranslations } from 'next-intl';

export type StudentFormValue = Omit<Student, 'id'> & { id?: string | number };

export default function AddStudentForm({
  value,
  onChange,
}: {
  value: StudentFormValue;
  onChange: (v: StudentFormValue) => void;
}) {
  const t = useTranslations('students');

  const set = (k: keyof StudentFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: e.target.value });

  const setNum = (k: keyof StudentFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: Number(e.target.value || 0) });

  // keep a local string for other_details editing
  const [otherRaw, setOtherRaw] = React.useState(
    value.other_details ? JSON.stringify(value.other_details, null, 2) : ''
  );

  React.useEffect(() => {
    setOtherRaw(value.other_details ? JSON.stringify(value.other_details, null, 2) : '');
  }, [value.other_details]);

  function onOtherChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setOtherRaw(text);
    try {
      const parsed = text.trim() ? JSON.parse(text) : {};
      onChange({ ...value, other_details: parsed });
    } catch {
      // keep raw text; invalid JSON will not update the parsed object
    }
  }

  return (
    <Stack spacing={2}>
      <TextField label={t('fullName')} value={value.fullname ?? ''} onChange={set('fullname')} />
      <TextField label={t('phone')} value={value.phone ?? ''} onChange={set('phone')} />
      <TextField type="email" label={t('email')} value={value.email ?? ''} onChange={set('email')} />

      <TextField
        select
        label={t('gender')}
        value={value.gender ?? ''}
        onChange={(e) => onChange({ ...value, gender: (e.target.value || undefined) as Student['gender'] })}
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

      <TextField label={t('photo')} value={value.photo ?? ''} onChange={set('photo')} />

      <TextField
        select
        label={t('status')}
        value={value.status ?? 'ACTIVE'}
        onChange={(e) => onChange({ ...value, status: e.target.value as Student['status'] })}
      >
        <MenuItem value="ACTIVE">{t('statusActive')}</MenuItem>
        <MenuItem value="INACTIVE">{t('statusInactive')}</MenuItem>
      </TextField>

      <TextField
        label={t('otherDetails')}
        value={otherRaw}
        onChange={onOtherChange}
        multiline
        minRows={3}
        helperText={t('otherDetailsHint') ?? 'JSON (optional)'}
      />
    </Stack>
  );
}
