// src/features/auth/hooks/useLogin.ts
"use client";
import { useState } from "react";
import { authApi } from "@/components/hooks/authApi";
import { extractErrorMessage } from "@/lib/axios";

type LoginParams = { email: string; password: string };

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async ({ email, password }: LoginParams) => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.login({ email, password });
      // optionally invalidate useMe() query here
    } catch (err) {
      setError(extractErrorMessage(err, "Login failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
