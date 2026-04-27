'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { features } from '@/config/features';
import Image from "next/image";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-36 h-16 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  <Image 
                    src="/images/logo.png"
                    alt="Logo"
                    width={120}
                    height={90}
                    className="w-full h-full object-contain" 
                  />
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/chat" className="text-slate-600 hover:text-primary transition-colors">
              About us
            </Link>

            <Link href="/courses" className="text-slate-600 hover:text-primary transition-colors">
              Courses
            </Link>

            <Link href="/chat" className="text-slate-600 hover:text-primary transition-colors">
              Training & Placements
            </Link>

            <Link href="/chat" className="text-slate-600 hover:text-primary transition-colors">
              Admissions
            </Link>
            
            <Link href="/chat" className="text-slate-600 hover:text-primary transition-colors">
              Gallery
            </Link>

            {features.enableLiveSession && (
              <Link href="/live" className="text-slate-600 hover:text-primary transition-colors">
                Live Sessions
              </Link>
            )}
            
            {features.enableChat && (
              <Link href="/chat" className="text-slate-600 hover:text-primary transition-colors">
                Chat
              </Link>
            )}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {features.enableDashboard && (
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm">Dashboard</Button>
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center gap-2">
                    <Avatar src={user?.avatar} name={user?.name} size="sm" />
                    <span className="text-sm font-medium text-slate-700">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-1">
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                        My Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200">
          <div className="px-4 py-3 space-y-3">
            <Link href="/courses" className="block text-slate-600 hover:text-primary">
              Courses
            </Link>
            {features.enableLiveSession && (
              <Link href="/live" className="block text-slate-600 hover:text-primary">
                Live Sessions
              </Link>
            )}
            {features.enableChat && (
              <Link href="/chat" className="block text-slate-600 hover:text-primary">
                Chat
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="block text-slate-600 hover:text-primary">
                  Dashboard
                </Link>
                <button onClick={logout} className="block text-red-600">
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button size="sm" className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;