import api from "./api";
import type { Staff, PaginatedResponse } from "../utils/types";

interface StaffParams {
  page?: number;
  search?: string;
  role?: string;
}

export const staffService = {
  async getAll(params?: StaffParams) {
    const { data } = await api.get<PaginatedResponse<Staff>>("/staff/", {
      params,
    });
    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<Staff>(`/staff/${id}/`);
    return data;
  },
};
