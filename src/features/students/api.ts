import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { Student } from '@/types';

const BASE = '/students';

export function useStudents() {
  return useQuery<Student[]>({
    queryKey: ['students'],
    queryFn: async () => {
      const { data } = await api.get<Student[]>(BASE);
      return data;
    },
    refetchOnWindowFocus: false,
  });
}

type CreateStudentInput = Omit<Student, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateStudentInput = Partial<CreateStudentInput>;

export async function createStudent(payload: CreateStudentInput): Promise<Student> {
  const { data } = await api.post<Student>(BASE, payload);
  return data;
}

export async function updateStudent(id: string, payload: UpdateStudentInput): Promise<Student> {
  const { data } = await api.put<Student>(`${BASE}/${id}`, payload);
  return data;
}

export async function deleteStudent(id: string): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}
