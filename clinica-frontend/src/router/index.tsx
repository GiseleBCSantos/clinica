import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "../hooks/useAuth";

import LoginPage from "../pages/Login";
import { LandingPage } from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFound";

import PatientListPage from "../pages/PatientsListPage";
import PatientDetailPage from "../pages/PatientsDetailPage";

import AlertListPage from "../pages/AlertListPage";
import VitalRecordCreatePage from "../pages/VitalRecordsCreatePage";
import VitalRecordsListPage from "../pages/VitalRecordsListPage";
import AppLayout from "../components/layout/AppLayout";

export function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <PrivateRoute>
              <AppLayout>
                <PatientListPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/patients/:id"
          element={
            <PrivateRoute>
              <AppLayout>
                <PatientDetailPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        Vital Records (Permite Create)
        <Route
          path="/vital-records"
          element={
            <PrivateRoute>
              <AppLayout>
                <VitalRecordsListPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <PrivateRoute>
              <AppLayout>
                <AlertListPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
