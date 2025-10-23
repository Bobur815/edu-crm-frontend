// src/types/User.ts


export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: UserRole;
  createdAt: string;
}