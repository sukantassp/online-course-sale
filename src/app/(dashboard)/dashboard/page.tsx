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
import { mockCourses, mockOrders, mockLiveSessions } from '@/data/mock';
import { formatCurrency, formatDate } from '@/lib/utils';
import { features } from '@/config/features';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  // Redirect based on role
  if (user?.role === 'instructor') {
    router.push('/dashboard/instructor');
    return null;
  }
  if (user?.role === 'admin') {
    router.push('/dashboard/admin');
    return null;
  }

  const studentOrders = mockOrders.filter(o => o.userId === user?.id);
  const enrolledCourses = studentOrders.length;

  const stats = {
    enrolledCourses,
    completedCourses: 2,
    totalSpent: studentOrders.reduce((acc, o) => acc + o.amount, 0),
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'My Courses' },
    { id: 'orders', label: 'Order History' },
  ];

  if (features.enableLiveSession) {
    tabs.push({ id: 'sessions', label: 'Live Sessions' });
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
                <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
                <p className="text-slate-600">Student Dashboard</p>
              </div>
            </div>
            <Button variant="outline" onClick={logout}>Sign Out</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Enrolled Courses</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.enrolledCourses}</p>
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
                  <p className="text-sm text-slate-600">Completed</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.completedCourses}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Spent</p>
                  <p className="text-3xl font-bold text-slate-900">{formatCurrency(stats.totalSpent)}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              {/* Recent Courses */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Recent Courses</h2>
                </CardHeader>
                <CardContent>
                  {studentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {studentOrders.slice(0, 3).map(order => (
                        <div key={order.id} className="flex items-center gap-4">
                          <img
                            src={order.course?.thumbnail}
                            alt={order.course?.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{order.course?.title}</p>
                            <p className="text-sm text-slate-500">{formatDate(order.createdAt)}</p>
                          </div>
                          <Badge variant={order.status === 'completed' ? 'success' : 'warning'}>
                            {order.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-center py-4">No courses enrolled yet</p>
                  )}
                  <Link href="/courses" className="block mt-4">
                    <Button variant="outline" className="w-full">Browse Courses</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Upcoming Sessions */}
              {features.enableLiveSession && (
                <Card>
                  <CardHeader>
                    <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
                  </CardHeader>
                  <CardContent>
                    {mockLiveSessions.length > 0 ? (
                      <div className="space-y-4">
                        {mockLiveSessions.slice(0, 3).map(session => (
                          <div key={session.id} className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-slate-900">{session.title}</p>
                              <p className="text-sm text-slate-500">{formatDate(session.scheduledAt)}</p>
                            </div>
                            <Link href={`/live/${session.id}`}>
                              <Button size="sm">Join</Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-center py-4">No upcoming sessions</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* My Courses Tab */}
          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentOrders.length > 0 ? (
                studentOrders.map(order => (
                  <Card key={order.id} hover>
                    <img
                      src={order.course?.thumbnail}
                      alt={order.course?.title}
                      className="w-full h-40 object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">{order.course?.title}</h3>
                      <div className="flex items-center justify-between">
                        <Badge variant="success">Enrolled</Badge>
                        <Button size="sm">Continue</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-500 mb-4">You haven&apos;t enrolled in any courses yet</p>
                  <Link href="/courses">
                    <Button>Browse Courses</Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Order History</h2>
              </CardHeader>
              <CardContent>
                {studentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {studentOrders.map(order => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={order.course?.thumbnail}
                            alt={order.course?.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-slate-900">{order.course?.title}</p>
                            <p className="text-sm text-slate-500">Order #{order.id} • {formatDate(order.createdAt)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">{formatCurrency(order.amount)}</p>
                          <Badge variant={order.status === 'completed' ? 'success' : 'warning'}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-8">No orders yet</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && features.enableLiveSession && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockLiveSessions.map(session => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant={session.status === 'live' ? 'danger' : 'default'}>
                        {session.status}
                      </Badge>
                      <span className="text-sm text-slate-500">{session.duration}min</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{session.title}</h3>
                    <p className="text-slate-600 mb-4">{session.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{formatDate(session.scheduledAt)}</span>
                      <Link href={`/live/${session.id}`}>
                        <Button>Join Session</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}