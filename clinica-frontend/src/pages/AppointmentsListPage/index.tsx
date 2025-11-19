import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import Table from "../../components/ui/Table/table";
import { useAppointments } from "../../hooks/useAppointments";
import { APPOINTMENT_STATUS, APPOINTMENT_TYPES } from "../../utils/constants";
import { formatDateTime } from "../../utils/formatDate";

export function AppointmentListPage() {
  const { appointments, loading, error } = useAppointments();

  if (loading) {
    return <div className="text-center py-12">Carregando agendamentos...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  const getStatusVariant = (
    status: string
  ): "default" | "success" | "warning" | "danger" | "info" => {
    const variants: Record<
      string,
      "default" | "success" | "warning" | "danger" | "info"
    > = {
      AGENDADO: "info",
      CONFIRMADO: "success",
      EM_ATENDIMENTO: "warning",
      CONCLUIDO: "default",
      CANCELADO: "danger",
      FALTOU: "warning",
    };
    return variants[status] || "default";
  };

  const headers = ["Paciente", "Data/Hora", "Tipo", "Status"];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Agendamentos</h1>

      <Card variant="header" title="Lista de Agendamentos">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-600 py-8">
            Nenhum agendamento encontrado
          </p>
        ) : (
          <Table
            headers={headers}
            data={appointments}
            renderRow={(appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.paciente_nome ||
                    `Paciente #${appointment.paciente}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDateTime(appointment.data_hora)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {APPOINTMENT_TYPES[appointment.tipo_consulta]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <Badge
                    variant={getStatusVariant(appointment.status) || "default"}
                  >
                    {APPOINTMENT_STATUS[appointment.status]}
                  </Badge>
                </td>
              </tr>
            )}
          />
        )}
      </Card>
    </div>
  );
}
