'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'node_modules/framer-motion';
import PageTransition from '@/components/PageTransition';
import { FaUserInjured, FaUserMd, FaHospitalAlt, FaPills, FaHeartbeat, FaNotesMedical, 
         FaTablets, FaStethoscope, FaBriefcaseMedical, FaDna, FaLungs, FaBrain, 
         FaVirus, FaAmbulance, FaSyringe, FaHospitalUser, FaBandAid, FaPrescription, 
         FaFlask, FaMicroscope, FaXRay, FaThermometerHalf, FaHospitalSymbol,
         FaUserNurse, FaHandHoldingMedical, FaFileMedical, FaHeadSideMask,
         FaBookMedical, FaVial, FaCapsules, FaTooth,
         FaShieldAlt, FaRegLightbulb, FaNetworkWired } from 'node_modules/react-icons/fa';
import { GiDna1, GiMedicalDrip, GiMedicalPack, GiMedicines, GiHeartOrgan,
         GiLungs, GiBrain, GiStomach, GiKidneys, GiSpain } from 'node_modules/react-icons/gi';
import { RiVirusLine, RiMentalHealthLine, RiHospitalLine, RiHealthBookLine } from 'node_modules/react-icons/ri';
import { useRouter } from 'next/navigation';

const features = [
  {
    title: "Electronic Health Records",
    description: "Secure digital storage and instant access to your complete medical history, including diagnoses, treatments, and immunizations",
    icon: <FaFileMedical className="w-8 h-8 text-teal-600" />,
    stats: "100% Digital"
  },
  {
    title: "Virtual Care Platform",
    description: "Schedule and attend video consultations with healthcare providers from anywhere, anytime",
    icon: <FaUserMd className="w-8 h-8 text-teal-600" />,
    stats: "24/7 Access"
  },
  {
    title: "Smart Medication Manager",
    description: "Automated prescription tracking with reminders, refill alerts, and drug interaction warnings",
    icon: <FaPills className="w-8 h-8 text-teal-600" />,
    stats: "Real-time Updates"
  },
  {
    title: "Diagnostic Hub",
    description: "Centralized platform for viewing lab results, imaging reports, and tracking health metrics over time",
    icon: <FaVial className="w-8 h-8 text-teal-600" />,
    stats: "Instant Analysis"
  }
];

