'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'node_modules/framer-motion';
import PageTransition from '@/components/PageTransition';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <PageTransition>
      <motion.div 
        className="min-h-screen bg-white flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Header */}
        <header className="border-white border-b bg-white shadow-sm">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-light text-black">
                hippo<span className="font-bold">card</span>
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto">
          <div className="flex min-h-[calc(100vh-8rem)]">
            {/* Left Column - Blue Section */}
            <div className="hidden md:flex md:w-[45%] bg-blue-600 items-center justify-center p-12 rounded-l-2xl my-8">
              <div className="max-w-md text-white">
                <h1 className="text-2xl mb-4">Welcome to</h1>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white rounded-full p-3">
                    <Image
                      src="/icon.png"
                      alt="HippoCard Logo"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <span className="text-3xl font-semibold">Spacer</span>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            {/* Right Column - Form Section */}
            <div className="w-full md:w-[55%] flex items-center justify-center p-8 bg-white my-8 rounded-r-2xl">
              <div className="w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-8 text-gray-900">
                  Create your account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                      By signing up I agree to the <Link href="/terms" className="text-blue-600 hover:text-blue-500">Terms & Conditions</Link>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Sign Up
                    </button>

                    <p className="text-center text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>

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
      </motion.div>
    </PageTransition>
  );
}