// src/lib/axios.ts
import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosRequestConfig,
    RawAxiosRequestHeaders,
} from "axios";
import { ACCESS, REFRESH } from "@/lib/tokens";

/* ---------------- Error message helper ---------------- */
type ApiErrorBody = { message?: string; errors?: Array<{ message?: string }> };

export function extractErrorMessage(err: unknown, fallback: string): string {
    // AxiosError narrow
    if (typeof err === "object" && err !== null) {
        const maybeAxios = err as Partial<AxiosError<ApiErrorBody>>;
        const msg =
            maybeAxios.response?.data?.message ??
            maybeAxios.response?.data?.errors?.[0]?.message ??
            (maybeAxios.message as string | undefined);
        if (typeof msg === "string" && msg.trim()) return msg;
    }
    // Generic JS Error
    if (err instanceof Error && err.message) return err.message;
    return fallback;
}

/* ---------------- Base URL ---------------- */
const baseURL = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/+$/, "");

/* ---------------- Token utils ---------------- */
type Subscriber = (newToken: string | null) => void;
let isRefreshing = false;
let subscribers: Subscriber[] = [];

function onRefreshed(token: string | null) {
    subscribers.forEach((cb) => cb(token));
    subscribers = [];
}
function subscribeTokenRefresh(cb: Subscriber) {
    subscribers.push(cb);
}

function getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS);
}
function setAccessToken(token: string | null) {
    if (typeof window === "undefined") return;
    if (token) localStorage.setItem(ACCESS, token);
    else localStorage.removeItem(ACCESS);
}

/* A safe way to set Authorization on Axios configs without using `any` */
function setAuthHeader(cfg: AxiosRequestConfig, token: string) {
    if (!cfg.headers) cfg.headers = {};
    const headers = cfg.headers as RawAxiosRequestHeaders | AxiosHeaders;
    if (typeof (headers as AxiosHeaders).set === "function") {
        (headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    } else {
        (headers as RawAxiosRequestHeaders)["Authorization"] = `Bearer ${token}`;
    }
}


/* ---------------- Instance ---------------- */
export const api = axios.create({
    baseURL
});

/* ---------------- Request interceptor ---------------- */
api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(ACCESS) : null;
    if (token) {
        config.headers = config.headers ?? {};
        (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
});

/* ---------------- Response interceptor (401 refresh) ---------------- */

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}
type RefreshResponse = { accessToken?: string; access?: string };

api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const { response, config } = error;
        const original = (config ?? {}) as RetryAxiosRequestConfig;

        // Not a 401 or already retried once → reject
        if (response?.status !== 401 || original._retry) {
            return Promise.reject(error);
        }

        // If a refresh is already in flight, queue this request
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                subscribeTokenRefresh((newToken) => {
                    if (!newToken) return reject(error);
                    setAuthHeader(original, newToken);
                    resolve(api(original));
                });
            });
        }

        // Start refresh flow
        original._retry = true;
        isRefreshing = true;

        try {
            const { data } = await axios.post<RefreshResponse>(
                `${baseURL}/auth/refresh`,
                { refreshToken: localStorage.getItem(REFRESH) ?? '' }, // ✅ send body
                { withCredentials: false }
            );

            const newAccess = data.accessToken ?? data.access ?? null;

            setAccessToken(newAccess);
            onRefreshed(newAccess);

            if (newAccess) setAuthHeader(original, newAccess);
            return api(original);
        } catch (e) {
            // Notify queued requests we failed
            onRefreshed(null);
            setAccessToken(null);

            if (typeof window !== "undefined") {
                localStorage.removeItem(REFRESH);
                // optional: redirect
                window.location.href = "/login";
            }
            return Promise.reject(e);
        } finally {
            isRefreshing = false;
        }
    }
);
