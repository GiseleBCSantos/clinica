import { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useVitalRecords } from "../../hooks/useVitalRecords";
import { formatDate } from "../../utils/formatDate";
import Loading from "../../components/ui/Loading";

export function VitalRecordsListPage() {
  const { records, count, loading, error, fetchRecords } = useVitalRecords();
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchRecords({ search: searchName, page });
  }, [searchName, page, fetchRecords]);

  const handleFilter = () => setPage(1);

  const handleClearFilter = () => {
    setSearchName("");
    setPage(1);
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Vital Records</h1>

      <Card variant="header" title={`All Vital Records (${count})`}>
        <div className="flex flex-col md:flex-row items-start md:items-end gap-2 mb-4">
          <Input
            label="Filter by Patient Name"
            placeholder="Type patient name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button onClick={handleFilter}>Filter</Button>
          <Button variant="secondary" onClick={handleClearFilter}>
            Clear
          </Button>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : records.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No records found
          </div>
        ) : (
          <Table
            headers={[
              "Created At",
              "Patient",
              "Temperature (°C)",
              "Systolic BP",
              "Diastolic BP",
              "Heart Rate",
              "Notes",
            ]}
            data={records}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            renderRow={(vital) => (
              <tr key={vital.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatDate(vital.created_at)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {vital.patient}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {vital.temperature ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {vital.systolic_bp ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {vital.diastolic_bp ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {vital.heart_rate ?? "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {vital.notes ?? "-"}
                </td>
              </tr>
            )}
          />
        )}
      </Card>
    </div>
  );
}

export default VitalRecordsListPage;
