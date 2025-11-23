import { useState, useEffect } from "react";
import { Card } from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { usePatients } from "../../hooks/usePatient";
import { Button } from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { useAlerts } from "../../hooks/useAlerts";
import Loading from "../../components/ui/Loading";
import { useNavigate } from "react-router-dom";
import DataDisplay from "../../components/ui/DataDisplay";
import { formatDate } from "../../utils/formatDate";

export const PatientListPage = () => {
  const {
    patients,
    totalCount,
    loading: patientsLoading,
    error,
    fetchPatients,
  } = usePatients();
  const navigate = useNavigate();
  const { alerts, fetchAlertsByPatient, loading: alertsLoading } = useAlerts();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pendingSearch, setPendingSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatientName, setSelectedPatientName] = useState("");

  useEffect(() => {
    fetchPatients({ search, page });
  }, [search, page, fetchPatients]);

  const handleFilterApply = () => {
    setSearch(pendingSearch);
    setPage(1);
  };

  const handleClearFilters = () => {
    setPendingSearch("");
    setSearch("");
    setPage(1);
  };

  const getPriorityVariant = (priority?: "low" | "medium" | "high") => {
    const variants: Record<
      "low" | "medium" | "high",
      "success" | "warning" | "danger"
    > = {
      low: "success",
      medium: "warning",
      high: "danger",
    };
    return priority ? variants[priority] : "default";
  };

  const handleAlertsClick = async (e: React.MouseEvent, patient: any) => {
    e.stopPropagation();
    setSelectedPatientName(patient.full_name);
    setModalOpen(true);
    await fetchAlertsByPatient(patient.id); // busca os alertas do paciente
  };

  const navigateToPatientDetails = (patientId: number) => {
    navigate(`/patients/${patientId}`);
  };

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 md:px-0">
      <h1 className="text-3xl font-bold text-gray-900">Patients</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={pendingSearch}
          onChange={(e) => setPendingSearch(e.target.value)}
          className="px-3 py-2 border rounded w-full md:w-64"
        />
        <Button onClick={handleFilterApply} className="px-4">
          Filter
        </Button>
        <Button
          onClick={handleClearFilters}
          variant="secondary"
          className="px-4"
        >
          Clear
        </Button>
      </div>

      <Card variant="header" title={`Patient List (${totalCount})`}>
        {patientsLoading ? (
          <div className="text-center py-12 text-gray-500">
            Loading patients...
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : patients.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No patients found
          </div>
        ) : (
          <Table
            headers={["Full Name", "Record #", "Priority", "Actions"]}
            data={patients}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            renderRow={(patient) => (
              <tr
                key={patient.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => navigateToPatientDetails(patient.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.full_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.record_number || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.priority ? (
                    <Badge variant={getPriorityVariant(patient.priority)}>
                      {patient.priority.toUpperCase()}
                    </Badge>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <Button
                    onClick={(e) => handleAlertsClick(e, patient)}
                    size="sm"
                  >
                    {patient.alerts_count || 0} Alerts
                  </Button>
                </td>
              </tr>
            )}
          />
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Alerts - ${selectedPatientName}`}
        size="lg"
      >
        {alertsLoading ? (
          <Loading />
        ) : alerts.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No alerts</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto">
            {alerts.slice(0, 6).map((alert) => (
              <div
                key={alert.id}
                className="relative p-5 border border-gray-300 rounded-2xl shadow-sm bg-gray-50 space-y-3 hover:shadow-md transition-shadow duration-200 break-words flex flex-col justify-between"
              >
                <DataDisplay
                  label="Message"
                  value={alert.message}
                  className="text-gray-900 text-base font-medium"
                />
                <DataDisplay
                  label="Created At"
                  value={formatDate(alert.created_at)}
                  className="text-gray-500 text-sm"
                />
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientListPage;
