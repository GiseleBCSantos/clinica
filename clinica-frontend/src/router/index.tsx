import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import LoginPage from "../pages/Login";
import DashboardPage from "../pages/DashboardPage";
import PatientListPage from "../pages/PatientsListPage";
import PatientCreatePage from "../pages/PatientsCreatePage";
import PatientDetailPage from "../pages/PatientsDetailPage";
import AlertListPage from "../pages/AlertListPage";
import NotFoundPage from "../pages/NotFound";
import { useAuth } from "../hooks/useAuth";
import { PrivateRoute } from "./PrivateRoute";
import { AppointmentListPage } from "../pages/AppointmentsListPage";
import { Sidebar } from "../components/layout/Sidebar";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <main className="ml-64 mt-16 p-6">{children}</main>
    </div>
  );
}

export function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
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
          path="/patients/create"
          element={
            <PrivateRoute>
              <AppLayout>
                <PatientCreatePage />
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

        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <AppLayout>
                <AppointmentListPage />
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

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
