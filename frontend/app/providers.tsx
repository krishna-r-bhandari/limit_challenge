'use client';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { PropsWithChildren, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function useTheme() {
  return useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: { main: '#312e81', light: '#4f46e5', dark: '#1e1b4b' },
          secondary: { main: '#0ea5e9' },
          background: { default: '#f0f4fb', paper: '#ffffff' },
          text: { primary: '#0f172a', secondary: '#475569' },
          divider: 'rgba(15, 23, 42, 0.08)',
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily:
            'var(--font-geist-sans), "SF Pro Text", -apple-system, system-ui, sans-serif',
          h3: { fontWeight: 800, letterSpacing: '-0.03em' },
          h4: { fontWeight: 800, letterSpacing: '-0.02em' },
          h5: { fontWeight: 700, letterSpacing: '-0.02em' },
          h6: { fontWeight: 700 },
          button: { textTransform: 'none', fontWeight: 600 },
        },
        components: {
          MuiButton: {
            styleOverrides: { root: { borderRadius: 10 } },
          },
          MuiCard: {
            styleOverrides: {
              root: { borderRadius: 12, boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)' },
            },
          },
        },
      }),
    [],
  );
}

export default function Providers({ children }: PropsWithChildren) {
  const theme = useTheme();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
