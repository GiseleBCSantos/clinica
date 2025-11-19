import { useState, useEffect } from "react";
import { StatCard } from "../../components/ui/StatCard";
import { alertsService } from "../../services/alerts.service";
import { patientsService } from "../../services/patient.service";
import { appointmentsService } from "../../services/appointment.service";

export function DashboardPage() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingAlerts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [patients, appointments, alerts] = await Promise.all([
          patientsService.getAll(),
          appointmentsService.getAll(),
          alertsService.getAll(),
        ]);

        const today = new Date().toISOString().split("T")[0];
        const todayAppointments = appointments.filter((apt) =>
          apt.data_hora.startsWith(today)
        ).length;

        const pendingAlerts = alerts.filter(
          (alert) => alert.status === "PENDENTE"
        ).length;

        setStats({
          totalPatients: patients.length,
          todayAppointments,
          pendingAlerts,
        });
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total de Pacientes"
          value={stats.totalPatients}
          variant="primary"
        />

        <StatCard
          title="Consultas Hoje"
          value={stats.todayAppointments}
          variant="info"
        />

        <StatCard
          title="Alertas Pendentes"
          value={stats.pendingAlerts}
          variant="warning"
        />
      </div>
    </div>
  );
}

export default DashboardPage;
