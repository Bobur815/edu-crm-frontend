'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, Paper,
  TextField, Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ACCESS, REFRESH } from '@/lib/tokens';
import { useTranslations } from 'next-intl';
import { api } from '@/lib/axios';

export default function LoginPage() {
  const t = useTranslations('login');
  const router = useRouter();
  const locale = useLocale(); // <— current [locale] segment
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // If already logged in, go straight to locale home
  React.useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(ACCESS)) {
      router.replace(`/${locale}/students`);
    }
  }, [router, locale]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!email || !password) throw new Error('login_required');

      const { data } = await api.post('/auth/login', { email, password });

      localStorage.setItem(ACCESS, data.accessToken);
      localStorage.setItem(REFRESH, data.refreshToken);

      // make the server see it on next request
      document.cookie = `educrm_access=${data.accessToken}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`;

      // also set auth header for in-app API calls
      api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

      // redirect to a concrete, protected page (no bare "/")
      router.replace(`/${locale}/students`);
      // optional: ensure server revalidation
      // router.refresh();
    } catch (_err) {
      setError('Login yoki parol noto‘g‘ri');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex items-center justify-center">
        <img src="/crm.png" alt="Auth illustration" className="max-w-[420px] w-[80%]" />
      </div>
      <div className="flex items-center justify-center p-6">
        <Paper elevation={0} sx={{ p: 4, width: '100%', maxWidth: 420, bgcolor: 'background.paper' }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {t('login')}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                type="email"
                label={t('email')}
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 1 }}>
              <TextField
                label={t('password')}
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={() => setShowPass((s) => !s)} edge="end">
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>

            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1, mb: 1 }}>
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" fullWidth size="large" disabled={loading} sx={{ mt: 2 }}>
              {loading ? <CircularProgress size={24} /> : t('login')}
            </Button>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              {t('forgotPassword')}{' '}
              <Link href="#" className="underline hover:opacity-80">{t('reset')}</Link>
            </Typography>
          </Box>
        </Paper>
      </div>
    </div>
  );
}
