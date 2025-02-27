import { Dispatch, SetStateAction } from 'react';

interface Prescription {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
}

interface PrescriptionViewProps {
  searchQuery: string;
  sortBy: string;
}

interface SearchSortProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
}

export default function SearchSort({ searchQuery, setSearchQuery, sortBy, setSortBy }: SearchSortProps) {
  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="border p-2 rounded"
      />
      <select 
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="date">Date</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}