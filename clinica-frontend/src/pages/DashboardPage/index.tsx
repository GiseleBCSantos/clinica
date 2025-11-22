import { useState, useEffect } from "react";
import { StatCard } from "../../components/ui/StatCard";
import { alertsService } from "../../services/alerts.service";
import { patientsService } from "../../services/patient.service";
import Loading from "../../components/ui/Loading";

interface DashboardStats {
  totalPatients: number;
  totalAlerts: number;
  todayAlerts: number;
}

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    totalAlerts: 0,
    todayAlerts: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [patients, alerts] = await Promise.all([
          patientsService.getAll(),
          alertsService.getAll(),
        ]);

        const today = new Date().toISOString().split("T")[0];

        const todayAlerts = alerts.results.filter((alert) =>
          alert.created_at.startsWith(today)
        ).length;

        setStats({
          totalPatients: patients.count,
          totalAlerts: alerts.count,
          todayAlerts,
        });
      } catch (error) {
        console.error("Error loading dashboard statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          variant="primary"
        />

        <StatCard
          title="Total Alerts"
          value={stats.totalAlerts}
          variant="warning"
        />

        <StatCard
          title="Today's Alerts"
          value={stats.todayAlerts}
          variant="info"
        />
      </div>
    </div>
  );
}

export default DashboardPage;
