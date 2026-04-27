'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { storeUser, removeStoredUser, getStoredUser } from '@/lib/utils';
import { demoLogin } from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginAsRole: (role: 'admin' | 'instructor' | 'student') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for stored user on mount
  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setAuthState({
        user: stored.user,
        token: stored.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Demo login - accept any email/password
      const role = email.includes('admin') ? 'admin' : 
                   email.includes('instructor') ? 'instructor' : 'student';
      
      const result = demoLogin(role);
      if (result) {
        storeUser(result.user, result.token);
        setAuthState({
          user: result.user,
          token: result.token,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const loginAsRole = async (role: 'admin' | 'instructor' | 'student'): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const result = demoLogin(role);
      if (result) {
        storeUser(result.user, result.token);
        setAuthState({
          user: result.user,
          token: result.token,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    removeStoredUser();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, loginAsRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;