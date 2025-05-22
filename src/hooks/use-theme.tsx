'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light', // Default to light if no system preference or stored value
  storageKey = 'whatsexport-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') { // Handles SSR
      return defaultTheme;
    }
    // Client-side initialization
    try {
      const storedTheme = window.localStorage.getItem(storageKey);
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
      // If no stored theme, check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? 'dark' : 'light';
    } catch (e) {
      // In case of errors (e.g., localStorage disabled), fallback to defaultTheme
      console.warn(`Error reading theme from localStorage ('${storageKey}')`, e);
      return defaultTheme;
    }
  });

  useEffect(() => {
    // This effect runs only on the client
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist theme to localStorage
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch (e) {
        console.warn(`Error saving theme to localStorage ('${storageKey}')`, e);
      }
    }
  }, [theme, storageKey]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // Effect to apply the class on initial client render based on the resolved state
  // This is important because the useState initializer might run before the DOM is fully ready
  // or if the state is derived differently on client vs server (though we try to align them).
  useEffect(() => {
    const root = window.document.documentElement;
    if (typeof window !== 'undefined') { // Ensure client-side
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }
  }, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
