'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'node_modules/framer-motion';
import PageTransition from '@/components/PageTransition';
import { FaUserInjured, FaUserMd, FaHospital, FaClinicMedical } from 'node_modules/react-icons/fa';

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false);
  const [userType, setUserType] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUid] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userTypes = [
    { id: 'patient', icon: FaUserInjured, label: 'Patient' },
    { id: 'doctor', icon: FaUserMd, label: 'Doctor' },
    { id: 'hospital', icon: FaHospital, label: 'Hospital' },
    { id: 'pharmacy', icon: FaClinicMedical, label: 'Pharmacy' }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add registration logic here
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-light text-teal-600">
                hippo<span className="font-bold">card</span>
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-6 py-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-8">Create Account</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                {userTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setUserType(type.id)}
                    className={`p-4 rounded-lg border-2 ${
                      userType === type.id 
                        ? 'border-teal-600 bg-teal-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <type.icon className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">{type.label}</span>
                  </button>
                ))}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border rounded"
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
                    className="w-full p-3 border rounded"
                    required
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-teal-600">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-teal-600 text-white p-3 rounded"
              >
                Create Account
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-teal-600">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                © {new Date().getFullYear()} HippoCard
              </span>
              <nav className="flex gap-4">
                <Link href="/terms" className="text-sm text-gray-600 hover:text-teal-600">
                  Terms
                </Link>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-teal-600">
                  Privacy
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}