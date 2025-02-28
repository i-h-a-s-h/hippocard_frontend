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
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0h30v60H15z' fill='%230D9488' fill-opacity='0.4'/%3E%3Cpath d='M0 15h60v30H0z' fill='%230D9488' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px',
            animation: 'slide 20s linear infinite'
          }} />
        </div>

        <div style={pulsingBackground} />

        {/* Main Content */}
        <main className="flex-1 p-8 relative z-10">
          {/* Dashboard Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-black">Pharmacy Dashboard</h2>
                <p className="text-sm text-black mt-2">View active prescriptions</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-black">Active Prescriptions</h2>
            </div>

            {/* Simplified Filters and Search */}
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
                  onChange={(e) => setPrescriptionSort(e.target.value as 'date')}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black"
                >
                  <option value="date">Sort by Date</option>
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
                  className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm text-black">{prescription.date}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-black">
                        Active
                      </span>
                      <button
                        onClick={() => handleToggleStatus(prescription.id)}
                        className="px-2 py-1 text-sm bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                        title="Mark as Inactive"
                      >
                        Deactivate
                      </button>
                    </div>
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
        </main>
      </div>

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

        .font-geist {
          font-family: var(--font-geist-sans);
        }

        * {
          transition: background-color 0.3s, border-color 0.3s, color 0.3s;
        }

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