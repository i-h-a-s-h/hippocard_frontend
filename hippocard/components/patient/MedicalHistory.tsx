interface MedicalRecord {
  id: string;
  date: Date;
  condition: string;
  treatment: string;
  doctor: string;
  notes: string;
}

interface MedicalHistoryProps {
  searchQuery: string;
  sortBy: string;
}

export default function MedicalHistory({ searchQuery, sortBy }: MedicalHistoryProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Medical History</h2>
      {/* Add medical history content here */}
    </div>
  );
} 