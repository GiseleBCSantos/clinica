import api from "./api";
import type {
  VitalRecord,
  VitalRecordCreate,
  PaginatedResponse,
} from "../utils/types";

interface VitalRecordParams {
  page?: number;
  patient?: number;
  search?: string;
}

export const vitalRecordsService = {
  async getAll(params?: VitalRecordParams) {
    const { data } = await api.get<PaginatedResponse<VitalRecord>>(
      "/vital-records/",
      { params }
    );
    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<VitalRecord>(`/vital-records/${id}/`);
    return data;
  },

  async create(record: VitalRecordCreate) {
    const { data } = await api.post<VitalRecord>("/vital-records/", record);
    return data;
  },

  async update(id: number, record: Partial<VitalRecordCreate>) {
    const { data } = await api.patch<VitalRecord>(
      `/vital-records/${id}/`,
      record
    );
    return data;
  },
};
