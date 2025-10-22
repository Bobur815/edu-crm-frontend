export type Id = string | number;


export type Course = {
    id: Id;
    title: string;
    category: string;
    durationMinutes: number;
    price: number;
    status: 'active' | 'archived' | 'draft';
};


export type Student = {
    id: Id;
    fullName: string;
    phone: string;
    email: string;
    enrolledCourseIds: Id[];
    status: 'active' | 'inactive';
};


export type Teacher = {
    id: Id;
    fullName: string;
    department: string;
    phone: string;
    email: string;
    status: 'active' | 'inactive';
};


export type Group = {
    id: Id;
    title: string;
    courseId: Id;
    teacherId: Id;
    schedule: string; // e.g., Mon/Wed 10:00
    capacity: number;
    enrolled: number;
    status: 'ongoing' | 'planned' | 'completed';
};