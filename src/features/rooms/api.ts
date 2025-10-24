// src/features/rooms/api.ts
import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { Rooms } from '@/types';

const BASE = '/rooms';

/** List all rooms */
export function useRooms() {
    return useQuery<Rooms[]>({
        queryKey: ['rooms'],
        queryFn: async () => {
            const res = await api.get<Rooms[] | { data: Rooms[] }>(BASE);
            // Support both `{data: []}` and `[]` formats
            const body = res.data as any;
            return Array.isArray(body) ? (body as Rooms[]) : (body?.data ?? []);
        },
        refetchOnWindowFocus: false,
    });
}

/** Get one room */
export async function getRoom(id: number | string): Promise<Rooms> {
    const { data } = await api.get<Rooms | { data: Rooms }>(`${BASE}/${id}`);
    return (data as any)?.data ?? (data as Rooms);
}

/** Create a new room */
export type CreateRoomInput = Omit<Rooms, 'id'>;
export async function createRoom(payload: CreateRoomInput): Promise<Rooms> {
    const { data } = await api.post<Rooms>(BASE, payload);
    return data;
}

/** Update an existing room */
export type UpdateRoomInput = Partial<CreateRoomInput>;
export async function updateRoom(id: number | string, payload: UpdateRoomInput): Promise<Rooms> {
    const { data } = await api.put<Rooms>(`${BASE}/${id}`, payload);
    return data;
}

/** Delete a room */
export async function deleteRoom(id: number | string): Promise<void> {
    await api.delete(`${BASE}/${id}`);
}