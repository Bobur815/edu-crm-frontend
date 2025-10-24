'use client';

import * as React from 'react';
import { Stack, TextField, MenuItem, Chip, SelectChangeEvent } from '@mui/material';
import { DayOfWeek, DAYS, type Group } from '@/types';
import { useTranslations } from 'next-intl';
import { useCourseOptions, useTeacherOptions } from '@/features/groups/api';

export type GroupFormValue = Omit<Group, 'id'> & { id?: number };

export default function AddGroupForm({
  value,
  onChange,
}: {
  value: GroupFormValue;
  onChange: (v: GroupFormValue) => void;
}) {
  const t = useTranslations('groups');

  const set = (k: keyof GroupFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: e.target.value });

  const setNum = (k: keyof GroupFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: Number(e.target.value || 0) });

  const courses = useCourseOptions();   // [{id,name}]
  const teachers = useTeacherOptions(); // [{id,fullname}]

  const isDay = (d: string): d is DayOfWeek =>
    (DAYS as readonly string[]).includes(d);

  function handleDays(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const arr = Array.isArray(raw) ? raw : typeof raw === 'string' ? raw.split(',') : [];
    const days = arr.filter(isDay) as DayOfWeek[];
    onChange({ ...value, days });
  }

  return (
    <Stack spacing={2}>
      <TextField label={t('name')} value={value.name ?? ''} onChange={set('name')} />

      <TextField
        select
        label={t('course')}
        value={String(value.courseId ?? 0)}
        onChange={(e) => onChange({ ...value, courseId: Number(e.target.value) })}
      >
        {courses.data?.map((c) => (
          <MenuItem key={c.id} value={String(c.id)}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>

      {/* If teacher is optional */}
      <TextField
        select
        label={t('teacher')}
        value={value.teacherId ? String(value.teacherId) : ''}
        onChange={(e) =>
          onChange({
            ...value,
            teacherId: e.target.value ? Number(e.target.value) : null,
          })
        }
      >
        <MenuItem value="">{t('noTeacher')}</MenuItem>
        {teachers.data?.map((tch) => (
          <MenuItem key={tch.id} value={String(tch.id)}>
            {tch.fullname}
          </MenuItem>
        ))}
      </TextField>

      {/* Days (multi-select) */}
      <TextField
        select
        label={t('days')}
        value={(value.days ?? []) as unknown as string[]} // UI expects string[]
        onChange={handleDays}
        SelectProps={{
          multiple: true,
          renderValue: (selected) => (
            <div className="flex flex-wrap gap-1">
              {(selected as string[]).map((d) => (
                <Chip size="small" key={d} label={d} />
              ))}
            </div>
          ),
        }}
      >
        {DAYS.map((d) => (
          <MenuItem key={d} value={d}>
            {d}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        type="time"
        label={t('startTime')}
        value={value.start_time?.slice(0, 5) ?? ''} // HH:MM
        onChange={set('start_time')}
      />

      <TextField
        type="date"
        label={t('startDate')}
        value={value.start_date ?? ''}
        onChange={set('start_date')}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        type="date"
        label={t('endDate')}
        value={value.end_date ?? ''}
        onChange={set('end_date')}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        type="number"
        label={t('branch')}
        value={value.branchId ?? 0}
        onChange={setNum('branchId')}
        inputProps={{ min: 0 }}
      />

      <TextField
        type="number"
        label={t('room')}
        value={value.roomId ?? ''}
        onChange={(e) => onChange({ ...value, roomId: e.target.value ? Number(e.target.value) : null })}
      />

      <TextField
        select
        label={t('status')}
        value={value.status ?? 'ACTIVE'}
        onChange={(e) => onChange({ ...value, status: e.target.value as any })}
      >
        <MenuItem value="ACTIVE">{t('statusActive')}</MenuItem>
        <MenuItem value="INACTIVE">{t('statusInactive')}</MenuItem>
        <MenuItem value="COMPLETED">{t('statusCompleted')}</MenuItem>
      </TextField>
    </Stack>
  );
}
