// src/features/auth/hooks/useLogout.ts
"use client";
import { useState } from "react";
import { authApi } from "@/components/hooks/authApi";
import { extractErrorMessage } from "@/lib/axios";

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.logout();
      // optionally invalidate useMe() query here
    } catch (err) {
      setError(extractErrorMessage(err, "Logout failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
}
