'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'node_modules/framer-motion';

export default function DoctorPage() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const sidebarLinks = [
    {
      section: 'DASHBOARD',
      items: [
        {
          title: 'Medical history',
          href: '/insurance',
          icon: '📋'
        },
        {
          title: 'Prescription',
          href: '/profile',
          icon: '💊'
        }
      ]
    }
  ];

  // Return null on server-side
  if (!mounted) {
    return <div className="min-h-screen bg-gray-50"></div>;
  }

  return (
    <motion.main 
      className="min-h-screen bg-gray-50 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sidebar - Made more minimal */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:block">
        <div className="p-6">
          <Link href="/" className="text-xl font-light text-gray-800 flex items-center hover:text-blue-500 transition-colors">
            hippo<span className="font-bold">card</span>
          </Link>
        </div>
        
        <nav className="px-4 mt-6">
          {sidebarLinks.map((section) => (
            <div key={section.section} className="mb-8">
              <h3 className="text-xs font-medium text-gray-400 px-2 mb-4">
                {section.section}
              </h3>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-500 transition-all mb-1"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        {/* Header - Simplified */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Mobile menu button - More minimal */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="space-y-1.5">
                  <span className={`block w-5 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-gray-600 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>

              {/* User Menu - More elegant */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Dr. Smith</span>
                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                  👤
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - Cleaner layout */}
        <main className="px-6 py-8">
          {/* Top Actions Bar - Simplified */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Search Box - More minimal */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search records..."
                className="w-full px-4 py-2 pl-10 border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50 text-gray-600 placeholder-gray-400"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>

            {/* Action Buttons - Cleaner design */}
            <div className="flex items-center gap-3">
              <select className="px-4 py-2 border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50 text-gray-600">
                <option value="">Sort by</option>
                <option value="date">Date</option>
                <option value="name">Name</option>
              </select>

              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                + New Record
              </button>
            </div>
          </div>

          {/* Records Grid - More elegant cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Record Cards - Simplified design */}
            <div className="bg-gray-50 p-5 rounded-xl hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-800">General Consultation</h3>
                  <p className="text-gray-500 text-sm">Dr. Sarah Johnson</p>
                </div>
                <span className="text-gray-400">📄</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">March 15, 2024</p>
                <p className="text-sm text-gray-500">Regular Checkup</p>
                <span className="inline-block px-2 py-1 text-xs bg-green-50 text-green-600 rounded-md">
                  Completed
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-800">Blood Test Results</h3>
                  <p className="text-gray-500 text-sm">Central Diagnostics</p>
                </div>
                <span className="text-gray-400">🧪</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">March 10, 2024</p>
                <p className="text-sm text-gray-500">Laboratory Test</p>
                <span className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-md">
                  Available
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar - Cleaner design */}
      {isMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-white z-50 md:hidden"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween' }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="text-xl font-light text-gray-800">
                hippo<span className="font-bold">card</span>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <nav>
              {sidebarLinks.map((section) => (
                <div key={section.section} className="mb-8">
                  <h3 className="text-xs font-medium text-gray-400 mb-4">
                    {section.section}
                  </h3>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 py-2.5 text-gray-600 hover:text-blue-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </motion.main>
  );
}
