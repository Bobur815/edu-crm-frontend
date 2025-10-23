'use client';

import { api } from '@/lib/axios';
import { useQueries, UseQueryResult } from '@tanstack/react-query';

type AnyList =
  | any[]
  | { items: any[]; total?: number }
  | { data: any[]; total?: number }
  | { rows: any[]; total?: number };

// extract count no matter the shape
function extractCount(payload: AnyList | undefined): number {
  if (!payload) return 0;
  if (Array.isArray(payload)) return payload.length;
  if ('total' in payload && typeof payload.total === 'number') return payload.total;
  if ('items' in payload && Array.isArray(payload.items)) return payload.items.length;
  if ('data' in payload && Array.isArray(payload.data)) return payload.data.length;
  if ('rows' in payload && Array.isArray(payload.rows)) return payload.rows.length;
  return 0;
}

export function useDashboardCounts() {
  const endpoints = [
    { key: 'branches', url: '/branches' },
    { key: 'students', url: '/students' },
    { key: 'teachers', url: '/teachers' },
    { key: 'courses',  url: '/courses' },
    { key: 'groups',   url: '/groups' },
  ] as const;

  const results = useQueries({
    queries: endpoints.map(({ key, url }) => ({
      queryKey: ['count', key],
      // If your backend supports light-weight counting, switch to url like `${url}/count`
      queryFn: async () => (await api.get<AnyList>(url)).data,
      refetchOnWindowFocus: false,
    })),
  }) as UseQueryResult<AnyList, unknown>[];

  const [branchesQ, studentsQ, teachersQ, coursesQ, groupsQ] = results;

  const loading = results.some((q) => q.isLoading);
  const error   = results.find((q) => q.error)?.error as unknown;

  return {
    loading,
    error,
    counts: {
      branches: extractCount(branchesQ.data),
      students: extractCount(studentsQ.data),
      teachers: extractCount(teachersQ.data),
      courses:  extractCount(coursesQ.data),
      groups:   extractCount(groupsQ.data),
    },
  };
}
