'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { mockLiveSessions, mockCourses, mockUsers } from '@/data/mock';
import { formatDate, formatDuration } from '@/lib/utils';
import { features } from '@/config/features';

export default function LiveSessionPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{user: string; message: string; time: string}[]>([
    { user: 'System', message: 'Welcome to the live session!', time: 'Just now' },
    { user: 'Sarah Johnson', message: 'Hello everyone! Ready to start?', time: '1m ago' },
  ]);

  const session = mockLiveSessions.find(s => s.id === params.sessionId);
  const course = session ? mockCourses.find(c => c.id === session.courseId) : null;
  const instructor = course?.instructor;

  if (!features.enableLiveSession) {
    router.push('/live');
    return null;
  }

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Session Not Found</h1>
          <Link href="/live">
            <Button>Back to Live Sessions</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSendChat = () => {
    if (!chatMessage.trim()) return;
    setChatMessages([
      ...chatMessages,
      { user: user?.name || 'You', message: chatMessage, time: 'Just now' },
    ]);
    setChatMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/live" className="text-slate-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-white">{session.title}</h1>
                  <Badge variant={session.status === 'live' ? 'danger' : 'default'}>
                    {session.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-slate-400">{formatDate(session.scheduledAt)} • {session.duration}min</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => setIsChatOpen(!isChatOpen)}>
                {isChatOpen ? 'Hide' : 'Show'} Chat
              </Button>
              <Button variant="outline">Leave</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Placeholder */}
          <div className="flex-1 bg-slate-800 flex items-center justify-center">
            {session.status === 'live' ? (
              <div className="text-center">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Live Session in Progress</h2>
                <p className="text-slate-400">The instructor is live now. Sit back and enjoy!</p>
                <p className="text-slate-500 mt-4">Video stream would appear here (WebRTC/mock)</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Session Not Started</h2>
                <p className="text-slate-400">This session is scheduled for {formatDate(session.scheduledAt)}</p>
              </div>
            )}
          </div>

          {/* Session Info */}
          <div className="bg-slate-800 border-t border-slate-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {instructor && (
                  <>
                    <Avatar src={instructor.avatar} name={instructor.name} size="lg" />
                    <div>
                      <p className="text-white font-medium">{instructor.name}</p>
                      <p className="text-sm text-slate-400">Instructor</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{session.participants.length}</p>
                  <p className="text-sm text-slate-400">Watching</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{session.duration}</p>
                  <p className="text-sm text-slate-400">Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {isChatOpen && (
          <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
            <div className="p-4 border-b border-slate-700">
              <h3 className="font-semibold text-white">Session Chat</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className="text-sm">
                  <span className="text-primary font-medium">{msg.user}:</span>
                  <span className="text-slate-300 ml-2">{msg.message}</span>
                  <span className="text-slate-500 text-xs ml-2">{msg.time}</span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Send a message..."
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                />
                <Button onClick={handleSendChat} size="sm">Send</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}