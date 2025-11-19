import { useState, useEffect } from "react";
import { Patient } from "../utils/types";
import { patientsService } from "../services/patient.service";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await patientsService.getAll();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar pacientes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients, loading, error, refetch: fetchPatients };
}
