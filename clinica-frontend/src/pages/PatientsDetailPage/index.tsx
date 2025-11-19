import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { DataDisplay } from "../../components/ui/DataDisplay";
import { formatDate } from "../../utils/formatDate";
import { SEXO } from "../../utils/constants";
import { Patient } from "../../utils/types";
import { patientsService } from "../../services/patient.service";

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPatient = async () => {
      if (!id) return;

      try {
        const data = await patientsService.getById(parseInt(id));
        setPatient(data);
      } catch (err) {
        setError("Erro ao carregar paciente");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, [id]);

  const handleDelete = async () => {
    if (!patient || !window.confirm("Deseja realmente excluir este paciente?"))
      return;

    try {
      await patientsService.delete(patient.id);
      navigate("/patients");
    } catch (err) {
      alert("Erro ao excluir paciente");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  if (error || !patient) {
    return (
      <div className="text-center py-12 text-red-600">
        {error || "Paciente não encontrado"}
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{patient.nome}</h1>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate("/patients")}>
            Voltar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Card variant="default" title="Informações Pessoais">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DataDisplay label="CPF" value={patient.cpf} />
            <DataDisplay
              label="Data de Nascimento"
              value={formatDate(patient.data_nascimento)}
            />
            <DataDisplay label="Sexo" value={SEXO[patient.sexo]} />
            <DataDisplay label="Telefone" value={patient.telefone} />
            <DataDisplay label="Email" value={patient.email} />
          </div>
        </Card>

        <Card variant="default" title="Endereço">
          <div className="space-y-2">
            <p>{patient.endereco}</p>
            <p>
              {patient.cidade} - {patient.estado}
            </p>
            <p>CEP: {patient.cep}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PatientDetailPage;