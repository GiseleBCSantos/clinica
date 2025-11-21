import { useState, useCallback, useEffect } from "react";
import type { VitalRecord, VitalRecordCreate } from "../utils/types";
import { vitalRecordsService } from "../services/vitalRecords.service";

export function useVitalRecords() {
  const [records, setRecords] = useState<VitalRecord[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = useCallback(
    async (params?: { search?: string; patient?: number; page?: number }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await vitalRecordsService.getAll(params);
        setRecords(data.results);
        setCount(data.count);
      } catch (err: any) {
        setError(err.message || "Failed to fetch records");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createRecord = useCallback(
    async (record: VitalRecordCreate) => {
      setLoading(true);
      try {
        await vitalRecordsService.create(record);
        fetchRecords({ page: 1 });
      } finally {
        setLoading(false);
      }
    },
    [fetchRecords]
  );

  const updateRecord = useCallback(
    async (id: number, record: Partial<VitalRecordCreate>, page?: number) => {
      setLoading(true);
      try {
        await vitalRecordsService.update(id, record);
        fetchRecords({ page });
      } finally {
        setLoading(false);
      }
    },
    [fetchRecords]
  );

  return {
    records,
    count,
    loading,
    error,
    fetchRecords,
    createRecord,
    updateRecord,
  };
}
