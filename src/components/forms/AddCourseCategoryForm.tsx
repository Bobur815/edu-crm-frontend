// src/components/forms/AddCourseCategoryForm.tsx
'use client';

import * as React from 'react';
import { Stack, TextField, MenuItem, CircularProgress } from '@mui/material';
import type { CourseCategory } from '@/types';
import { useTranslations } from 'next-intl';
import { useBranches } from '@/features/branches/api';

export type CourseCategoryFormValue = Omit<CourseCategory, 'id'> & {
  id?: number;
};

export default function AddCourseCategoryForm({
  value,
  onChange,
}: {
  value: CourseCategoryFormValue;
  onChange: (v: CourseCategoryFormValue) => void;
}) {
  const t = useTranslations('courseCategories');

  // Fetch branches for the dropdown
  const { data: branches = [], isLoading: branchesLoading, error: branchesError } = useBranches();

  const set = (k: keyof CourseCategoryFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: e.target.value });

  return (
    <Stack spacing={2}>
      <TextField 
        label={t('name') || 'Category Name'} 
        value={value.name ?? ''} 
        onChange={set('name')} 
        placeholder="e.g., Programming, Design, Marketing"
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
    </Stack>
  );
}