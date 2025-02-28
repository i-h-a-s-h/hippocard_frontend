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

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState<'history' | 'prescriptions'>('history');
  const [showNewHistoryForm, setShowNewHistoryForm] = useState(false);
  const [showNewPrescriptionForm, setShowNewPrescriptionForm] = useState(false);
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

  // Add form state
  const [newHistoryForm, setNewHistoryForm] = useState<NewHistoryFormData>({
    diagnosis: '',
    symptoms: '',
    notes: '',
    severity: 'medium'
  });

  // Update the handleAddHistory function
  const handleAddHistory = (e: React.FormEvent) => {
    e.preventDefault();
    const newHistory: Omit<MedicalHistory, 'id'> = {
      date: new Date().toISOString().split('T')[0],
      diagnosis: newHistoryForm.diagnosis,
      symptoms: newHistoryForm.symptoms.split(',').map(s => s.trim()),
      notes: newHistoryForm.notes,
      doctor: 'Dr. Smith', // You can make this dynamic based on logged-in doctor
      severity: newHistoryForm.severity
    };

    const id = (medicalHistories.length + 1).toString();
    setMedicalHistories([{ ...newHistory, id }, ...medicalHistories]);
    setNewHistoryForm({ diagnosis: '', symptoms: '', notes: '', severity: 'medium' });
    setShowNewHistoryForm(false);
  };

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

  // Add sorting and filtering logic
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

  // Add prescription form state
  const [newPrescriptionForm, setNewPrescriptionForm] = useState<NewPrescriptionFormData>({
    medicines: [{ name: '', dosage: '', duration: '' }],
    isActive: true
  });

  // Add this function to handle adding new medicines to the form
  const addMedicine = () => {
    setNewPrescriptionForm({
      ...newPrescriptionForm,
      medicines: [...newPrescriptionForm.medicines, { name: '', dosage: '', duration: '' }]
    });
  };

  // Add this function to handle removing medicines from the form
  const removeMedicine = (index: number) => {
    setNewPrescriptionForm({
      ...newPrescriptionForm,
      medicines: newPrescriptionForm.medicines.filter((_, i) => i !== index)
    });
  };

  // Add this function to handle form submission
  const handleAddPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    const newPrescription: Omit<Prescription, 'id' | 'date'> = {
      medicines: newPrescriptionForm.medicines,
      isActive: newPrescriptionForm.isActive
    };

    const id = (prescriptions.length + 1).toString();
    setPrescriptions([{
      ...newPrescription,
      id,
      date: new Date().toISOString().split('T')[0]
    }, ...prescriptions]);
    
    setNewPrescriptionForm({
      medicines: [{ name: '', dosage: '', duration: '' }],
      isActive: true
    });
    setShowNewPrescriptionForm(false);
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

        {/* Refined Sidebar */}
        <motion.aside 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-100 fixed h-full z-20"
        >
          <div className="p-8">
            <Link href="/" className="text-2xl font-light text-teal-600">
              hippo<span className="font-bold">card</span>
            </Link>
          </div>
          <nav className="mt-8 px-4">
            <button
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center px-6 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === 'history' 
                  ? 'bg-teal-50 text-teal-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaHistory className="w-5 h-5 mr-3" />
              Medical History
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`w-full flex items-center px-6 py-4 rounded-xl text-sm font-medium mt-2 transition-all duration-300 ${
                activeTab === 'prescriptions' 
                  ? 'bg-teal-50 text-teal-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaPrescription className="w-5 h-5 mr-3" />
              Prescriptions
            </button>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-12 relative z-10">
          {/* Enhanced Form Controls */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-light text-gray-900">
              {activeTab === 'history' ? 'Medical History' : 'Prescriptions'}
            </h2>
            <button
              onClick={() => activeTab === 'history' ? setShowNewHistoryForm(true) : setShowNewPrescriptionForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-300"
            >
              <FaPlus className="w-4 h-4" />
              Add {activeTab === 'history' ? 'History' : 'Prescription'}
            </button>
          </div>

          {/* Refined Search and Filters */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm mb-8">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px] relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'history' ? 'diagnoses' : 'medicines'}...`}
                  value={activeTab === 'history' ? searchTerm : prescriptionSearch}
                  onChange={(e) => activeTab === 'history' ? setSearchTerm(e.target.value) : setPrescriptionSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>
              <select
                value={activeTab === 'history' ? sortBy : prescriptionSort}
                onChange={(e) => activeTab === 'history' ? setSortBy(e.target.value as 'date' | 'severity') : setPrescriptionSort(e.target.value as 'date' | 'status')}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black"
              >
                {activeTab === 'history' ? (
                  <>
                    <option value="date">Sort by Date</option>
                    <option value="severity">Sort by Severity</option>
                  </>
                ) : (
                  <>
                    <option value="date">Sort by Date</option>
                    <option value="status">Sort by Status</option>
                  </>
                )}
              </select>
              <select
                value={activeTab === 'history' ? filterSeverity : prescriptionFilter}
                onChange={(e) => activeTab === 'history' ? setFilterSeverity(e.target.value as 'all' | 'low' | 'medium' | 'high') : setPrescriptionFilter(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black"
              >
                {activeTab === 'history' ? (
                  <>
                    <option value="all">All Severities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </>
                ) : (
                  <>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'history' ? (
              // Medical History Cards
              filteredAndSortedHistory.map((history, index) => (
                <motion.div
                  key={history.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 ${
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
              ))
            ) : (
              // Prescription Cards
              filteredAndSortedPrescriptions.map((prescription, index) => (
                <motion.div
                  key={prescription.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 ${
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
              ))
            )}
          </div>

          {/* Modal Forms - keep existing but update styling */}
          {showNewHistoryForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full shadow-xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-black">Add New Medical History</h3>
                  <button
                    onClick={() => setShowNewHistoryForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleAddHistory} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Diagnosis
                    </label>
                    <input
                      type="text"
                      value={newHistoryForm.diagnosis}
                      onChange={(e) => setNewHistoryForm({
                        ...newHistoryForm,
                        diagnosis: e.target.value
                      })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Symptoms (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={newHistoryForm.symptoms}
                      onChange={(e) => setNewHistoryForm({
                        ...newHistoryForm,
                        symptoms: e.target.value
                      })}
                      placeholder="Fever, Cough, Headache"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Notes
                    </label>
                    <textarea
                      value={newHistoryForm.notes}
                      onChange={(e) => setNewHistoryForm({
                        ...newHistoryForm,
                        notes: e.target.value
                      })}
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Severity
                    </label>
                    <select
                      value={newHistoryForm.severity}
                      onChange={(e) => setNewHistoryForm({
                        ...newHistoryForm,
                        severity: e.target.value as 'low' | 'medium' | 'high'
                      })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowNewHistoryForm(false)}
                      className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Save Entry
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {showNewPrescriptionForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full shadow-xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-black">Add New Prescription</h3>
                  <button
                    onClick={() => setShowNewPrescriptionForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleAddPrescription} className="space-y-4">
                  <div className="space-y-4">
                    {newPrescriptionForm.medicines.map((medicine, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium text-black">Medicine {index + 1}</h4>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeMedicine(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-black mb-2">
                              Name
                            </label>
                            <input
                              type="text"
                              value={medicine.name}
                              onChange={(e) => {
                                const newMedicines = [...newPrescriptionForm.medicines];
                                newMedicines[index].name = e.target.value;
                                setNewPrescriptionForm({
                                  ...newPrescriptionForm,
                                  medicines: newMedicines
                                });
                              }}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-black mb-2">
                              Dosage
                            </label>
                            <input
                              type="text"
                              value={medicine.dosage}
                              onChange={(e) => {
                                const newMedicines = [...newPrescriptionForm.medicines];
                                newMedicines[index].dosage = e.target.value;
                                setNewPrescriptionForm({
                                  ...newPrescriptionForm,
                                  medicines: newMedicines
                                });
                              }}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-black mb-2">
                              Duration
                            </label>
                            <input
                              type="text"
                              value={medicine.duration}
                              onChange={(e) => {
                                const newMedicines = [...newPrescriptionForm.medicines];
                                newMedicines[index].duration = e.target.value;
                                setNewPrescriptionForm({
                                  ...newPrescriptionForm,
                                  medicines: newMedicines
                                });
                              }}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-600 text-black"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addMedicine}
                    className="w-full px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    + Add Another Medicine
                  </button>

                  <div className="flex items-center space-x-2 mt-4">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={newPrescriptionForm.isActive}
                      onChange={(e) => setNewPrescriptionForm({
                        ...newPrescriptionForm,
                        isActive: e.target.checked
                      })}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-600 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="text-sm text-black">
                      Set as Active Prescription
                    </label>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowNewPrescriptionForm(false)}
                      className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Save Prescription
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
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