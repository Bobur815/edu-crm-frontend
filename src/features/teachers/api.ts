import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { Teacher } from '@/types';

// axios baseURL is NEXT_PUBLIC_API_BASE (e.g. http://localhost:3001/api)
// so just use '/teachers' here.
const BASE = '/teachers';

export function useTeachers() {
  return useQuery<Teacher[]>({
    queryKey: ['teachers'],
    queryFn: async () => {
      const { data } = await api.get<Teacher[]>(BASE);
      return data;
    },
    refetchOnWindowFocus: false,
  });
}

export async function fetchTeacher(id: number | string): Promise<Teacher> {
  const { data } = await api.get<Teacher>(`${BASE}/${encodeURIComponent(String(id))}`);
  return data;
}

type CreateTeacherInput = Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateTeacherInput = Partial<CreateTeacherInput>;

export async function createTeacher(payload: CreateTeacherInput): Promise<Teacher> {
  const { data } = await api.post<Teacher>(BASE, payload);
  return data;
}

export async function updateTeacher(id: number | string, payload: UpdateTeacherInput): Promise<Teacher> {
  const { data } = await api.put<Teacher>(`${BASE}/${encodeURIComponent(String(id))}`, payload);
  return data;
}

export async function deleteTeacher(id: number | string): Promise<void> {
  await api.delete(`${BASE}/${encodeURIComponent(String(id))}`);
}
