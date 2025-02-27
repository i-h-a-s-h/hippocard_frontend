'use client';

import { useState } from 'react';
import UserProfile from '@/components/dashboard/UserProfile';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <UserProfile />
      </div>
    </div>
  );
} 