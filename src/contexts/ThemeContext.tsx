'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { themes, defaultTheme, Theme } from '@/lib/themes';

interface ThemeContextType {
  currentTheme: string;
  theme: Theme;
  isDarkMode: boolean;
  setTheme: (themeName: string) => void;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }

    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true');
    }
  }, []);

  useEffect(() => {
    const theme = themes[currentTheme];
    const colors = isDarkMode ? theme.colors.dark : theme.colors.light;

    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
      const cssVarName = `--color-${key
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()}`;
      root.style.setProperty(cssVarName, value);
    });

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', currentTheme);
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [currentTheme, isDarkMode]);

  const setTheme = (themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const value: ThemeContextType = {
    currentTheme,
    theme: themes[currentTheme],
    isDarkMode,
    setTheme,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
