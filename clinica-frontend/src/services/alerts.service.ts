import { Alert } from "../utils/types";
import api from "./api";

export const alertsService = {
  async getAll(): Promise<Alert[]> {
    const response = await api.get<Alert[]>("/alertas/");
    return response.data;
  },

  async getById(id: number): Promise<Alert> {
    const response = await api.get<Alert>(`/alertas/${id}/`);
    return response.data;
  },

  async create(
    alert: Omit<Alert, "id" | "created_at" | "updated_at">
  ): Promise<Alert> {
    const response = await api.post<Alert>("/alertas/", alert);
    return response.data;
  },

  async update(id: number, alert: Partial<Alert>): Promise<Alert> {
    const response = await api.patch<Alert>(`/alertas/${id}/`, alert);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/alertas/${id}/`);
  },

  async markAsViewed(id: number): Promise<Alert> {
    const response = await api.patch<Alert>(`/alertas/${id}/`, {
      status: "VISUALIZADO",
    });
    return response.data;
  },

  async markAsResolved(id: number): Promise<Alert> {
    const response = await api.patch<Alert>(`/alertas/${id}/`, {
      status: "RESOLVIDO",
    });
    return response.data;
  },
};
