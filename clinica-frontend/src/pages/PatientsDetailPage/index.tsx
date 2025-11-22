import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { DataDisplay } from "../../components/ui/DataDisplay";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { usePatients } from "../../hooks/usePatient";
import { useVitalRecords } from "../../hooks/useVitalRecords";
import { formatDate } from "../../utils/formatDate";
import VitalRecordsCreateModal from "../VitalRecordsCreatePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Loading from "../../components/ui/Loading";

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const patientId = id ? Number(id) : null;

  const { getPatientById } = usePatients();
  const {
    records: vitals,
    fetchRecords,
    loading: vitalsLoading,
    error: vitalsError,
  } = useVitalRecords();

  const [patient, setPatient] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const totalPages = useMemo(
    () => Math.ceil(vitals.length / pageSize),
    [vitals.length]
  );

  const paginatedVitals = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return vitals.slice(start, start + pageSize);
  }, [vitals, currentPage]);

  const loadPatient = useCallback(async () => {
    if (!patientId) return;
    try {
      const data = await getPatientById(patientId);
      setPatient(data);
    } catch (err) {
      console.error(err);
    }
  }, [patientId, getPatientById]);

  const loadVitals = useCallback(() => {
    if (!patientId) return;
    fetchRecords({ patient: patientId });
  }, [patientId, fetchRecords]);

  useEffect(() => {
    loadPatient();
    loadVitals();
  }, [loadPatient, loadVitals]);

  const getPriorityVariant = (priority?: string) => {
    if (!priority) return "default";
    return priority === "high"
      ? "danger"
      : priority === "medium"
      ? "warning"
      : "success";
  };

  if (!patient)
    return <Loading />;
  if (vitalsError)
    return <div className="text-center py-20 text-red-500">{vitalsError}</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 md:px-0">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          {patient.full_name}
        </h1>
        <Button
          onClick={() => {
            setEditingRecord(null);
            setShowModal(true);
          }}
        >
          + Add Vital Record
        </Button>
      </div>

      <Card
        variant="default"
        title="Patient Information"
        className="bg-white shadow-lg border border-gray-200 p-6 md:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <DataDisplay
            label="Full Name"
            value={patient.full_name}
            className="text-gray-800"
          />
          <DataDisplay
            label="Record Number"
            value={patient.record_number ?? "-"}
            className="text-gray-800"
          />
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium mb-1">Priority</span>
            {patient.priority ? (
              <Badge
                variant={getPriorityVariant(patient.priority)}
                className="uppercase w-max"
              >
                {patient.priority}
              </Badge>
            ) : (
              <span className="text-gray-400">-</span>
            )}
          </div>
        </div>
      </Card>

      <Card
        variant="default"
        title={`Vital Records (${vitals.length})`}
        className="bg-white shadow-lg border border-gray-200 p-4 md:p-6"
      >
        {vitalsLoading ? (
          <p className="text-center text-gray-400 py-6">
            Loading vital records...
          </p>
        ) : vitals.length === 0 ? (
          <p className="text-center text-gray-400 py-6">
            No vital records available.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {paginatedVitals.map((vital) => (
                <div
                  key={vital.id}
                  className="relative p-4 md:p-5 border border-gray-200 rounded-xl shadow-sm bg-gray-50 space-y-1 md:space-y-2 hover:shadow-md transition-shadow duration-200"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
                    onClick={() => {
                      setEditingRecord(vital);
                      setShowModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <DataDisplay
                    label="Recorded At"
                    value={formatDate(vital.created_at)}
                  />
                  <DataDisplay
                    label="Temperature (°C)"
                    value={vital.temperature ?? "-"}
                  />
                  <DataDisplay
                    label="Systolic BP"
                    value={vital.systolic_bp ?? "-"}
                  />
                  <DataDisplay
                    label="Diastolic BP"
                    value={vital.diastolic_bp ?? "-"}
                  />
                  <DataDisplay
                    label="Heart Rate"
                    value={vital.heart_rate ?? "-"}
                  />
                  <DataDisplay
                    label="Professional"
                    value={`${vital.professional.user.first_name} ${vital.professional.user.last_name}`}
                  />
                  {vital.notes && (
                    <DataDisplay
                      label="Notes"
                      value={vital.notes}
                      className="text-gray-700 italic"
                    />
                  )}
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <span className="px-3 py-2 border rounded text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </Card>

      {patientId && (
        <VitalRecordsCreateModal
          patientId={patientId}
          record={editingRecord ?? undefined}
          open={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default PatientDetailPage;
