import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const authData = await AsyncStorage.getItem('authState');
      if (authData) {
        const parsed = JSON.parse(authData);
        setIsAuthenticated(true);
        setUser(parsed.user);
      }
    } catch (error) {
      console.log('Error loading auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    const mockUser = {
      id: '1',
      name: 'Rahul Sharma',
      email: email || 'rahul@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=FF6B35&color=fff&size=128',
    };
    try {
      await AsyncStorage.setItem(
        'authState',
        JSON.stringify({ user: mockUser, isAuthenticated: true })
      );
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Error saving auth state:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authState');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Error removing auth state:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
