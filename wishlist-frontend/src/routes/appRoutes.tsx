import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import LoginPage from '../pages/LoginPage'
// import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </Router>
  )
}
