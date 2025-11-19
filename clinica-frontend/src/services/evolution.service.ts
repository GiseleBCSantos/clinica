import { Evolution } from "../utils/types";
import api from "./api";

export const evolutionsService = {
  async getByPatient(patientId: number): Promise<Evolution[]> {
    const response = await api.get<Evolution[]>(
      `/evolucoes/?paciente=${patientId}`
    );
    return response.data;
  },

  async getById(id: number): Promise<Evolution> {
    const response = await api.get<Evolution>(`/evolucoes/${id}/`);
    return response.data;
  },

  async create(
    evolution: Omit<Evolution, "id" | "created_at" | "updated_at">
  ): Promise<Evolution> {
    const response = await api.post<Evolution>("/evolucoes/", evolution);
    return response.data;
  },

  async update(id: number, evolution: Partial<Evolution>): Promise<Evolution> {
    const response = await api.patch<Evolution>(`/evolucoes/${id}/`, evolution);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/evolucoes/${id}/`);
  },
};
