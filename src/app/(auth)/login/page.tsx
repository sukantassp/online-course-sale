'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Try using admin, instructor, or student in email.');
    }
  };

  const handleDemoLogin = async (role: 'admin' | 'instructor' | 'student') => {
    const demoEmails = {
      admin: 'admin@eduverse.com',
      instructor: 'instructor@eduverse.com',
      student: 'student@eduverse.com',
    };
    
    const success = await login(demoEmails[role], 'demo');
    if (success) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">EduVerse</span>
          </Link>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-600 mb-6">Sign in to continue learning</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with demo</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <button
                onClick={() => handleDemoLogin('student')}
                className="flex flex-col items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="text-2xl mb-1">🎓</span>
                <span className="text-xs font-medium">Student</span>
              </button>
              <button
                onClick={() => handleDemoLogin('instructor')}
                className="flex flex-col items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="text-2xl mb-1">👨‍🏫</span>
                <span className="text-xs font-medium">Instructor</span>
              </button>
              <button
                onClick={() => handleDemoLogin('admin')}
                className="flex flex-col items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="text-2xl mb-1">⚙️</span>
                <span className="text-xs font-medium">Admin</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-slate-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}