// src/features/branches/api.ts
import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

/** Minimal related types (use your global types if you already have them) */
export type Room = { id: number; name: string };
export type CourseCategory = { id: number; name: string };

export type BranchStatus = 'ACTIVE' | 'INACTIVE';

export type Branch = {
    id: number;
    name: string;
    region?: string | null;
    district?: string | null;
    address?: string | null;
    phone?: string | null;
    status: BranchStatus;

    rooms?: Room[];
    categories?: CourseCategory[];

    createdAt?: string;
    updatedAt?: string;
};

const BASE = '/branches';

/** List */
export function useBranches() {
    return useQuery<Branch[]>({
        queryKey: ['branches'],
        queryFn: async () => {
            const res = await api.get<Branch[] | { data: Branch[] }>(BASE);
            // Support both `{data: []}` and `[]`
            const body = res.data as any;
            return Array.isArray(body) ? (body as Branch[]) : (body?.data ?? []);
        },
        refetchOnWindowFocus: false,
    });
}

/** Get one */
export async function getBranch(id: number | string): Promise<Branch> {
    const { data } = await api.get<Branch | { data: Branch }>(`${BASE}/${id}`);
    return (data as any)?.data ?? (data as Branch);
}

export type CreateBranchInput = Omit<
    Branch,
    'id' | 'rooms' | 'categories' | 'createdAt' | 'updatedAt'
>;
export type UpdateBranchInput = Partial<CreateBranchInput>;

/** Create */
export async function createBranch(payload: CreateBranchInput): Promise<Branch> {
    const { data } = await api.post<Branch | { data: Branch }>(BASE, payload);
    return (data as any)?.data ?? (data as Branch);
}

/** Update */
export async function updateBranch(
    id: number | string,
    payload: UpdateBranchInput
): Promise<Branch> {
    const { data } = await api.put<Branch | { data: Branch }>(`${BASE}/${id}`, payload);
    return (data as any)?.data ?? (data as Branch);
}

/** Delete */
export async function deleteBranch(id: number | string): Promise<void> {
    await api.delete(`${BASE}/${id}`);
}
