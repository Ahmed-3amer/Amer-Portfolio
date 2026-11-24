import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type LightingTheme = 'day' | 'night';

interface ThemeContextValue {
  theme: LightingTheme;
  isManualOverride: boolean;
  setTheme: (next: LightingTheme) => void;
  toggleTheme: () => void;
  resetToAutoTime: () => void;
}

const STORAGE_KEY = 'amer-theme';

function detectLocalTimeTheme(): LightingTheme {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'day' : 'night';
}

function readStoredTheme(): LightingTheme | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'day' || stored === 'night') {
      return stored;
    }
  } catch {
    // sessionStorage may be unavailable in restricted contexts
  }
  return null;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const initialStored = readStoredTheme();

  const [theme, setThemeState] = useState<LightingTheme>(
    () => initialStored ?? detectLocalTimeTheme(),
  );
  const [isManualOverride, setIsManualOverride] = useState<boolean>(
    () => initialStored !== null,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (isManualOverride) return;

    const intervalId = window.setInterval(() => {
      const nextAuto = detectLocalTimeTheme();
      setThemeState((current) => (current === nextAuto ? current : nextAuto));
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, [isManualOverride]);

  const setTheme = useCallback((next: LightingTheme) => {
    setThemeState(next);
    setIsManualOverride(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next: LightingTheme = current === 'day' ? 'night' : 'day';
      setIsManualOverride(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  const resetToAutoTime = useCallback(() => {
    setIsManualOverride(false);
    setThemeState(detectLocalTimeTheme());
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isManualOverride,
      setTheme,
      toggleTheme,
      resetToAutoTime,
    }),
    [theme, isManualOverride, setTheme, toggleTheme, resetToAutoTime],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
