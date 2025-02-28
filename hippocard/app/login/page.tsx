'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'node_modules/framer-motion';
import PageTransition from '@/components/PageTransition';
import { FaUserInjured, FaUserMd, FaHospital, FaClinicMedical, FaHeartbeat, FaNotesMedical, FaTablets, FaStethoscope, FaBriefcaseMedical, FaDna, FaLungs, FaBrain, FaVirus, FaAmbulance, FaSyringe, FaHospitalUser, FaBandAid, FaPrescription, FaFlask, FaMicroscope, FaXRay, FaThermometerHalf, FaHeadSideMask, FaHandHoldingMedical } from 'node_modules/react-icons/fa';
import { GiDna1, GiMedicalDrip, GiMedicalPack, GiMedicines } from 'node_modules/react-icons/gi';
import { RiVirusLine, RiMentalHealthLine } from 'node_modules/react-icons/ri';

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [userType, setUserType] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUid] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    { Icon: FaBrain, position: 'top-1/4 right-1/3', delay: 1.4, animation: 'animate-float' },
    { Icon: FaVirus, position: 'bottom-1/3 left-1/4', delay: 1.6, animation: 'animate-spin-slow' },
    { Icon: FaAmbulance, position: 'top-2/3 right-1/4', delay: 1.8, animation: 'animate-float' },
    { Icon: FaSyringe, position: 'bottom-1/2 left-20', delay: 2.0, animation: 'animate-bounce' },
    { Icon: GiDna1, position: 'top-1/4 left-1/3', delay: 2.2, animation: 'animate-spin-slow' },
    { Icon: FaFlask, position: 'bottom-1/3 right-1/3', delay: 2.4, animation: 'animate-float' },
    { Icon: FaMicroscope, position: 'top-2/3 left-1/4', delay: 2.6, animation: 'animate-bounce' },
    { Icon: FaXRay, position: 'bottom-1/4 left-1/3', delay: 2.8, animation: 'animate-pulse' },
    { Icon: GiMedicalDrip, position: 'top-1/3 right-1/4', delay: 3.0, animation: 'animate-float' },
    { Icon: FaThermometerHalf, position: 'bottom-2/3 right-1/3', delay: 3.2, animation: 'animate-bounce' },
    { Icon: RiVirusLine, position: 'top-1/2 left-1/3', delay: 3.4, animation: 'animate-spin-slow' },
    { Icon: FaHandHoldingMedical, position: 'bottom-1/2 right-1/4', delay: 3.6, animation: 'animate-float' },
    { Icon: GiMedicines, position: 'top-3/4 left-1/4', delay: 3.8, animation: 'animate-pulse' }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentType = userTypes.find(type => type.id === userType) || userTypes[0];

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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-900"
          placeholder={`Enter your ${uidLabels[userType as keyof typeof uidLabels]}`}
          required
        />
      </div>
    );
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <PageTransition>
        <motion.div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
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

          {/* Floating Medical Icons with Enhanced Animations */}
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

          {/* Medical Cross Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 5h10v30H15zM5 15h30v10H5z' fill='%230D9488' fill-opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
              animation: 'slide 15s linear infinite'
            }} />
          </div>

          {/* Header with logo */}
          <header className="border-white border-b bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-xl font-light text-teal-600">
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
                    <span className={`block w-6 h-0.5 bg-teal-600 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-teal-600 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-teal-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                  </div>
                </button>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto pt-8 relative z-10">
            <div className="flex min-h-[calc(100vh-8rem)]">
              {/* Left Column */}
              <div className="hidden md:flex md:w-[45%] bg-teal-600 items-center justify-center p-12 rounded-l-2xl my-8 relative overflow-hidden">
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
                  <h1 className="text-3xl font-light mb-8 tracking-wide">Welcome back to</h1>
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
                
                {/* Existing Form Content */}
                <div className="w-full max-w-md space-y-8">
                  <h2 className="text-2xl font-light mb-8 text-gray-900">
                    Sign in to your account
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
                                  ? 'border-teal-600 bg-teal-50 text-teal-600'
                                  : 'border-gray-200 hover:border-teal-600/50'
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
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-900"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-900"
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-600 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                          Remember me
                        </label>
                      </div>
                      <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-700">
                        Forgot password?
                      </Link>
                    </div>

                    <div className="space-y-4">
                      <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                      >
                        Sign In
                      </button>

                      <p className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-teal-600 hover:text-teal-700 font-medium">
                          Sign Up
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
                <div className="text-sm text-teal-600">
                  © {new Date().getFullYear()} HippoCard
                </div>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <Link href="/about" className="text-sm text-teal-600 hover:bg-white px-4 py-2 rounded-lg transition-colors">
                    About
                  </Link>
                  <Link href="/privacy" className="text-sm text-teal-600 hover:bg-white px-4 py-2 rounded-lg transition-colors">
                    Privacy
                  </Link>
                  <Link href="/terms" className="text-sm text-teal-600 hover:bg-white px-4 py-2 rounded-lg transition-colors">
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      </PageTransition>

      {/* Add these keyframe animations to your global CSS */}
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

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
}