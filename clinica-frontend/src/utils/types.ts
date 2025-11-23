export interface User {
  username: string;
  first_name: string;
  last_name: string;
}

export interface Staff {
  id: number;
  user: User;
  role: string;
}

export interface Patient {
  id: number;
  full_name: string;
  record_number: string;
  priority: "low" | "medium" | "high";
  alerts_count: number;
}

export interface VitalRecord {
  id: number;
  patient: number;
  professional: Staff;
  temperature?: number | null;
  systolic_bp?: number | null;
  diastolic_bp?: number | null;
  heart_rate?: number | null;
  notes?: string;
  created_at: string;
}

export interface VitalRecordCreate {
  patient_id: number;
  temperature?: number;
  systolic_bp?: number;
  diastolic_bp?: number;
  heart_rate?: number;
  notes?: string;
}

export interface Alert {
  id: number;
  patient: number;
  patient_name: string;
  message: string;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
