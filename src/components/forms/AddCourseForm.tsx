// src/components/forms/AddCourseForm.tsx
'use client';

import * as React from 'react';
import { Stack, TextField, MenuItem, CircularProgress } from '@mui/material';
import type { Course } from '@/types';
import { useTranslations } from 'next-intl';
import { useCourseCategories } from '@/features/course-categories/api';
import { useBranches } from '@/features/branches/api';

export type CourseFormValue = Omit<Course, 'id'> & { id?: number };

export default function AddCourseForm({
  value,
  onChange,
}: {
  value: CourseFormValue;
  onChange: (v: CourseFormValue) => void;
}) {
  const t = useTranslations('courses');

  // Fetch categories and branches using React hooks
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCourseCategories();
  const { data: branches = [], isLoading: branchesLoading, error: branchesError } = useBranches();

  // Filter categories based on selected branch
  const filteredCategories = React.useMemo(() => {
    if (!value.branchId) return [];
    return categories.filter(category => category.branchId === value.branchId);
  }, [categories, value.branchId]);

  // Reset categoryId when branchId changes
  React.useEffect(() => {
    if (value.branchId && value.categoryId) {
      const categoryExists = filteredCategories.some(cat => cat.id === value.categoryId);
      if (!categoryExists) {
        onChange({ ...value, categoryId: 0 });
      }
    }
  }, [value.branchId, value.categoryId, filteredCategories, onChange]);

  const set = (k: keyof CourseFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: e.target.value });

  const setNum = (k: keyof CourseFormValue) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: Number(e.target.value || 0) });

  return (
    <Stack spacing={2}>
      <TextField label={t('name')} value={value.name ?? ''} onChange={set('name')} />

      {/* Branch Select Dropdown - First Priority */}
      <TextField
        select
        label={t('branch')}
        value={value.branchId ?? ''}
        onChange={(e) => onChange({ ...value, branchId: Number(e.target.value), categoryId: 0 })}
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

      {/* Category Select Dropdown - Filtered by Branch */}
      <TextField
        select
        label={t('category')}
        value={value.categoryId ?? ''}
        onChange={(e) => onChange({ ...value, categoryId: Number(e.target.value) })}
        disabled={categoriesLoading || !value.branchId}
        helperText={
          categoriesError 
            ? 'Failed to load categories' 
            : !value.branchId 
              ? 'Please select a branch first'
              : filteredCategories.length === 0 
                ? 'No categories available for this branch'
                : ''
        }
        error={!!categoriesError}
      >
        {categoriesLoading ? (
          <MenuItem disabled>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Loading categories...
          </MenuItem>
        ) : filteredCategories.length === 0 ? (
          <MenuItem disabled>
            {!value.branchId ? 'Select a branch first' : 'No categories available'}
          </MenuItem>
        ) : (
          filteredCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))
        )}
      </TextField>

      <TextField
        type="number"
        label={t('price')}
        value={value.price ?? 0}
        placeholder='0'
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
