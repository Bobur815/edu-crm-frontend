// src/

export type Id = string | number;


export type Course = {
    id: Id;
    branchId: Id;
    categoryId: Id;
    name: string;
    status: 'ACTIVE' | 'INACTIVE' | string;
    price: number;
    duration_hours: number;
    duration_months: number;
    description?: string | null;
    createdAt?: string;
    updatedAt?: string;
};

export type CreateCourseDto = {
    branchId: Id;
    categoryId: Id;
    name: string;
    status: 'ACTIVE' | 'INACTIVE' | string;
    price: number;
    duration_hours: number;
    duration_months: number;
    description?: string | null;
};

export type UpdateCourseDto = Partial<CreateCourseDto>;

export type StudentStatus = 'ACTIVE' | 'INACTIVE';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type Student = {
    id: string;                 // uuid
    fullname: string;
    email?: string | null;
    password?: string | null;
    phone?: string | null;
    gender?: Gender | null;
    photo?: string | null;
    birthday?: string | null;   // "YYYY-MM-DD"
    status: StudentStatus;
    other_details?: Record<string, unknown> | null;
    branchId: number;

    createdAt?: string;
    updatedAt?: string;
};



export type Teacher = {
    id: number;
    phone: string;
    email?: string | null;
    fullname: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    photo?: string | null;
    birthday?: string | null;   // ISO date "YYYY-MM-DD"
    branchId: number;
    status: 'ACTIVE' | 'INACTIVE';
    description?: string | null;
    createdAt?: string;
    updatedAt?: string;
};

export type DayOfWeek =
    | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export const DAYS: DayOfWeek[] = [
    'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY',
];

export type Group = {
    id: number;
    name: string;
    courseId: number;
    branchId: number;
    roomId?: number | null;
    teacherId?: number | null;
    status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED' | string;
    days?: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[];
    start_time?: string | null;  // HH:MM:SS
    start_date?: string | null;  // YYYY-MM-DD
    end_date?: string | null;    // YYYY-MM-DD
    createdAt?: string;
    updatedAt?: string;
};

export interface CourseCategory {
    id: number;
    name: string;
    branchId: number;
}

export type CreateCourseCategoryDto = {
    name: string;
    branchId: number;
};

export type Rooms = {
    id: number;
    name: string;
    branchId: number;
    capacity: number;
}

export type Branch = {
    id: number;
    name: string;
    region: string;
    district: string;
    address: string;
    phone: string;
    status: 'active' | 'inactive';
    rooms: Rooms[];
    categories: CourseCategory[];

}

export type UserRole = 'ADMIN' | 'MANAGER' | 'TEACHER' | 'STUDENT';
export type JwtPayload = {
  sub?: string;
  role?: UserRole | string;
  iat?: number;
  exp?: number;
} & Record<string, unknown>;
