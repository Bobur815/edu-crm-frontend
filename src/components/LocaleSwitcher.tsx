// components/LocaleSwitcher.tsx
"use client";

import { TextField, MenuItem, Box } from "@mui/material";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { type Locale } from "@/i18n";
import Image from "next/image";

const LANGS: Array<{ code: Locale; label: string }> = [
  { code: "uz", label: "O‘zbekcha" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value as Locale;
    if (next === locale) return;
    router.replace(pathname, { locale: next });
    if (typeof window !== "undefined") localStorage.setItem("lang", next);
  };

  return (
    <TextField
      select
      size="small"
      value={locale}
      onChange={handleChange}
      sx={{
        minWidth: 160,
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          backgroundColor: "var(--paper)",
          color: "var(--fg)",
          "& fieldset": { borderColor: "var(--border)", borderRadius: 1 },
          "&:hover fieldset": { borderColor: "var(--primary)" },
          "&.Mui-focused fieldset": { borderColor: "var(--primary)", },
          "& .MuiSelect-icon": { color: "var(--fg)" },
        },
      }}
      // MUI v6: use slotProps; for v5 use SelectProps.renderValue instead
      slotProps={{
        select: {
          MenuProps: { disableScrollLock: true },
          renderValue: (value: unknown) => {
            const v = value as Locale;
            const cur = LANGS.find((l) => l.code === v);
            if (!cur) return null;
            return (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {/* icon only for selected value in the input */}
                <Image
                  src="/language_24dp_E3E3E3.png"
                  width={18}
                  height={18}
                  alt="UZ"
                />
                {cur.label}
              </Box>
            );
          },
        },
      }}
    >
      {LANGS.map((l) => (
        <MenuItem
          key={l.code}
          value={l.code}
          sx={{
            "&.Mui-selected": {
              color: "#222",
              bgcolor: 'var(--fg)',
            },
          }}
        >
          {l.label}

        </MenuItem>
      ))}
    </TextField>
  );
}
