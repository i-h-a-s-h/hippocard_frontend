'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'node_modules/framer-motion';
import PageTransition from '@/components/PageTransition';
import { FaPrescription, FaSearch } from 'node_modules/react-icons/fa';

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

export default function PharmacyDashboard() {
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

  // Modify sorting state to only use date
  const [prescriptionSort, setPrescriptionSort] = useState<'date'>('date');
  const [prescriptionSearch, setPrescriptionSearch] = useState('');

  // Update filtering to only show active prescriptions
  const filteredAndSortedPrescriptions = prescriptions
    .filter(prescription => {
      const matchesSearch = prescription.medicines.some(med => 
        med.name.toLowerCase().includes(prescriptionSearch.toLowerCase())
      );
      // Only show active prescriptions
      return matchesSearch && prescription.isActive;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Add function to handle status toggle
  const handleToggleStatus = (prescriptionId: string) => {
    setPrescriptions(prescriptions.map(prescription => 
      prescription.id === prescriptionId 
        ? { ...prescription, isActive: false }
        : prescription
    ));
  };

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
        {/* Minimal Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0h30v60H15z' fill='%230D9488' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px',
            animation: 'slide 30s linear infinite'
          }} />
        </div>

        {/* Pulsing Radial Gradient */}
        <div style={pulsingBackground} />

        {/* Main Content */}
        <main className="flex-1 p-12 relative z-10">
          {/* Enhanced Dashboard Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 mb-8 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-50 rounded-xl">
                <FaPrescription className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h2 className="text-2xl font-light text-gray-900">Pharmacy Dashboard</h2>
                <p className="text-sm text-gray-600 mt-1">Manage active prescriptions</p>
              </div>
            </div>
          </motion.div>

          {/* Refined Search and Filters */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 mb-8"
          >
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[300px] relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={prescriptionSearch}
                  onChange={(e) => setPrescriptionSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>
              <select
                value={prescriptionSort}
                onChange={(e) => setPrescriptionSort(e.target.value as 'date')}
                className="px-6 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-600 text-gray-700"
              >
                <option value="date">Sort by Date</option>
              </select>
            </div>
          </motion.div>

          {/* Prescriptions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedPrescriptions.map((prescription, index) => (
              <motion.div
                key={prescription.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm text-gray-600">{prescription.date}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-sm bg-green-50 text-green-700">
                      Active
                    </span>
                    <button
                      onClick={() => handleToggleStatus(prescription.id)}
                      className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                      title="Mark as Inactive"
                    >
                      Deactivate
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {prescription.medicines.map((medicine, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-medium text-gray-900">{medicine.name}</h4>
                      <div className="text-sm text-gray-600 mt-2 space-y-1">
                        <p className="flex items-center gap-2">
                          <span className="w-16">Dosage:</span>
                          {medicine.dosage}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-16">Duration:</span>
                          {medicine.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Refined Animations */}
      <style jsx global>{`
        @keyframes slide {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        * {
          transition: all 0.3s ease-in-out;
        }

        .hover-scale {
          transition: transform 0.2s ease-in-out;
        }
        
        .hover-scale:hover {
          transform: scale(1.02);
        }
      `}</style>
    </PageTransition>
  );
}