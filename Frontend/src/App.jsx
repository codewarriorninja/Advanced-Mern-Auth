import FloatingShape from "./components/FloatingShape"
import { Navigate, Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage ";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5}  />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2}  />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App