import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { usePatients } from "../../hooks/usePatient";
import PatientCard from "../../components/domain/PatientCard";

export function PatientListPage() {
  const { patients, loading, error } = usePatients();
  const navigate = useNavigate();

  if (loading) {
    return <div className="text-center py-12">Carregando pacientes...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
        <Link to="/patients/create">
          <Button>Novo Paciente</Button>
        </Link>
      </div>

      {patients.length === 0 ? (
        <Card variant="default" className="p-12 text-center">
          <p className="text-gray-600">Nenhum paciente cadastrado</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={{
                full_name: patient.nome,
                email: patient.email,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientListPage;
