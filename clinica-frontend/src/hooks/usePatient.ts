import { useState, useCallback, useEffect } from "react";
import { Patient } from "../utils/types";
import { patientsService } from "../services/patient.service";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPatients = useCallback(
    async (params?: { search?: string; priority?: string; page?: number }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await patientsService.getAll(params);
        setPatients(response.results);
        setTotalCount(response.count);
      } catch (err) {
        setError("Erro ao carregar pacientes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getPatientById = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const patient = await patientsService.getById(id);
      return patient;
    } catch (err) {
      setError("Erro ao carregar detalhes do paciente.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return {
    patients,
    totalCount,
    loading,
    error,
    fetchPatients,
    getPatientById,
  };
}
