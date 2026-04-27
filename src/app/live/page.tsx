'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { mockLiveSessions, mockCourses } from '@/data/mock';
import { formatDate, formatDuration } from '@/lib/utils';
import { features } from '@/config/features';

export default function LiveSessionsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  if (!features.enableLiveSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Live Sessions Disabled</h1>
          <p className="text-slate-600 mb-4">This feature is currently disabled by the administrator.</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const upcomingSessions = mockLiveSessions.filter(s => s.status === 'scheduled');
  const liveSessions = mockLiveSessions.filter(s => s.status === 'live');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Live Sessions</h1>
            <p className="text-slate-600 mt-2">Join live Q&A sessions and interact with instructors</p>
          </div>
          {user?.role === 'instructor' && (
            <Button>Schedule Session</Button>
          )}
        </div>

        {/* Live Now */}
        {liveSessions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              Live Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveSessions.map(session => (
                <Card key={session.id} className="border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="danger">LIVE</Badge>
                      <span className="text-sm text-slate-500">{session.duration}min</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{session.title}</h3>
                    <p className="text-slate-600 mb-4">{session.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={mockCourses.find(c => c.id === session.courseId)?.instructor?.avatar}
                          name={mockCourses.find(c => c.id === session.courseId)?.instructor?.name}
                          size="sm"
                        />
                        <span className="text-sm text-slate-600">
                          {mockCourses.find(c => c.id === session.courseId)?.instructor?.name}
                        </span>
                      </div>
                      <Link href={`/live/${session.id}`}>
                        <Button>Join Now</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Sessions */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Upcoming Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingSessions.map(session => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="default">Upcoming</Badge>
                    <span className="text-sm text-slate-500">{session.duration}min</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{session.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm">{session.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(session.scheduledAt)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {session.participants.length} registered
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={mockCourses.find(c => c.id === session.courseId)?.instructor?.avatar}
                        name={mockCourses.find(c => c.id === session.courseId)?.instructor?.name}
                        size="sm"
                      />
                      <span className="text-sm text-slate-600">
                        {mockCourses.find(c => c.id === session.courseId)?.instructor?.name}
                      </span>
                    </div>
                    <Link href={`/live/${session.id}`}>
                      <Button size="sm" variant="outline">Register</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* No Sessions */}
        {mockLiveSessions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Live Sessions</h3>
            <p className="text-slate-600 mb-4">Check back later for upcoming live sessions</p>
            <Link href="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}