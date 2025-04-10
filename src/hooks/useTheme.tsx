'use client'
import { create } from 'zustand';
import { useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeStore>((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
}));

// Initialize theme
if (typeof window !== 'undefined') {
  const storedTheme = localStorage.getItem('theme') as Theme | null;
  if (storedTheme) {
    useTheme.setState({ theme: storedTheme });
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    useTheme.setState({ theme: 'dark' });
  }
}

// Subscribe to changes and update document class and localStorage
useTheme.subscribe(({ theme }) => {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }
});

// Optional: Component to initialize theme (use in root layout)
export function ThemeInitializer() {
  useEffect(() => {
    const { theme } = useTheme.getState();
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);
  
  return null;
}