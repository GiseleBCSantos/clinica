import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "../hooks/useAuth";
import { Suspense, lazy } from "react";
import Loading from "../components/ui/Loading";

const LoginPage = lazy(() => import("../pages/Login"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));
const PatientListPage = lazy(() => import("../pages/PatientsListPage"));
const PatientDetailPage = lazy(() => import("../pages/PatientsDetailPage"));
const AlertListPage = lazy(() => import("../pages/AlertListPage"));
const VitalRecordsListPage = lazy(
  () => import("../pages/VitalRecordsListPage")
);
const AppLayout = lazy(() => import("../components/layout/AppLayout"));

export function AppRouter() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
      </Suspense>
    </BrowserRouter>
  );
}
