import { Appointment } from "../utils/types";
import api from "./api";

export const appointmentsService = {
  async getAll(): Promise<Appointment[]> {
    const response = await api.get<Appointment[]>("/agendamentos/");
    return response.data;
  },

  async getById(id: number): Promise<Appointment> {
    const response = await api.get<Appointment>(`/agendamentos/${id}/`);
    return response.data;
  },

  async create(
    appointment: Omit<Appointment, "id" | "created_at" | "updated_at">
  ): Promise<Appointment> {
    const response = await api.post<Appointment>("/agendamentos/", appointment);
    return response.data;
  },

  async update(
    id: number,
    appointment: Partial<Appointment>
  ): Promise<Appointment> {
    const response = await api.patch<Appointment>(
      `/agendamentos/${id}/`,
      appointment
    );
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/agendamentos/${id}/`);
  },
};
