// src/features/auth/hooks/useMe.ts
"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { ACCESS } from "@/lib/tokens";
import type { AxiosError } from "axios";
import type { UserRole } from "@/types/User";

// Foydalanuvchi ma'lumotining minimal shakli
export type MeBase = { id: string | number; role?: UserRole } & Record<string, unknown>;
export type Me = MeBase | null;

// Serverdan turli shakllarda kelishi mumkin bo‘lgan javoblarni normalize qilamiz
function normalizeMe(payload: unknown): MeBase | null {
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    const candidate =
      (obj.data as unknown) ??
      (obj.user as unknown) ??
      payload;

    if (candidate && typeof candidate === "object") {
      const c = candidate as Record<string, unknown>;
      if (typeof c.id === "string" || typeof c.id === "number") {
        return c as MeBase;
      }
    }
  }
  return null;
}

export function useMe() {
  // Token bor-yo‘qligini faqat clientda tekshiramiz
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEnabled(Boolean(localStorage.getItem(ACCESS)));
    }
  }, []);

  return useQuery<Me>({
    queryKey: ["me"],
    enabled,
    queryFn: async () => {
      try {
        const { data } = await api.get<unknown>("/users/me");
        return normalizeMe(data);
      } catch (err: unknown) {
        const ax = err as AxiosError<unknown> | undefined;
        const status = ax?.response?.status;
        if (status === 401) return null; // unauthenticated -> me: null
        throw err; // qolgan xatolarni bubble-up qilamiz
      }
    },
    staleTime: 0,
    gcTime: 5 * 60 * 1000,

    // React Query v5 signatura: retry(failureCount, error)
    retry: (failureCount: number, error: unknown) => {
      const ax = error as AxiosError | undefined;
      const status = ax?.response?.status;
      // 4xx (lekin 429/408 emas) uchun qayta urmaslik, 5xx -> 2 martagacha
      if (status && status < 500 && status !== 408 && status !== 429) return false;
      return failureCount < 2;
    },

    // QoL:
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
  });
}
