'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'node_modules/framer-motion';
import PageTransition from '@/components/PageTransition';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = [
    {
      title: 'Patient',
      href: '/patient',
      description: 'Access your medical records'
    },
    {
      title: 'Doctor',
      href: '/doctor',
      description: 'Manage your patients'
    },
    {
      title: 'Pharmacy',
      href: '/pharmacy',
      description: 'Handle prescriptions'
    },
    {
      title: 'Appointments',
      href: '/appointments',
      description: 'Schedule visits'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-white border-b bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-light text-black">
              hippo<span className="font-bold">card</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              type="button"
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-black transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link href="/login" className="text-black hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                Login
              </Link>
              <Link href="/register" className="text-black hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                Register
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <Link href="/login" className="block py-2 text-black hover:bg-gray-50 rounded-lg px-4">
                Login
              </Link>
              <Link href="/register" className="block py-2 text-black hover:bg-gray-50 rounded-lg px-4">
                Register
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <motion.main 
        className="container mx-auto px-6"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.section 
          className="py-20 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          <h1 className="text-4xl font-light mb-6 text-black">
            Streamlined healthcare management for everyone
          </h1>
          <p className="text-black mb-12">
            Access and manage your medical records, prescriptions, and appointments in one secure place.
          </p>
        </motion.section>

        {/* Navigation Cards */}
        <motion.section 
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto py-12"
          variants={containerVariants}
        >
          {navigationLinks.map((link) => (
            <motion.div
              key={link.href}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={link.href}
                className="group p-6 bg-white border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 rounded-lg block"
              >
                <h2 className="text-xl mb-2 text-black">
                  {link.title}
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </h2>
                <p className="text-black text-sm">{link.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="py-20 border-t border-gray-100"
          variants={itemVariants}
        >
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg mb-2 text-black">Secure</h3>
              <p className="text-sm text-black">
                Protected with industry-leading security measures
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg mb-2 text-black">Simple</h3>
              <p className="text-sm text-black">
                Intuitive interface for seamless navigation
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg mb-2 text-black">Connected</h3>
              <p className="text-sm text-black">
                Unified platform for all healthcare needs
              </p>
            </div>
          </div>
        </motion.section>
      </motion.main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-black">
              © {new Date().getFullYear()} HippoCard
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/about" className="text-sm text-black hover:bg-white px-4 py-2 rounded-lg transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-sm text-black hover:bg-white px-4 py-2 rounded-lg transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-black hover:bg-white px-4 py-2 rounded-lg transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
