// src/components/forms/AddRoomForm.tsx
'use client';

import * as React from 'react';
import { Stack, TextField, MenuItem, CircularProgress } from '@mui/material';
import type { Rooms } from '@/types';
import { useTranslations } from 'next-intl';
import { useBranches } from '@/features/branches/api';

export type RoomFormValue = Omit<Rooms, 'id'> & {
  id?: number;
};

export default function AddRoomForm({
  value,
  onChange,
}: {
  value: RoomFormValue;
  onChange: (v: RoomFormValue) => void;
}) {
  const t = useTranslations('rooms');

  // Fetch branches for the dropdown
  const { data: branches = [], isLoading: branchesLoading, error: branchesError } = useBranches();

  const set = (k: keyof RoomFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: e.target.value });

  const setNum = (k: keyof RoomFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: Number(e.target.value || 0) });

  return (
    <Stack spacing={2}>
      <TextField 
        label={t('name') || 'Room Name'} 
        value={value.name ?? ''} 
        onChange={set('name')} 
        placeholder="e.g., Room 101, Conference Room A"
      />

      {/* Branch Select Dropdown */}
      <TextField
        select
        label={t('branch') || 'Branch'}
        value={value.branchId ?? ''}
        onChange={(e) => onChange({ ...value, branchId: Number(e.target.value) })}
        disabled={branchesLoading}
        helperText={branchesError ? 'Failed to load branches' : ''}
        error={!!branchesError}
      >
        {branchesLoading ? (
          <MenuItem disabled>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Loading branches...
          </MenuItem>
        ) : (
          branches.map((branch) => (
            <MenuItem key={branch.id} value={branch.id}>
              {branch.name}
            </MenuItem>
          ))
        )}
      </TextField>

      <TextField
        type="number"
        label={t('capacity') || 'Capacity'}
        value={value.capacity ?? 0}
        onChange={setNum('capacity')}
        inputProps={{ min: 1, max: 500 }}
        placeholder="e.g., 30"
        helperText="Maximum number of people that can fit in this room"
      />
    </Stack>
  );
}