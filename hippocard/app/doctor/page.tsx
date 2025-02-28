'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'node_modules/framer-motion';
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

export default function DoctorDashboard() {
  const [patientUid, setPatientUid] = useState('');
  const [activeTab, setActiveTab] = useState<'history' | 'prescriptions'>('history');
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showNewHistoryForm, setShowNewHistoryForm] = useState(false);
  const [showNewPrescriptionForm, setShowNewPrescriptionForm] = useState(false);

  const handlePatientSearch = () => {
    // Mock patient data - replace with actual API call
    setPatient({
      uid: patientUid,
      name: "John Doe",
      age: 35,
      gender: "Male",
      bloodGroup: "O+",
      lastVisit: "2024-02-15"
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
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
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={patientUid}
                  onChange={(e) => setPatientUid(e.target.value)}
                  placeholder="Enter Patient UID"
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
                <FaSearch className="absolute left-4 top-4 text-gray-400" />
                <button
                  onClick={handlePatientSearch}
                  className="absolute right-2 top-2 px-4 py-1.5 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Search
                </button>
              </div>
            </div>
          </header>

          {/* Patient Info Card */}
          {patient && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{patient.name}</h2>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>UID: {patient.uid}</div>
                    <div>Age: {patient.age}</div>
                    <div>Gender: {patient.gender}</div>
                    <div>Blood Group: {patient.bloodGroup}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Last Visit: {patient.lastVisit}
                </div>
              </div>
            </div>
          )}

          {/* Content Area */}
          {activeTab === 'history' ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Medical History</h2>
                <button
                  onClick={() => setShowNewHistoryForm(true)}
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  <FaPlus className="mr-2" />
                  Add New Entry
                </button>
              </div>
              {/* Medical History List */}
              <div className="grid gap-4">
                {/* Add your medical history entries here */}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Prescriptions</h2>
                <button
                  onClick={() => setShowNewPrescriptionForm(true)}
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  <FaPlus className="mr-2" />
                  New Prescription
                </button>
              </div>
              {/* Prescriptions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Add your prescription cards here */}
              </div>
            </div>
          )}
        </main>
      </div>
    </PageTransition>
  );
}