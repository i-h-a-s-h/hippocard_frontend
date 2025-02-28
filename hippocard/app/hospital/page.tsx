'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'node_modules/framer-motion';
import PageTransition from '@/components/PageTransition';
import { FaUserInjured, FaHistory, FaPrescription, FaSearch, FaFilter, FaPlus, 
         FaCalendarAlt, FaClock, FaHospital } from 'node_modules/react-icons/fa';

interface Patient {
  uid: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  lastVisit: string;
}

interface MedicalHistory {
  id: string;
  date: string;
  diagnosis: string;
  symptoms: string[];
  notes: string;
  doctor: string;
  severity: 'low' | 'medium' | 'high';
}

interface Prescription {
  id: string;
  date: string;
  medicines: {
    name: string;
    dosage: string;
    duration: string;
  }[];
  isActive: boolean;
}

// Add new interface for form data
interface NewHistoryFormData {
  diagnosis: string;
  symptoms: string;
  notes: string;
  severity: 'low' | 'medium' | 'high';
}

// Add new interface for prescription form
interface NewPrescriptionFormData {
  medicines: {
    name: string;
    dosage: string;
    duration: string;
  }[];
  isActive: boolean;
}

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState<'history' | 'prescriptions'>('history');
  const [medicalHistories, setMedicalHistories] = useState<MedicalHistory[]>([
    {
      id: '1',
      date: '2024-02-15',
      diagnosis: 'Acute Bronchitis',
      symptoms: ['Cough', 'Fever', 'Chest Pain'],
      notes: 'Prescribed antibiotics and rest for 5 days',
      doctor: 'Dr. Smith',
      severity: 'medium'
    },
    {
      id: '2',
      date: '2024-01-20',
      diagnosis: 'Migraine',
      symptoms: ['Headache', 'Nausea', 'Light Sensitivity'],
      notes: 'Recurring condition, recommended lifestyle changes',
      doctor: 'Dr. Johnson',
      severity: 'low'
    },
    {
      id: '3',
      date: '2023-12-05',
      diagnosis: 'Pneumonia',
      symptoms: ['High Fever', 'Difficulty Breathing', 'Fatigue'],
      notes: 'Hospitalization required for 3 days',
      doctor: 'Dr. Smith',
      severity: 'high'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'severity'>('date');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredAndSortedHistory = medicalHistories
    .filter(history => {
      const matchesSearch = history.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          history.notes.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = filterSeverity === 'all' || history.severity === filterSeverity;
      return matchesSearch && matchesSeverity;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      const severityOrder = { high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });

  // Add prescription data
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      date: '2024-02-15',
      medicines: [
        { name: 'Amoxicillin', dosage: '500mg', duration: '7 days' },
        { name: 'Ibuprofen', dosage: '400mg', duration: '5 days' }
      ],
      isActive: true
    },
    {
      id: '2',
      date: '2024-01-20',
      medicines: [
        { name: 'Omeprazole', dosage: '20mg', duration: '14 days' }
      ],
      isActive: false
    },
    {
      id: '3',
      date: '2024-02-01',
      medicines: [
        { name: 'Cetirizine', dosage: '10mg', duration: '30 days' },
        { name: 'Montelukast', dosage: '10mg', duration: '30 days' }
      ],
      isActive: true
    },
    {
      id: '4',
      date: '2023-12-15',
      medicines: [
        { name: 'Azithromycin', dosage: '250mg', duration: '5 days' }
      ],
      isActive: false
    }
  ]);

  // Add prescription sorting and filtering states
  const [prescriptionSort, setPrescriptionSort] = useState<'date' | 'status'>('date');
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [prescriptionSearch, setPrescriptionSearch] = useState('');

  const filteredAndSortedPrescriptions = prescriptions
    .filter(prescription => {
      const matchesSearch = prescription.medicines.some(med => 
        med.name.toLowerCase().includes(prescriptionSearch.toLowerCase())
      );
      const matchesStatus = prescriptionFilter === 'all' || 
        (prescriptionFilter === 'active' ? prescription.isActive : !prescription.isActive);
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (prescriptionSort === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return Number(b.isActive) - Number(a.isActive);
    });

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

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex relative overflow-hidden">
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

        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-white border-r border-gray-200 fixed h-full z-20"
        >
          <div className="p-6">
            <Link href="/" className="text-xl font-light text-teal-600">
              hippo<span className="font-bold">card</span>
            </Link>
          </div>
          <nav className="mt-6">
            <button
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center px-6 py-3 text-sm ${
                activeTab === 'history' 
                  ? 'bg-teal-50 text-teal-600 border-r-4 border-teal-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaHistory className="w-5 h-5 mr-3" />
              Medical History
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`w-full flex items-center px-6 py-3 text-sm ${
                activeTab === 'prescriptions' 
                  ? 'bg-teal-50 text-teal-600 border-r-4 border-teal-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaPrescription className="w-5 h-5 mr-3" />
              Prescriptions
            </button>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8 relative z-10">
          {/* Patient Info Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-black">John Doe</h2>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-black">
                  <div>UID: P12345</div>
                  <div>Age: 35</div>
                  <div>Gender: Male</div>
                  <div>Blood Group: O+</div>
                </div>
              </div>
              <div className="text-sm text-black">
                Last Visit: 2024-02-15
              </div>
            </div>
          </motion.div>

          {activeTab === 'history' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">Medical History</h2>
              </div>

              {/* Filters and Search */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <input
                      type="text"
                      placeholder="Search diagnoses or notes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black placeholder-gray-500"
                    />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'severity')}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="severity">Sort by Severity</option>
                  </select>
                  <select
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value as 'all' | 'low' | 'medium' | 'high')}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="all">All Severities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Medical History List */}
              <div className="grid gap-4">
                {filteredAndSortedHistory.map((history, index) => (
                  <motion.div
                    key={history.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    className={`bg-white p-6 rounded-lg shadow-sm border-l-4 hover:shadow-lg transition-all duration-300 ${
                      history.severity === 'high' ? 'border-red-500' :
                      history.severity === 'medium' ? 'border-yellow-500' :
                      'border-green-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-black">{history.diagnosis}</h3>
                        <p className="text-sm text-black">{history.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        history.severity === 'high' ? 'bg-red-100 text-black' :
                        history.severity === 'medium' ? 'bg-yellow-100 text-black' :
                        'bg-green-100 text-black'
                      }`}>
                        {history.severity.charAt(0).toUpperCase() + history.severity.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-2 flex-wrap">
                        {history.symptoms.map((symptom, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-black">
                            {symptom}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-black">{history.notes}</p>
                      <p className="text-sm text-black">Attending: {history.doctor}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">Prescriptions</h2>
              </div>

              {/* Filters and Search */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <input
                      type="text"
                      placeholder="Search medicines..."
                      value={prescriptionSearch}
                      onChange={(e) => setPrescriptionSearch(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black placeholder-gray-500"
                    />
                  </div>
                  <select
                    value={prescriptionSort}
                    onChange={(e) => setPrescriptionSort(e.target.value as 'date' | 'status')}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="status">Sort by Status</option>
                  </select>
                  <select
                    value={prescriptionFilter}
                    onChange={(e) => setPrescriptionFilter(e.target.value as 'all' | 'active' | 'inactive')}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Prescriptions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAndSortedPrescriptions.map((prescription, index) => (
                  <motion.div
                    key={prescription.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    className={`bg-white p-6 rounded-lg shadow-sm border-l-4 hover:shadow-lg transition-all duration-300 ${
                      prescription.isActive ? 'border-green-500' : 'border-red-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-sm text-black">{prescription.date}</p>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        prescription.isActive 
                          ? 'bg-green-100 text-black' 
                          : 'bg-red-100 text-black'
                      }`}>
                        {prescription.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {prescription.medicines.map((medicine, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-black">{medicine.name}</h4>
                          <div className="text-sm text-black mt-1">
                            <p>Dosage: {medicine.dosage}</p>
                            <p>Duration: {medicine.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Add animations to global CSS */}
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

        .font-geist {
          font-family: var(--font-geist-sans);
        }

        /* Add smooth transitions */
        * {
          transition: background-color 0.3s, border-color 0.3s, color 0.3s;
        }

        /* Hover effects */
        .hover-scale {
          transition: transform 0.2s;
        }
        .hover-scale:hover {
          transform: scale(1.01);
        }
      `}</style>
    </PageTransition>
  );
}