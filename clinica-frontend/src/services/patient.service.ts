import { Patient } from "../utils/types";
import api from "./api";

export const patientsService = {
  async getAll(): Promise<Patient[]> {
    const response = await api.get<Patient[]>("/pacientes/");
    return response.data;
  },

  async getById(id: number): Promise<Patient> {
    const response = await api.get<Patient>(`/pacientes/${id}/`);
    return response.data;
  },

  async create(
    patient: Omit<Patient, "id" | "created_at" | "updated_at">
  ): Promise<Patient> {
    const response = await api.post<Patient>("/pacientes/", patient);
    return response.data;
  },

  async update(id: number, patient: Partial<Patient>): Promise<Patient> {
    const response = await api.patch<Patient>(`/pacientes/${id}/`, patient);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/pacientes/${id}/`);
  },
};
