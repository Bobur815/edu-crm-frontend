// src/components/AuthArea.tsx
"use client";

import { Stack, Button, Avatar, CircularProgress, Skeleton } from "@mui/material";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useMe, useLogout } from "@/components/hooks";

// Define a flexible user type based on what your API might return
interface User {
    avatar?: string | null;
    avatarUrl?: string | null;
    profile?: {
        avatar?: string | null;
    };
    fullName?: string;
    name?: string;
    email?: string;
    [key: string]: unknown; // Allow additional properties
}

export function AuthArea({
    lgUp,
    absUrl,
}: {
    lgUp: boolean;
    absUrl: (u?: string | null) => string;
}) {
    const t = useTranslations("navbar");         // or "auth" if your keys live there
    const locale = useLocale();

    const { data: me, isLoading } = useMe();
    const { logout, isLoading: loggingOut } = useLogout();

    const handleLogout = () => {
        if (loggingOut) return;
        logout();
    };

    const user = me as User | null | undefined;

    const avatarUrl =
        user?.avatar ||
        user?.avatarUrl ||
        user?.profile?.avatar ||
        null;

    // Fallback initials when there's no avatar
    const name = user?.fullName || user?.name || user?.email || "";
    const initials = name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((s: string) => s[0])
        .join("")
        .toUpperCase();

    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
            {isLoading ? (
                <>
                    {lgUp && <Skeleton variant="text" width={72} height={28} />}
                    <Skeleton variant="circular" width={28} height={28} />
                    <Skeleton variant="rounded" width={80} height={32} />
                </>
            ) : me ? (
                <>
                    {lgUp && (
                        <Button
                            component={Link}
                            href="/profile"
                            locale={locale}
                            size="small"
                            sx={{ color: "var(--bg)", whiteSpace: "nowrap" }}
                        >
                            {t("profile", { defaultValue: "Profile" })}
                        </Button>
                    )}

                    <Avatar
                        src={avatarUrl ? absUrl(avatarUrl) : undefined}
                        alt={name || "User"}
                        sx={{
                            width: 28,
                            height: 28,
                            bgcolor: "var(--brand-orange)",
                            fontSize: 12,
                        }}
                    >
                        {!avatarUrl && initials}
                    </Avatar>

                    <Button
                        size="small"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        sx={{ color: "var(--bg)", whiteSpace: "nowrap" }}
                        startIcon={
                            loggingOut ? <CircularProgress size={14} color="inherit" /> : undefined
                        }
                        aria-label={t("logout", { defaultValue: "Logout" })}
                    >
                        {t("logout", { defaultValue: "Logout" })}
                    </Button>
                </>
            ) : (
                <Button
                    component={Link}
                    href="/auth"
                    locale={locale}
                    scroll={false}
                    size="large"
                    sx={{
                        borderRadius: 0,
                        color: "var(--bg)",
                        whiteSpace: "nowrap",
                        "&:hover": {
                            backgroundColor: "color-mix(in oklab, var(--brand-orange) 90%, transparent)",
                        },
                    }}
                >
                    {t("login", { defaultValue: "Login" })}
                </Button>

            )}
        </Stack>
    );
}