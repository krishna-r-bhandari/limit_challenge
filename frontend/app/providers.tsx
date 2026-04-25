'use client';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ColorMode = 'dark' | 'light';

type ColorModeContextValue = {
  mode: ColorMode;
  toggleMode: () => void;
};

const STORAGE_KEY = 'submission-tracker-theme-mode';
const ColorModeContext = createContext<ColorModeContextValue | null>(null);

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within Providers');
  }
  return context;
}

function useTheme(mode: ColorMode) {
  return useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#3B82F6', light: '#60A5FA', dark: '#2563EB' },
          secondary: { main: '#22C55E' },
          success: { main: '#22C55E' },
          warning: { main: '#F59E0B' },
          error: { main: '#EF4444' },
          info: { main: '#3B82F6' },
          background:
            mode === 'dark'
              ? { default: '#121212', paper: '#181818' }
              : { default: '#F7F8FA', paper: '#FFFFFF' },
          text:
            mode === 'dark'
              ? {
                  primary: '#FFFFFF',
                  secondary: '#E0E0E0',
                  disabled: '#6B6B6B',
                }
              : {
                  primary: '#0F172A',
                  secondary: '#475569',
                  disabled: '#94A3B8',
                },
          divider: mode === 'dark' ? '#2A2A2A' : '#E2E8F0',
          action:
            mode === 'dark'
              ? {
                  hover: '#242424',
                  selected: '#1F1F1F',
                  disabledBackground: '#2C2C2C',
                }
              : {
                  hover: '#F1F5F9',
                  selected: '#E2E8F0',
                  disabledBackground: '#F1F5F9',
                },
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily: 'var(--font-geist-sans), "SF Pro Text", -apple-system, system-ui, sans-serif',
          h3: { fontWeight: 800, letterSpacing: '-0.03em' },
          h4: { fontWeight: 800, letterSpacing: '-0.02em' },
          h5: { fontWeight: 700, letterSpacing: '-0.02em' },
          h6: { fontWeight: 700 },
          button: { textTransform: 'none', fontWeight: 600 },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: mode === 'dark' ? '#121212' : '#F7F8FA',
                color: mode === 'dark' ? '#FFFFFF' : '#0F172A',
              },
            },
          },
          MuiButton: {
            styleOverrides: { root: { borderRadius: 10 } },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                backgroundColor: mode === 'dark' ? '#181818' : '#FFFFFF',
                boxShadow:
                  mode === 'dark'
                    ? '0 1px 2px rgba(0, 0, 0, 0.5)'
                    : '0 1px 3px rgba(15, 23, 42, 0.06)',
                border: `1px solid ${mode === 'dark' ? '#2A2A2A' : '#E2E8F0'}`,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode],
  );
}

export default function Providers({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ColorMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : 'dark';
  });
  const [queryClient] = useState(() => new QueryClient());
  const theme = useTheme(mode);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}
