// src/components/hooks/authApi.ts
import { api } from "@/lib/axios";

type LoginBody = { email: string; password: string };
type RegisterBody = { email: string; password: string };

export const authApi = {
  async login(body: LoginBody) {
    const { data } = await api.post("/auth/login", body, { withCredentials: true });
    return data;
  },
  async register(body: RegisterBody) {
    const { data } = await api.post("/auth/register", body, { withCredentials: true });
    return data;
  },
  async logout() {
    const { data } = await api.post("/auth/logout", {}, { withCredentials: true });
    return data;
  },
  async me() {
    const { data } = await api.get("/users/me", { withCredentials: true });
    return data;
  },
};
