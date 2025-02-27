import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white p-6 shadow-lg">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <Image src="/logo.png" alt="MediVault" width={32} height={32} />
        <span className="ml-2 text-xl font-semibold">MediVault</span>
      </div>

      {/* Dashboard Section */}
      <div className="mb-6">
        <h2 className="text-gray-500 text-sm font-medium mb-4">DASHBOARD</h2>
        <Link href="/dashboard/profile" 
          className="flex items-center text-cyan-500 bg-cyan-50 rounded-lg p-3 mb-2">
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          My Profile
        </Link>
      </div>

      {/* Health Records Section */}
      <div className="mb-6">
        <h2 className="text-gray-500 text-sm font-medium mb-4">HEALTH RECORDS</h2>
        <nav className="space-y-2">
          {['Insurance', 'Allergies', 'Medical History', 'Hospitalization History', 'Checkup History'].map((item) => (
            <Link key={item} href={`/dashboard/${item.toLowerCase().replace(' ', '-')}`}
              className="flex items-center text-gray-600 hover:bg-gray-50 rounded-lg p-3">
              <span>{item}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Available Doctors Section */}
      <div>
        <h2 className="text-gray-500 text-sm font-medium mb-4">AVAILABLE DOCTORS</h2>
        <Link href="/dashboard/doctors" 
          className="flex items-center text-gray-600 hover:bg-gray-50 rounded-lg p-3">
          Doctors
        </Link>
      </div>
    </div>
  );
} 