import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { darkColors, lightColors, semantic, gradient } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, radius } from '../constants/spacing';
import type { Theme, ThemeContextValue, ThemeColors } from '../types/theme';

// Create context with undefined default
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Theme Provider Props
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

// Theme Provider Component
export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  // Get colors based on current theme
  const colors: ThemeColors = useMemo(() => {
    return theme === 'dark' ? darkColors : lightColors;
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  // Set specific theme
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Memoize the context value
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      colors,
      semantic,
      typography,
      spacing,
      radius,
      gradient,
      toggleTheme,
      setTheme,
    }),
    [theme, colors, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// Export the context for advanced use cases
export { ThemeContext };

