import { useEffect } from "react";
import { Card } from "../../components/ui/Card";
import { formatDateTime } from "../../utils/formatDate";
import { useAlerts } from "../../hooks/useAlerts";
import { usePatients } from "../../hooks/usePatient";

export const AlertListPage = () => {
  const { alerts, loading, error, fetchAlerts } = useAlerts();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  if (loading)
    return (
      <div className="text-center py-12 text-gray-500">Loading alerts...</div>
    );
  if (error)
    return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="space-y-6 px-4 md:px-0">
      <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>

      {alerts.length === 0 ? (
        <Card variant="default" className="p-12 text-center text-gray-500">
          No alerts found
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              variant="default"
              className="p-4 border-l-4 border-red-500 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-400">Patient</span>
                <span className="font-semibold text-gray-900">
                  {alert.patient_name}
                </span>

                <span className="text-gray-700 mt-2">{alert.message}</span>

                <span className="text-xs text-gray-400 mt-1">
                  {formatDateTime(alert.created_at)}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertListPage;
