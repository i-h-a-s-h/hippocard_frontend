'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'node_modules/framer-motion';
import PageTransition from '@/components/PageTransition';
import { FaUserInjured, FaUserMd, FaHospital, FaClinicMedical, FaHeartbeat, 
         FaNotesMedical, FaTablets, FaStethoscope, FaBriefcaseMedical, FaDna, 
         FaLungs, FaBrain } from 'node_modules/react-icons/fa';
import { GiMedicalDrip, GiMedicalPack } from 'node_modules/react-icons/gi';

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false);
  const [userType, setUserType] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [location, setLocation] = useState({
    state: '',
    city: '',
    pincode: ''
  });
  const [uid, setUid] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add password validation
  const [passwordError, setPasswordError] = useState('');
  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const userTypes = [
    { id: 'patient', icon: FaUserInjured, label: 'Patient' },
    { id: 'doctor', icon: FaUserMd, label: 'Doctor' },
    { id: 'hospital', icon: FaHospital, label: 'Hospital' },
    { id: 'pharmacy', icon: FaClinicMedical, label: 'Pharmacy' }
  ];

  const decorativeIcons = [
    { Icon: FaHeartbeat, position: 'top-20 left-10', delay: 0, animation: 'animate-pulse' },
    { Icon: FaNotesMedical, position: 'bottom-32 right-12', delay: 0.2, animation: 'animate-bounce' },
    { Icon: FaTablets, position: 'top-40 right-20', delay: 0.4, animation: 'animate-spin-slow' },
    { Icon: FaStethoscope, position: 'bottom-20 left-32', delay: 0.6, animation: 'animate-float' },
    { Icon: FaBriefcaseMedical, position: 'top-1/2 right-10', delay: 0.8, animation: 'animate-bounce' },
    { Icon: FaDna, position: 'top-1/3 left-1/4', delay: 1.0, animation: 'animate-spin-slow' },
    { Icon: FaLungs, position: 'bottom-1/4 right-1/4', delay: 1.2, animation: 'animate-pulse' },
    { Icon: FaBrain, position: 'top-1/4 right-1/3', delay: 1.4, animation: 'animate-float' }
  ];

  const pulsingBackground: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(circle at 50% 50%, 
      rgba(45, 212, 191, 0.1) 0%, 
      rgba(45, 212, 191, 0.05) 25%, 
      rgba(45, 212, 191, 0.025) 50%, 
      rgba(45, 212, 191, 0.01) 75%, 
      transparent 100%)`,
    animation: 'pulse 4s ease-in-out infinite'
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    // Add registration logic here
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
        {/* DNA Helix Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0h30v60H15z' fill='%230D9488' fill-opacity='0.4'/%3E%3Cpath d='M0 15h60v30H0z' fill='%230D9488' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px',
            animation: 'slide 20s linear infinite'
          }} />
        </div>

        {/* Pulsing Radial Gradient */}
        <div style={pulsingBackground} />

        {/* Floating Medical Icons */}
        {decorativeIcons.map(({ Icon, position, delay, animation }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position} text-teal-500/10 hidden md:block ${animation}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay, 
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: Math.random() * 2
            }}
          >
            <Icon className="w-12 h-12" />
          </motion.div>
        ))}

        {/* Header */}
        <header className="bg-white border-b shadow-sm relative z-10">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-light text-teal-600">
                hippo<span className="font-bold">card</span>
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-6 py-8 relative z-10">
          <motion.div 
            className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h1 className="text-3xl font-light mb-8 text-gray-900">Create Account</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                {userTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    type="button"
                    onClick={() => setUserType(type.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      userType === type.id 
                        ? 'border-teal-600 bg-teal-50 text-teal-600' 
                        : 'border-gray-200 bg-gray-100 text-gray-700 hover:border-teal-600/50'
                    }`}
                  >
                    <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                      userType === type.id 
                        ? 'text-teal-600' 
                        : 'text-gray-600'
                    }`} />
                    <span className="text-sm font-medium">{type.label}</span>
                  </motion.button>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhar Number
                  </label>
                  <input
                    id="aadhar"
                    type="text"
                    value={aadhar}
                    onChange={(e) => setAadhar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    placeholder="12-digit Aadhar number"
                    pattern="\d{12}"
                    maxLength={12}
                    required
                  />
                </div>

                {/* Location Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      id="state"
                      type="text"
                      value={location.state}
                      onChange={(e) => setLocation({ ...location, state: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={location.city}
                      onChange={(e) => setLocation({ ...location, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    value={location.pincode}
                    onChange={(e) => setLocation({ ...location, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    pattern="\d{6}"
                    maxLength={6}
                    placeholder="6-digit PIN code"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    required
                  />
                  {passwordError && (
                    <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-600 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-teal-600 hover:text-teal-700">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-xl hover:bg-teal-700 transition-colors"
              >
                Create Account
              </motion.button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-white relative z-10">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center">
              <span className="text-sm text-teal-600">
                © {new Date().getFullYear()} HippoCard
              </span>
              <nav className="flex gap-4">
                <Link href="/terms" className="text-sm text-teal-600 hover:text-teal-700">
                  Terms
                </Link>
                <Link href="/privacy" className="text-sm text-teal-600 hover:text-teal-700">
                  Privacy
                </Link>
              </nav>
            </div>
          </div>
        </footer>

        {/* Animations */}
        <style jsx global>{`
          @keyframes slide {
            0% { background-position: 0 0; }
            100% { background-position: 100% 100%; }
          }

          @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 0.8; }
            100% { opacity: 0.5; }
          }

          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}</style>
      </div>
    </PageTransition>
  );
}