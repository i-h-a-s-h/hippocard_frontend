'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { motion } from 'node_modules/framer-motion';
import PageTransition from '@/components/PageTransition';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sidebarLinks = [
    {
      section: 'DASHBOARD',
      items: [
        {
          title: 'Medical history',
          href: '/insurance',
          icon: '📄'
        },
        {
          title: 'Prescription',
          href: '/profile',
          icon: '🧰'
        }
      ]
    },
    {
      section: '',
      items: [
       
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-100 hidden md:block">
          <div className="p-6">
            <Link href="/" className="text-xl font-light text-black flex items-center">
              <span className="text-2xl mr-2"></span>
              Hippo<span className="font-bold">Card</span>
            </Link>
          </div>
          
          <nav className="px-4">
            {sidebarLinks.map((section) => (
              <div key={section.section} className="mb-8">
                <h3 className="text-xs font-semibold text-gray-400 px-2 mb-2">
                  {section.section}
                </h3>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-2 py-2 rounded-lg text-black hover:bg-gray-50 transition-colors"
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="border-b border-gray-100 bg-white">
            <div className="container mx-auto px-6 py-4">
              <div className="flex justify-end items-center">
                {/* Mobile menu button */}
                <button
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div className="space-y-1.5">
                    <span className={`block w-6 h-0.5 bg-black transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-black ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-black transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                  </div>
                </button>

                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  <span className="text-black">Doctor Smith</span>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    👤
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="container mx-auto px-6 py-8">
            {/* Top Actions Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              {/* Search Box */}
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search health records..."
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <span className="absolute left-3 top-2.5">🔍</span>
              </div>

              {/* Action Buttons Group */}
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                  <option value="">Sort by</option>
                  <option value="date">Date</option>
                  <option value="type">Record Type</option>
                  <option value="doctor">Doctor</option>
                </select>

                {/* Filter Dropdown */}
                <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                  <option value="">Filter by</option>
                  <option value="consultation">Consultation</option>
                  <option value="test">Test Results</option>
                  <option value="prescription">Prescriptions</option>
                </select>

                {/* Add New Record Button */}
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  + Add New Record
                </button>
              </div>
            </div>

            {/* Records Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Record Cards */}
              <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-black">General Consultation</h3>
                    <p className="text-black">Dr. Sarah Johnson</p>
                  </div>
                  <span className="text-black">📄</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-black">Date: March 15, 2024</p>
                  <p className="text-sm text-black">Type: Regular Checkup</p>
                  <p className="text-sm text-black">Status: Completed</p>
                </div>
              </div>

              <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-black">Blood Test Results</h3>
                    <p className="text-black">Lab: Central Diagnostics</p>
                  </div>
                  <span className="text-black">🧪</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-black">Date: March 10, 2024</p>
                  <p className="text-sm text-black">Type: Laboratory Test</p>
                  <p className="text-sm text-black">Status: Available</p>
                </div>
              </div>
              
            </div>
          </main>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 md:hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="text-xl font-light text-black flex items-center">
                  <span className="text-2xl mr-2">🛡️</span>
                  Medi<span className="font-bold">Vault</span>
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="text-black">
                  ✕
                </button>
              </div>
              <nav>
                {sidebarLinks.map((section) => (
                  <div key={section.section} className="mb-8">
                    <h3 className="text-xs font-semibold text-gray-400 mb-2">
                      {section.section}
                    </h3>
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-2 py-2 text-black"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