const stats = [
  { value: "100K+", label: "Active Users", icon: FaUserNurse },
  { value: "500+", label: "Healthcare Providers", icon: FaHospitalSymbol },
  { value: "1M+", label: "Records Managed", icon: FaBookMedical },
  { value: "24/7", label: "Support Available", icon: FaHandHoldingMedical }
];

  const navigationLinks = [
    {
    title: 'Patient Portal',
    href: '/patient/',
    description: 'View health records, appointments, and test results',
    icon: <FaUserInjured className="text-2xl mb-2 text-teal-600" />
  },
  {
    title: 'Healthcare Provider',
    href: '/doctor/',
    description: 'Access patient records and schedule consultations',
    icon: <FaUserMd className="text-2xl mb-2 text-teal-600" />
  },
  {
    title: 'Hospital Dashboard',
    href: '/hospital',
    description: 'Comprehensive hospital management system',
    icon: <FaHospitalAlt className="text-2xl mb-2 text-teal-600" />
  },
  {
    title: 'Pharmacy Services',
    href: '/pharmacy/',
    description: 'Process prescriptions and manage inventory',
    icon: <FaPills className="text-2xl mb-2 text-teal-600" />
  }
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
  { Icon: GiHeartOrgan, position: 'top-1/4 left-1/2', delay: 2.0, animation: 'animate-pulse' },
  { Icon: GiLungs, position: 'bottom-1/2 right-1/3', delay: 2.2, animation: 'animate-float' },
  { Icon: GiBrain, position: 'top-3/4 left-1/3', delay: 2.4, animation: 'animate-spin-slow' },
  { Icon: GiStomach, position: 'bottom-1/4 right-1/2', delay: 2.6, animation: 'animate-bounce' },
  { Icon: GiKidneys, position: 'top-1/2 left-1/3', delay: 2.8, animation: 'animate-pulse' },
  { Icon: GiSpain, position: 'bottom-1/3 right-1/4', delay: 3.0, animation: 'animate-float' }
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

export default function HomePage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

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

  const handleGetStarted = () => {
    router.push('/register');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
                <Link href="/login" className="text-teal-600 hover:bg-teal-600 hover:text-white px-4 py-2 rounded-lg transition-colors">
                Login
              </Link>
                <Link href="/register" className="text-teal-600 hover:bg-teal-600 hover:text-white px-4 py-2 rounded-lg transition-colors">
                Register
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
                <Link href="/login" className="block py-2 text-teal-600 hover:bg-teal-600 hover:text-white rounded-lg px-4">
                Login
              </Link>
                <Link href="/register" className="block py-2 text-teal-600 hover:bg-teal-600 hover:text-white rounded-lg px-4">
                Register
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
        <motion.main className="container mx-auto px-6 relative z-10" variants={containerVariants}>
        {/* Hero Section */}
          <motion.section className="py-20 max-w-4xl mx-auto text-center" variants={itemVariants}>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <h1 className="text-5xl font-light mb-6 text-gray-900 leading-tight">
                Streamlined healthcare management
                <span className="block text-teal-600 font-medium">for everyone</span>
          </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Access and manage your medical records, prescriptions, and appointments in one secure place.
          </p>
              <div className="flex justify-center gap-6">
                <motion.button
                  onClick={handleGetStarted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-lg font-medium"
                >
                  Get Started
                  <span className="ml-2">→</span>
                </motion.button>
              </div>
            </motion.div>
        </motion.section>

          {/* Animated Stats Section */}
        <motion.section 
            className="py-16 bg-white rounded-2xl shadow-lg mb-20"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-teal-600" />
                  <motion.h3
                    className="text-3xl font-bold text-gray-900 mb-2"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Interactive Features Section */}
          <motion.section className="py-20 max-w-6xl mx-auto">
            <h2 className="text-4xl font-medium text-center mb-16 text-gray-900">
              Advanced Healthcare Features
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      activeFeature === index
                        ? 'bg-teal-50 border-2 border-teal-600'
                        : 'bg-white border border-gray-100 hover:border-teal-600'
                    }`}
                    onClick={() => setActiveFeature(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-4">
                      {feature.icon}
                      <div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                        <div className="mt-2 text-sm font-medium text-teal-600">
                          {feature.stats}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="relative">
                <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      {features[activeFeature].icon}
                      <h3 className="text-2xl font-medium mt-4 mb-2 text-gray-900">
                        {features[activeFeature].title}
                      </h3>
                      <p className="text-gray-600">
                        {features[activeFeature].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Navigation Cards with icons */}
          <motion.section className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto py-12" variants={containerVariants}>
            <h2 className="text-4xl font-medium text-center mb-12 text-gray-900 md:col-span-2">
              Access Your Healthcare Services
            </h2>
            {navigationLinks.map((link) => (
            <motion.div
              key={link.href}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={link.href}
                  className="group p-6 bg-white border border-gray-100 hover:border-teal-600 transition-all duration-300 rounded-lg block"
              >
                  {link.icon}
                  <h2 className="text-xl mb-2 text-gray-900 group-hover:text-teal-600">
                  {link.title}
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </h2>
                  <p className="text-gray-600 text-sm">{link.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.section>

          {/* Enhanced Features Grid */}
          <motion.section className="py-20 border-t border-gray-100" variants={itemVariants}>
            <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-white border border-gray-100 rounded-lg hover:border-teal-600 transition-all duration-300 shadow-lg"
              >
                <FaShieldAlt className="w-8 h-8 text-teal-600 mb-4" />
                <h3 className="text-xl mb-2 text-gray-900">Secure</h3>
                <p className="text-gray-600">
                  Protected with industry-leading security measures and encryption
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-white border border-gray-100 rounded-lg hover:border-teal-600 transition-all duration-300 shadow-lg"
              >
                <FaRegLightbulb className="w-8 h-8 text-teal-600 mb-4" />
                <h3 className="text-xl mb-2 text-gray-900">Intuitive</h3>
                <p className="text-gray-600">
                  User-friendly interface designed for seamless navigation
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-white border border-gray-100 rounded-lg hover:border-teal-600 transition-all duration-300 shadow-lg"
              >
                <FaNetworkWired className="w-8 h-8 text-teal-600 mb-4" />
                <h3 className="text-xl mb-2 text-gray-900">Connected</h3>
                <p className="text-gray-600">
                  Unified platform connecting all your healthcare needs
                </p>
              </motion.div>
          </div>
        </motion.section>
      </motion.main>

      {/* Footer */}
        <footer className="border-t border-gray-100 bg-gray-50 relative z-10">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-teal-600">
              © {new Date().getFullYear()} HippoCard
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/about" className="text-sm text-teal-600 hover:bg-white hover:text-teal-700 px-4 py-2 rounded-lg transition-colors">
                About
              </Link>
                <Link href="/privacy" className="text-sm text-teal-600 hover:bg-white hover:text-teal-700 px-4 py-2 rounded-lg transition-colors">
                Privacy
              </Link>
                <Link href="/terms" className="text-sm text-teal-600 hover:bg-white hover:text-teal-700 px-4 py-2 rounded-lg transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </div>

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
    </PageTransition>
  );
}
