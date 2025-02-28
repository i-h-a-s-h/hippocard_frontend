'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'node_modules/framer-motion';
import PageTransition from '@/components/PageTransition';
import { FaUserInjured, FaUserMd, FaHospitalAlt, FaPills } from 'node_modules/react-icons/fa';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Updated navigation links with new styling
  const navigationLinks = [ 
    {
      title: 'Surgeon',
      description: 'Heart Surgeon',
      href: '/doctor',
      icon: <FaUserMd className="text-2xl text-black" />,
      time: '09:00 am',
      date: '13 Jul 2022'
    },
    {
      title: 'Medicine',
      description: 'Specialist',
      href: '/patient',
      icon: <FaPills className="text-2xl text-black" />,
      time: '01:00 pm',
      date: '16 Jul 2022'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        {/* Sidebar - make it collapsible on mobile */}
        <aside className="fixed left-0 top-0 h-screen w-12 md:w-16 bg-white flex flex-col items-center py-4 md:py-6 space-y-6 md:space-y-8 z-50">
          <button className="p-1.5 md:p-2 rounded-xl bg-gray-100 text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <nav className="flex flex-col space-y-4 md:space-y-6">
            <Link href="/" className="p-2 rounded-xl bg-black text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            <Link href="/results" className="p-2 rounded-xl text-gray-400 hover:text-black">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </Link>
            <Link href="/history" className="p-2 rounded-xl text-gray-400 hover:text-black">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </nav>
        </aside>

        {/* Main Content - adjust padding and spacing */}
        <div className="ml-12 md:ml-16 p-4 md:p-8">
          {/* Header - stack elements on mobile */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                Welcome back, <span className="text-black">Samelina!</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <input
                  type="search"
                  placeholder="Search"
                  className="w-full sm:w-auto pl-10 pr-4 py-2 rounded-lg bg-white border-none focus:ring-2 focus:ring-black"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
                <img src="/avatar.jpg" alt="Profile" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
          </header>

          {/* Treatment Section - adjust grid columns */}
          <section className="mb-6 md:mb-8">
            <h2 className="text-base md:text-lg font-medium text-gray-700 mb-3 md:mb-4">Your treatment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {navigationLinks.map((link) => (
                <div key={link.title} className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        {link.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{link.title}</h3>
                        <p className="text-sm text-gray-500">{link.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div className="text-sm text-gray-500">
                      <p>Date: {link.date}</p>
                      <p>Time: {link.time}</p>
                    </div>
                    <button className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-lg text-sm">
                      Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Choose a doctor section - adjust grid columns */}
          <section>
            <h2 className="text-base md:text-lg font-medium text-gray-700 mb-3 md:mb-4">Choose a doctor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {/* Doctor cards */}
              <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">Dr. Isma Currie</h3>
                    <p className="text-sm text-gray-500">Dentist</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">Dr. Fiona Franklin</h3>
                    <p className="text-sm text-gray-500">Dermatologist</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}