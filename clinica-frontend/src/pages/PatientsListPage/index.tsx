import { useState, useEffect } from "react";
import { Card } from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { usePatients } from "../../hooks/usePatient";
import { Button } from "../../components/ui/Button";

export function PatientListPage() {
  const { patients, totalCount, loading, error, fetchPatients } = usePatients();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pendingSearch, setPendingSearch] = useState("");

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
        {loading ? (
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
            headers={["Full Name", "Record #", "Priority"]}
            data={patients}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            renderRow={(patient) => (
              <tr
                key={patient.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() =>
                  (window.location.href = `/patients/${patient.id}`)
                }
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
              </tr>
            )}
          />
        )}
      </Card>
    </div>
  );
}

export default PatientListPage;
