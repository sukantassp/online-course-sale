'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { mockCourses, mockUsers } from '@/data/mock';
import { formatRelativeTime } from '@/lib/utils';
import { features } from '@/config/features';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
}

export default function ChatPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'user-2',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      content: 'Hi! Welcome to the Next.js course community. Feel free to ask any questions!',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '2',
      senderId: 'user-4',
      senderName: 'John Doe',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      content: 'Thanks Sarah! Is this course suitable for beginners?',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: '3',
      senderId: 'user-2',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      content: 'Yes! We start from the basics and build up. Even if you have never used React before, you will be able to follow along.',
      timestamp: new Date(Date.now() - 900000).toISOString(),
    },
  ]);

  if (!features.enableChat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Chat Feature Disabled</h1>
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

  const handleSendMessage = () => {
    if (!message.trim() || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Community Chat</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Course Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Course Chats</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockCourses.slice(0, 4).map(course => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourse(course.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedCourse === course.id
                          ? 'bg-primary/10 border border-primary'
                          : 'bg-slate-50 hover:bg-slate-100 border border-transparent'
                      }`}
                    >
                      <p className="font-medium text-slate-900 text-sm">{course.title}</p>
                      <p className="text-xs text-slate-500">{course.studentCount} members</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Online Users */}
            <Card className="mt-6">
              <CardHeader>
                <h2 className="text-lg font-semibold">Online Users</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockUsers.slice(0, 4).map(u => (
                    <div key={u.id} className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar src={u.avatar} name={u.name} size="sm" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{u.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {selectedCourse
                        ? mockCourses.find(c => c.id === selectedCourse)?.title
                        : 'General Chat'}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {mockUsers.filter(u => u.role !== 'admin').length} members
                    </p>
                  </div>
                  <Badge variant="success">Online</Badge>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.senderId === user?.id ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar src={msg.senderAvatar} name={msg.senderName} size="sm" />
                    <div className={`max-w-[70%] ${msg.senderId === user?.id ? 'text-right' : ''}`}>
                      <div className={`inline-block p-3 rounded-lg ${
                        msg.senderId === user?.id
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}>
                        <p>{msg.content}</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {msg.senderName} • {formatRelativeTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-200">
                <div className="flex gap-3">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}