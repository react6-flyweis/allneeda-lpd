import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import LegalGovernance from "./pages/LegalGovernance";
import PoliciesDocuments from "./pages/PoliciesDocuments";
import RegulatoryAffairs from "./pages/RegulatoryAffairs";
import PermitsLicensing from "./pages/PermitsLicensing";

import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/legal-governance" element={<LegalGovernance />} />
          <Route path="/policies-documents" element={<PoliciesDocuments />} />
          <Route path="/regulatory-affairs" element={<RegulatoryAffairs />} />
          <Route path="/permits-licensing" element={<PermitsLicensing />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
