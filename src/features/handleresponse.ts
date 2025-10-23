// src/features/handleresponse.ts

import { AxiosResponse } from "axios";

export async function handleResponse<T>(response: AxiosResponse): Promise<T> {
    if (!response.status) {
        const errorText = await response.data;
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    return response.data as Promise<T>;
}