'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sidebarLinks = [
    {
      section: 'DASHBOARD',
      items: [
        {
          title: 'My Profile',
          href: '/profile',
          icon: '👤'
        }
      ]
    },
    {
      section: 'HEALTH RECORDS',
      items: [
        {
          title: 'Insurance',
          href: '/insurance',
          icon: '📄'
        },
        {
          title: 'Allergies',
          href: '/allergies',
          icon: '🌿'
        },
        {
          title: 'Medical History',
          href: '/medical-history',
          icon: '📋'
        },
        {
          title: 'Hospitalization History',
          href: '/hospitalization',
          icon: '🏥'
        },
        {
          title: 'Checkup History',
          href: '/checkup',
          icon: '🔍'
        }
      ]
    },
    {
      section: 'AVAILABLE DOCTORS',
      items: [
        {
          title: 'Doctors',
          href: '/doctors',
          icon: '👨‍⚕️'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-100 hidden md:block">
        <div className="p-6">
          <Link href="/" className="text-xl font-light text-black flex items-center">
            <span className="text-2xl mr-2">🛡️</span>
            Medi<span className="font-bold">Vault</span>
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
                <span className="text-black">Hi, test</span>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  👤
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="container mx-auto px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-light mb-6 text-black">User Profile</h2>
              
              <form className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1">
                    <label className="text-sm text-black">Name:</label>
                    <div className="flex items-center justify-between">
                      <span className="text-black">test</span>
                      <button type="button" className="text-black hover:bg-gray-100 p-1 rounded">
                        ✏️
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1">
                    <label className="text-sm text-black">Email:</label>
                    <div className="flex items-center justify-between">
                      <span className="text-black">testp@gmail.com</span>
                      <button type="button" className="text-black hover:bg-gray-100 p-1 rounded">
                        ✏️
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1">
                    <label className="text-sm text-black">Password:</label>
                    <div className="flex items-center justify-between">
                      <span className="text-black">•••</span>
                      <button type="button" className="text-black hover:bg-gray-100 p-1 rounded">
                        ✏️
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-cyan-400 text-white px-6 py-2 rounded-lg hover:bg-cyan-500 transition-colors"
                >
                  Save
                </button>
              </form>
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
  );
}
