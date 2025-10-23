/**
 * src/features/courses/api.ts
 * CRUD helpers for Courses backed by your Nest API.
 */

import { api } from '@/lib/axios';
import type { Course, CreateCourseDto, UpdateCourseDto } from '@/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

// IMPORTANT: axios baseURL already includes /api (NEXT_PUBLIC_API_BASE)
// so the endpoints here are just '/courses'
const BASE = '/courses';

export function useCourses(): UseQueryResult<Course[], unknown> {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await api.get<Course[]>(BASE);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}

export async function getCourse(id: number): Promise<Course> {
  const { data } = await api.get<Course>(`${BASE}/${encodeURIComponent(String(id))}`);
  return data;
}

export async function createCourse(payload: CreateCourseDto | Course): Promise<Course> {
  const { data } = await api.post<Course>(BASE, payload);
  return data;
}

export async function updateCourse(id: number, payload: UpdateCourseDto | Partial<Course>): Promise<Course> {
  const { data } = await api.put<Course>(`${BASE}/${encodeURIComponent(String(id))}`, payload);
  return data;
}

export async function deleteCourse(id: number): Promise<void> {
  await api.delete(`${BASE}/${encodeURIComponent(String(id))}`);
}
