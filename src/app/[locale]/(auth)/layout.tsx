// src/app/[locale]/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // Minimal layout for auth pages — root providers already applied above.
  return <>{children}</>;
}
