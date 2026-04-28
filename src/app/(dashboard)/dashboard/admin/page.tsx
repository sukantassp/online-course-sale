'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { mockUsers, mockCourses } from '@/data/mock';
import { formatCurrency } from '@/lib/utils';
import { features } from '@/config/features';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  if (user?.role !== 'admin') {
    router.push('/dashboard');
    return null;
  }

  const stats = {
    totalUsers: mockUsers.length,
    totalCourses: mockCourses.length,
    totalRevenue: mockCourses.reduce((acc, c) => acc + (c.price * c.studentCount), 0),
    activeUsers: mockUsers.filter(u => u.role !== 'admin').length,
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'Users' },
    { id: 'courses', label: 'Courses' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar src={user?.avatar} name={user?.name} size="xl" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-600">Platform Management</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={logout} variant="outline">Sign Out</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Users</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <p className="text-sm text-slate-600">Total Courses</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.totalCourses}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <p className="text-sm text-slate-600">Active Users</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.activeUsers}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Recent Users</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers.slice(0, 5).map(u => (
                      <div key={u.id} className="flex items-center gap-4">
                        <Avatar src={u.avatar} name={u.name} size="md" />
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{u.name}</p>
                          <p className="text-sm text-slate-500">{u.email}</p>
                        </div>
                        <Badge variant={u.role === 'admin' ? 'danger' : u.role === 'instructor' ? 'warning' : 'default'}>
                          {u.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Platform Features</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(features).map(([key, enabled]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-700 capitalize">{key.replace('enable', '')}</span>
                        <Badge variant={enabled ? 'success' : 'default'}>
                          {enabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">All Users</h2>
                  <Button>Add User</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-medium text-slate-600">User</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Joined</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map(u => (
                        <tr key={u.id} className="border-b border-slate-100">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar src={u.avatar} name={u.name} size="sm" />
                              <div>
                                <p className="font-medium text-slate-900">{u.name}</p>
                                <p className="text-sm text-slate-500">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={u.role === 'admin' ? 'danger' : u.role === 'instructor' ? 'warning' : 'default'}>
                              {u.role}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <Button size="sm" variant="ghost">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">All Courses</h2>
                  <Button>Add Course</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCourses.map(course => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <img src={course.thumbnail} alt={course.title} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-slate-900">{course.title}</p>
                          <p className="text-sm text-slate-500">{course.category} • {course.studentCount} students</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-slate-900">{formatCurrency(course.price)}</span>
                        <Button size="sm" variant="ghost">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Platform Settings</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-slate-900 mb-4">Feature Toggles</h3>
                    <div className="space-y-3">
                      {Object.entries(features).map(([key, enabled]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900 capitalize">{key.replace('enable', '')}</p>
                            <p className="text-sm text-slate-500">Enable or disable this feature</p>
                          </div>
                          <Badge variant={enabled ? 'success' : 'default'}>
                            {enabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}