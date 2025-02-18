import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isClient = typeof window !== 'undefined';

  const getSystemTheme = () => {
    if (!isClient) return 'light'; // Default to light in SSR
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const getInitialTheme = (): Theme => {
    if (!isClient) return 'system';
    return (localStorage.getItem('theme') as Theme | null) || 'system';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(
    theme === 'system' ? getSystemTheme() : theme
  );

  useEffect(() => {
    if (!isClient) return;

    const applyTheme = (currentTheme: Theme) => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');

      const newTheme: 'light' | 'dark' = currentTheme === 'system' ? getSystemTheme() : currentTheme;
      setResolvedTheme(newTheme);
      root.classList.add(newTheme);
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        const newSystemTheme = getSystemTheme();
        setResolvedTheme(newSystemTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newSystemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme, isClient]);

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme: (newTheme: Theme) => {
          if (isClient) {
            localStorage.setItem('theme', newTheme);
          }
          setTheme(newTheme);
          if (newTheme !== 'system' && isClient) {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(newTheme);
          }
        },
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
