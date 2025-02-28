'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { FaUserInjured, FaUserMd, FaHospital, FaClinicMedical, FaHeartbeat, FaNotesMedical, FaTablets, FaStethoscope, FaBriefcaseMedical, FaDna, FaLungs, FaBrain, FaVirus, FaAmbulance } from 'react-icons/fa';

export default function LoginPage() {
  const [userType, setUserType] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUid] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const userTypes = [
    { id: 'patient', icon: FaUserInjured, label: 'Patient' },
    { id: 'doctor', icon: FaUserMd, label: 'Doctor' },
    { id: 'hospital', icon: FaHospital, label: 'Hospital' },
    { id: 'pharmacy', icon: FaClinicMedical, label: 'Pharmacy' }
  ];

  const decorativeIcons = [
    { Icon: FaHeartbeat, position: 'top-20 left-10', delay: 0 },
    { Icon: FaNotesMedical, position: 'bottom-32 right-12', delay: 0.2 },
    { Icon: FaTablets, position: 'top-40 right-20', delay: 0.4 },
    { Icon: FaStethoscope, position: 'bottom-20 left-32', delay: 0.6 },
    { Icon: FaBriefcaseMedical, position: 'top-1/2 right-10', delay: 0.8 },
    { Icon: FaDna, position: 'top-1/3 left-1/4', delay: 1.0, className: 'animate-dna' },
    { Icon: FaLungs, position: 'bottom-1/4 right-1/4', delay: 1.2 },
    { Icon: FaBrain, position: 'top-1/4 right-1/3', delay: 1.4 },
    { Icon: FaVirus, position: 'bottom-1/3 left-1/4', delay: 1.6 },
    { Icon: FaAmbulance, position: 'top-2/3 right-1/4', delay: 1.8 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
  };

  const renderUidField = () => {
    const uidLabels = {
      hospital: 'Hospital UID',
      doctor: 'Doctor UID',
      pharmacy: 'Pharmacy UID',
      patient: 'Patient UID'
    };

    return (
      <div>
        <label htmlFor="uid" className="block text-sm font-medium text-gray-700 mb-2">
          {uidLabels[userType as keyof typeof uidLabels]}
        </label>
        <input
          id="uid"
          type="text"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2389DA] text-gray-900"
          placeholder={`Enter your ${uidLabels[userType as keyof typeof uidLabels]}`}
          required
        />
      </div>
    );
  };

  return (
    <PageTransition>
      <motion.div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-[#2389DA]/5 to-transparent animate-pulse-slow" />

        {/* Floating Medical Icons */}
        {decorativeIcons.map(({ Icon, position, delay }, index) => (
          <div
            key={index}
            className={`absolute ${position} text-[#2389DA]/10 hidden md:block animate-float`}
            style={{ animationDelay: `${delay}s` }}
          >
            <Icon className="w-12 h-12" />
          </div>
        ))}

        {/* Header with logo */}
        <header className="border-white border-b bg-white shadow-sm relative z-10">
          <nav className="container mx-auto px-6 py-2">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center relative -bottom-6">
                <div className="animate-float">
                  <Image
                    src="/icon.png"
                    alt="HippoCard Logo"
                    width={120}
                    height={120}
                    className="w-[120px] h-[120px]"
                    priority
                  />
                </div>
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto pt-8 relative z-10">
          <div className="flex min-h-[calc(100vh-8rem)]">
            {/* Left Column */}
            <div className="hidden md:flex md:w-[45%] bg-[#2389DA] items-center justify-center p-12 rounded-l-2xl my-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 animate-float">
                {/* Medical Pattern Overlay */}
                <div className="absolute inset-0" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0h10v60H25zM0 25h60v10H0z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>
              
              {/* Existing Welcome Content */}
              <div className="max-w-md text-white relative">
                <h1 className="text-3xl font-light mb-8 tracking-wide">Welcome to</h1>
                <div className="flex items-center gap-6">
                  <div className="bg-white rounded-full p-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-transform hover:scale-105">
                    <Image
                      src="/icon.png"
                      alt="HippoCard Logo"
                      width={150}
                      height={150}
                      className="w-[150px] h-[150px]"
                    />
                  </div>
                  <span className="text-5xl font-light tracking-wide">HippoCard</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-[55%] flex items-center justify-center p-8 bg-white my-8 rounded-r-2xl relative">
              {/* Form glow effect */}
              <div className="absolute inset-0 rounded-r-2xl bg-gradient-to-r from-[#2389DA]/5 to-transparent animate-pulse-slow" />
              
              {/* Existing Form Content */}
              <div className="w-full max-w-md space-y-8">
                <h2 className="text-2xl font-light mb-8 text-gray-900">
                  Create your account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Select User Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {userTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setUserType(type.id)}
                            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                              userType === type.id
                                ? 'border-[#2389DA] bg-[#EBF5FC] text-[#2389DA]'
                                : 'border-gray-200 hover:border-[#2389DA]/50'
                            }`}
                          >
                            <Icon className="w-8 h-8 mb-2" />
                            <span className="text-sm font-medium">{type.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {renderUidField()}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2389DA] text-gray-900"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2389DA] text-gray-900"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2389DA] text-gray-900"
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
                      className="h-4 w-4 text-[#2389DA] focus:ring-[#2389DA] border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                      By signing up I agree to the <Link href="/terms" className="text-[#2389DA] hover:text-[#1B6FB1]">Terms & Conditions</Link>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="submit"
                      className="w-full bg-[#2389DA] text-white py-3 px-4 rounded-lg hover:bg-[#1B6FB1] transition-colors font-medium"
                    >
                      Sign Up
                    </button>

                    <p className="text-center text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link href="/login" className="text-[#2389DA] hover:text-[#1B6FB1] font-medium">
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