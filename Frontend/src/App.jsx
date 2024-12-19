import { Route, Routes } from "react-router-dom"
import FloatingShap from "./components/FloatingShap"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import EmailVerificationPage from "./pages/EmailVerification"
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-green-900 to bg-emerald-900 flex items-center justify-center overflow-hidden relative">
      <FloatingShap color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShap color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShap color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <Routes>
        <Route path="/" element={'Home'} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
      </Routes>
    </div>
  )
}

export default App