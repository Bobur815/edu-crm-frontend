import { CourseCategory, CreateCourseCategoryDto } from '@/types';
import { api } from '@/lib/axios';
import { handleResponse } from '../handleresponse';
import { useQuery } from '@tanstack/react-query';

export type UpdateCourseCategoryDto = Partial<CreateCourseCategoryDto>;

/**
 * React hook to fetch all course categories
 */
export function useCourseCategories() {
    return useQuery<CourseCategory[]>({
        queryKey: ['course-categories'],
        queryFn: getCourseCategories,
        refetchOnWindowFocus: false,
    });
}

/**
 * Fetch all course categories
 */
export async function getCourseCategories(): Promise<CourseCategory[]> {
    const res = await api.get<CourseCategory[] | { data: CourseCategory[] }>('/course-categories');
    // Support both `{data: []}` and `[]` formats
    const body = res.data as any;
    return Array.isArray(body) ? (body as CourseCategory[]) : (body?.data ?? []);
}

/**
 * Fetch a single course category by id
 */
export async function getCourseCategory(id: string): Promise<CourseCategory> {
    const { data } = await api.get<CourseCategory | { data: CourseCategory }>(`/course-categories/${id}`);
    return (data as any)?.data ?? (data as CourseCategory);
}

/**
 * Create a new course category
 */
export async function createCourseCategory(payload: CreateCourseCategoryDto): Promise<CourseCategory> {
    const { data } = await api.post<CourseCategory>('/course-categories', payload);
    return data;
}

/**
 * Update an existing course category
 */
export async function updateCourseCategory(id: string, payload: UpdateCourseCategoryDto): Promise<CourseCategory> {
    const { data } = await api.put<CourseCategory>(`/course-categories/${id}`, payload);
    return data;
}

/**
 * Delete a course category
 */
export async function deleteCourseCategory(id: string): Promise<void> {
    await api.delete(`/course-categories/${id}`);
}