import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { DayOfWeek, Group } from '@/types';

/* Enums / constants */
export type GroupStatus = 'ACTIVE' | 'INACTIVE' | 'COMPLETED' | string;


/* DTOs */
export type CreateGroupInput = {
  name: string;
  courseId: number;
  branchId: number;
  roomId?: number | null;
  teacherId?: number | null;
  status?: GroupStatus;
  days?: DayOfWeek[];
  start_time?: string | null;  // "HH:MM:SS"
  start_date?: string | null;  // "YYYY-MM-DD"
  end_date?: string | null;    // "YYYY-MM-DD"
};
export type UpdateGroupInput = Partial<CreateGroupInput>;

/* CRUD */
export function useGroups() {
  return useQuery<Group[]>({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data } = await api.get<Group[]>('/groups');
      return data;
    },
    refetchOnWindowFocus: false,
  });
}

export async function getGroup(id: number | string): Promise<Group> {
  const { data } = await api.get<Group>(`/groups/${id}`);
  return data;
}

export async function createGroup(payload: CreateGroupInput): Promise<Group> {
  const { data } = await api.post<Group>('/groups', payload);
  return data;
}

export async function updateGroup(id: number | string, payload: UpdateGroupInput): Promise<Group> {
  const { data } = await api.put<Group>(`/groups/${id}`, payload);
  return data;
}

export async function deleteGroup(id: number | string): Promise<void> {
  await api.delete(`/groups/${id}`);
}

/* Option helpers for selects */
type CourseLite = { id: number; name: string };
type TeacherLite = { id: number; fullname: string };

export function useCourseOptions() {
  return useQuery<CourseLite[]>({
    queryKey: ['courses', 'lite'],
    queryFn: async () => {
      const { data } = await api.get<any[]>('/courses');
      // map if backend returns full course object
      return data.map((c) => ({ id: c.id, name: c.name })) as CourseLite[];
    },
    refetchOnWindowFocus: false,
  });
}

export function useTeacherOptions() {
  return useQuery<TeacherLite[]>({
    queryKey: ['teachers', 'lite'],
    queryFn: async () => {
      const { data } = await api.get<any[]>('/teachers');
      return data.map((t) => ({ id: t.id, fullname: t.fullname })) as TeacherLite[];
    },
    refetchOnWindowFocus: false,
  });
}
