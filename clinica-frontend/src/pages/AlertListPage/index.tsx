import { useState, useEffect } from "react";
import { alertsService } from "../../services/alerts.service";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { List } from "../../components/ui/List";
import { formatDateTime } from "../../utils/formatDate";
import {
  ALERT_TYPES,
  ALERT_PRIORITIES,
  ALERT_STATUS,
} from "../../utils/constants";
import { Alert } from "../../utils/types";

export function AlertListPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAlerts = async () => {
    try {
      const data = await alertsService.getAll();
      setAlerts(data);
    } catch (err) {
      setError("Erro ao carregar alertas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleMarkAsViewed = async (id: number) => {
    try {
      await alertsService.markAsViewed(id);
      loadAlerts();
    } catch (err) {
      console.error("Erro ao marcar como visualizado:", err);
    }
  };

  const handleMarkAsResolved = async (id: number) => {
    try {
      await alertsService.markAsResolved(id);
      loadAlerts();
    } catch (err) {
      console.error("Erro ao marcar como resolvido:", err);
    }
  };

  const getPriorityVariant = (
    priority: string
  ): "default" | "success" | "warning" | "danger" | "info" => {
    const variants: Record<
      string,
      "default" | "success" | "warning" | "danger" | "info"
    > = {
      BAIXA: "info",
      MEDIA: "warning",
      ALTA: "warning",
      URGENTE: "danger",
    };
    return variants[priority] || "default";
  };

  const getPriorityBorderColor = (priority: string) => {
    const colors: Record<string, string> = {
      BAIXA: "border-l-blue-500",
      MEDIA: "border-l-yellow-500",
      ALTA: "border-l-orange-500",
      URGENTE: "border-l-red-500",
    };
    return colors[priority] || "border-l-gray-500";
  };

  if (loading) {
    return <div className="text-center py-12">Carregando alertas...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Alertas</h1>

      {alerts.length === 0 ? (
        <Card variant="default" className="p-12 text-center">
          <p className="text-gray-600">Nenhum alerta encontrado</p>
        </Card>
      ) : (
        <List>
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              variant="default"
              className={`border-l-4 ${getPriorityBorderColor(
                alert.prioridade
              )}`}
            >
              <div className="flex items-start justify-between p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">
                      {alert.paciente_nome || `Paciente #${alert.paciente}`}
                    </span>
                    <span className="text-sm text-gray-600">
                      {ALERT_TYPES[alert.tipo as keyof typeof ALERT_TYPES]}
                    </span>
                    <Badge variant={getPriorityVariant(alert.prioridade)}>
                      {
                        ALERT_PRIORITIES[
                          alert.prioridade as keyof typeof ALERT_PRIORITIES
                        ]
                      }
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-2">{alert.mensagem}</p>
                  <p className="text-sm text-gray-500">
                    {formatDateTime(alert.data_alerta)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  {alert.status === "PENDENTE" && (
                    <>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleMarkAsViewed(alert.id)}
                      >
                        Visualizar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleMarkAsResolved(alert.id)}
                      >
                        Resolver
                      </Button>
                    </>
                  )}
                  {alert.status === "VISUALIZADO" && (
                    <Button
                      size="sm"
                      onClick={() => handleMarkAsResolved(alert.id)}
                    >
                      Resolver
                    </Button>
                  )}
                  {alert.status === "RESOLVIDO" && (
                    <span className="text-sm text-green-600 font-medium">
                      Resolvido
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </List>
      )}
    </div>
  );
}

export default AlertListPage;
