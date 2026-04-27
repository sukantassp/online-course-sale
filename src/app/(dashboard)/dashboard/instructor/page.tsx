'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { mockCourses, getInstructorCourses } from '@/data/mock';
import { formatCurrency, formatDate } from '@/lib/utils';
import { features } from '@/config/features';

export default function InstructorDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  if (user?.role !== 'instructor' && user?.role !== 'admin') {
    router.push('/dashboard');
    return null;
  }

  const instructorCourses = getInstructorCourses(user?.id || '');
  
  const stats = {
    totalCourses: instructorCourses.length,
    totalStudents: instructorCourses.reduce((acc, c) => acc + c.studentCount, 0),
    totalRevenue: instructorCourses.reduce((acc, c) => acc + (c.price * c.studentCount), 0),
    avgRating: 4.7,
  };

  const tabs = [
    { id: 'courses', label: 'My Courses' },
    { id: 'students', label: 'Students' },
    { id: 'revenue', label: 'Revenue' },
  ];

  if (features.enableLiveSession) {
    tabs.push({ id: 'sessions', label: 'Sessions' });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar src={user?.avatar} name={user?.name} size="xl" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Instructor Dashboard</h1>
                <p className="text-slate-600">Welcome, {user?.name}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={logout} variant="outline">Sign Out</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Courses</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.totalCourses}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Students</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.totalStudents.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-slate-900">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Avg Rating</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.avgRating}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6">
          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">My Courses</h2>
                <Button>Create New Course</Button>
              </div>

              {instructorCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {instructorCourses.map(course => (
                    <Card key={course.id} hover>
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-40 object-cover"
                      />
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                        <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                          <span>{course.studentCount} students</span>
                          <span>{formatCurrency(course.price)}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                          <Button size="sm" className="flex-1">Analytics</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-500 mb-4">You haven&apos;t created any courses yet</p>
                  <Button>Create Your First Course</Button>
                </div>
              )}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Enrolled Students</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instructorCourses.slice(0, 5).map(course => (
                    <div key={course.id} className="p-4 bg-slate-50 rounded-lg">
                      <h3 className="font-medium text-slate-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-slate-600">{course.studentCount} students enrolled</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Revenue Tab */}
          {activeTab === 'revenue' && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Revenue Overview</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instructorCourses.map(course => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{course.title}</p>
                        <p className="text-sm text-slate-500">{course.studentCount} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">{formatCurrency(course.price * course.studentCount)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="font-semibold text-slate-900">Total Revenue</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(stats.totalRevenue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && features.enableLiveSession && (
            <div className="text-center py-12">
              <p className="text-slate-500 mb-4">No live sessions scheduled</p>
              <Button>Schedule a Session</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}