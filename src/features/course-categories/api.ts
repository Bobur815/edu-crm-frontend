import { CourseCategory, CreateCourseCategoryDto } from '@/types';
import axios from 'axios';
import { handleResponse } from '../handleresponse';



export type UpdateCourseCategoryDto = Partial<CreateCourseCategoryDto>;
/**
 * Fetch all course categories
 */
export async function getCourseCategories(): Promise<CourseCategory[]> {
    const res = await axios.get<{ data: CourseCategory[] }>('/api/course-categories');
    return handleResponse(res);
}

/**
 * Fetch a single course category by id
 */
export async function getCourseCategory(id: string): Promise<CourseCategory> {
    const res = await axios.get<{ data: CourseCategory }>(`/api/course-categories/${id}`);
    return handleResponse(res);
}

/**
 * Create a new course category
 */
export async function createCourseCategory(payload: CreateCourseCategoryDto): Promise<CourseCategory> {
    const res = await axios.post<{ data: CourseCategory }>('/api/course-categories', payload);
    return handleResponse(res);
}

/**
 * Update an existing course category
 */
export async function updateCourseCategory(id: string, payload: UpdateCourseCategoryDto): Promise<CourseCategory> {
    const res = await axios.put<{ data: CourseCategory }>(`/api/course-categories/${id}`, payload);
    return handleResponse(res);
}

/**
 * Delete a course category
 */
export async function deleteCourseCategory(id: string): Promise<void> {
    await axios.delete(`/api/course-categories/${id}`);
}