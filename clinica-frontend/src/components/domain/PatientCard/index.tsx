interface PatientProps {
  full_name: string;
  email: string;
}

export default function PatientCard({ patient }: { patient: PatientProps }) {
  return (
    <div className="bg-white p-3 rounded shadow">
      <div className="font-bold">{patient.full_name}</div>
      <div className="text-sm">{patient.email}</div>
    </div>
  );
}
