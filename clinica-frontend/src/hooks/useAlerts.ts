import { useState, useCallback } from "react";
import { alertsService } from "../services/alerts.service";
import type { Alert } from "../utils/types";

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async (params?: { patient?: number }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await alertsService.getAll(params);
      setAlerts(response.results);
    } catch (err) {
      setError("Erro ao carregar alertas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAlertsByPatient = useCallback(async (patientId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await alertsService.getByPatient(patientId);
      setAlerts(data);
    } catch (err) {
      setError("Erro ao carregar alertas do paciente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    alerts,
    loading,
    error,
    fetchAlerts,
    fetchAlertsByPatient,
  };
}
