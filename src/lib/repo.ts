import courses from '@/data/courses.json';
import students from '@/data/students.json';
import teachers from '@/data/teachers.json';
import groups from '@/data/groups.json';
import type { Course, Student, Teacher, Group, Id } from '@/types';


export const Repo = {
    courses: () => courses as Course[],
    students: () => students as Student[],
    teachers: () => teachers as Teacher[],
    groups: () => groups as Group[],
    courseById: (id: Id) => (courses as Course[]).find(c => String(c.id) === String(id)),
    teacherById: (id: Id) => (teachers as Teacher[]).find(t => String(t.id) === String(id))
};