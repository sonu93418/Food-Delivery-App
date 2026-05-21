import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'app_theme';

export const darkTheme = {
  isDark: true,
  statusBar: 'light-content',
  statusBarBg: '#1a1a2e',
  bg: '#1a1a2e',
  card: 'rgba(255,255,255,0.06)',
  cardBorder: 'rgba(255,255,255,0.05)',
  cardSolid: '#16213e',
  text: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.5)',
  textMuted: 'rgba(255,255,255,0.35)',
  inputBg: 'rgba(255,255,255,0.08)',
  inputBorder: 'rgba(255,255,255,0.06)',
  divider: 'rgba(255,255,255,0.06)',
  iconBg: 'rgba(255,255,255,0.08)',
  drawerBg: '#1a1a2e',
  drawerActive: 'rgba(255,107,53,0.1)',
  drawerInactive: 'rgba(255,255,255,0.5)',
  tabBarBg: '#1a1a2e',
  tabBarBorder: 'rgba(255,255,255,0.06)',
  tabBarInactive: 'rgba(255,255,255,0.35)',
  checkoutBar: 'rgba(26,26,46,0.95)',
  sectionLabel: 'rgba(255,255,255,0.4)',
};

export const lightTheme = {
  isDark: false,
  statusBar: 'dark-content',
  statusBarBg: '#f5f6fa',
  bg: '#f5f6fa',
  card: '#ffffff',
  cardBorder: 'rgba(0,0,0,0.07)',
  cardSolid: '#ffffff',
  text: '#1a1a2e',
  textSecondary: 'rgba(26,26,46,0.55)',
  textMuted: 'rgba(26,26,46,0.38)',
  inputBg: 'rgba(0,0,0,0.05)',
  inputBorder: 'rgba(0,0,0,0.07)',
  divider: 'rgba(0,0,0,0.07)',
  iconBg: 'rgba(0,0,0,0.06)',
  drawerBg: '#ffffff',
  drawerActive: 'rgba(255,107,53,0.1)',
  drawerInactive: 'rgba(26,26,46,0.5)',
  tabBarBg: '#ffffff',
  tabBarBorder: 'rgba(0,0,0,0.07)',
  tabBarInactive: 'rgba(26,26,46,0.35)',
  checkoutBar: 'rgba(245,246,250,0.97)',
  sectionLabel: 'rgba(26,26,46,0.4)',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved !== null) {
        setIsDark(saved === 'dark');
      }
    } catch (e) {
      console.log('Error loading theme:', e);
    } finally {
      setIsThemeLoaded(true);
    }
  };

  const toggleTheme = async () => {
    const newDark = !isDark;
    setIsDark(newDark);
    try {
      await AsyncStorage.setItem(THEME_KEY, newDark ? 'dark' : 'light');
    } catch (e) {
      console.log('Error saving theme:', e);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, isThemeLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
