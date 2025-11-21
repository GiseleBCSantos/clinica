import api from "./api";
import type { Alert, PaginatedResponse } from "../utils/types";

interface AlertParams {
  page?: number;
  patient?: number;
  search?: string;
}

export const alertsService = {
  async getAll(params?: AlertParams) {
    const { data } = await api.get<PaginatedResponse<Alert>>("/alerts/", {
      params,
    });
    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<Alert>(`/alerts/${id}/`);
    return data;
  },
};
