interface PrescriptionViewProps {
  searchQuery: string;
  sortBy: string;
}

export default function PrescriptionView({ searchQuery, sortBy }: PrescriptionViewProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Prescriptions</h2>
      {/* Add prescription content here */}
    </div>
  );
} 