'use client';

import { useState } from 'react';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'test',
    email: 'testp@gmail.com',
    password: '•••'
  });

  return (
    <div className="bg-gray-50 p-8 rounded-lg max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6">User Profile</h2>
      
      <div className="space-y-6">
        {['Name', 'Email', 'Password'].map((field) => (
          <div key={field} className="flex items-center justify-between">
            <div className="w-1/4">
              <label className="text-gray-600">{field}:</label>
            </div>
            <div className="w-2/4">
              <span className="text-gray-800">
                {userData[field.toLowerCase()]}
              </span>
            </div>
            <button 
              className="p-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsEditing(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        ))}
        
        <button className="bg-cyan-500 text-white px-6 py-2 rounded-md hover:bg-cyan-600">
          Save
        </button>
      </div>
    </div>
  );
} 