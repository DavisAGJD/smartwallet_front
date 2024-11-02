import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/login-page";
import Register from "./Pages/register";
import HomePage from "./Pages/HomePage";
import HowItWorks from "./Pages/HowItWorks";
import PricingTier from "./Pages/PricingTier";
import GoalsPage from "./Pages/GoalsPage";
import ExpensesPage from "./Pages/ExpensesPage";
import ReportsPage from "./Pages/ReportsPage";
import EducationPage from "./Pages/EducationPage";
import UserOverviewPage from "./Pages/UserOverviewPage";
import AdminOverviewPage from "./Pages/AdminOverviewPage";
import UserManagementPage from "./Pages/UserManagementPage";
import AdminReportsPage from "./Pages/AdminReportsPage";
import ProtectedRoute from "../src/components/ui/Componentes/Protected/ProtectedRoute";
import AboutSection from "./Pages/AboutSection";
import EducationAdminPage from "./Pages/EducationAdminPage";
import UserConfigurations from "./Pages/UserConfigurations";
import ExpenseCategories from "./Pages/ExpenseCategories";
import GoalsManagement from "./Pages/GoalsManagement";
import AnalysisPage from "./Pages/AnalysisPage";
import RemindersPage from "./Pages/RemindersPage";
import NotificationsPage from "./Pages/NotificationPage";
import { NotificationProvider } from "./context/NotificationProvider";
import GlobalNotification from "./components/ui/Componentes/GlobalNotification";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/prices" element={<PricingTier />} />
          <Route path="/about-us" element={<AboutSection />} />

          {/* Rutas de usuario, cada una envuelta en NotificationProvider y GlobalNotification */}
          <Route
            path="/goals"
            element={
              <NotificationProvider>
                <GlobalNotification />
                <ProtectedRoute requiredRole="usuario">
                  <GoalsPage />
                </ProtectedRoute>
              </NotificationProvider>
            }
          />
          <Route
            path="/analysis"
            element={
              <NotificationProvider>
                <GlobalNotification />
                <ProtectedRoute requiredRole="usuario">
                  <AnalysisPage />
                </ProtectedRoute>
              </NotificationProvider>
            }
          />
          <Route
            path="/reminders"
            element={
              <NotificationProvider>
                <GlobalNotification />
                <ProtectedRoute requiredRole="usuario">
                  <RemindersPage />
                </ProtectedRoute>
              </NotificationProvider>
            }
          />
          <Route
            path="/notifications"
            element={
              <NotificationProvider>
                <GlobalNotification />
                <ProtectedRoute requiredRole="usuario">
                  <NotificationsPage />
                </ProtectedRoute>
              </NotificationProvider>
            }
          />
          <Route
            path="/expenses"
            element={
              <NotificationProvider>
                <GlobalNotification />
                <ProtectedRoute requiredRole="usuario">
                  <ExpensesPage />
                </ProtectedRoute>
              </NotificationProvider>
            }
          />
          <Route
            path="/reports"
            element={
              <NotificationProvider>
                <GlobalNotification />
                <ProtectedRoute requiredRole="usuario">
                  <ReportsPage />
                </ProtectedRoute>
              </NotificationProvider>
            }
          />
          <Route
            path="/education"
            element={
              <NotificationProvider>
                <GlobalNotification />
                <ProtectedRoute requiredRole="usuario">
                  <EducationPage />
                </ProtectedRoute>
              </NotificationProvider>
            }
          />
          <Route
            path="/user-overview"
            element={
              <NotificationProvider>
                <GlobalNotification />
                <ProtectedRoute requiredRole="usuario">
                  <UserOverviewPage />
                </ProtectedRoute>
              </NotificationProvider>
            }
          />
          <Route
            path="/user-configuration"
            element={
              <NotificationProvider>
                <GlobalNotification />
                <ProtectedRoute requiredRole="usuario">
                  <UserConfigurations />
                </ProtectedRoute>
              </NotificationProvider>
            }
          />

          {/* Rutas protegidas para administradores */}
          <Route
            path="/admin-overview"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminOverviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-management"
            element={
              <ProtectedRoute requiredRole="admin">
                <UserManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-reports"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-education"
            element={
              <ProtectedRoute requiredRole="admin">
                <EducationAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense-categories"
            element={
              <ProtectedRoute requiredRole="admin">
                <ExpenseCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/goals-management"
            element={
              <ProtectedRoute requiredRole="admin">
                <GoalsManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
