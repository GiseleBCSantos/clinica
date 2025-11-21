import { PaginatedResponse, Patient } from "../utils/types";
import api from "./api";

interface PatientParams {
  page?: number;
  search?: string;
  priority?: string;
}

export const patientsService = {
  async getAll(params?: PatientParams) {
    const { data } = await api.get<PaginatedResponse<Patient>>("/patients/", {
      params,
    });
    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<Patient>(`/patients/${id}/`);
    return data;
  },
};
