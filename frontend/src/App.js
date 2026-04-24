import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import LandingPage from './pages/LandingPage';
import Login from './pages/LoginPage';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import WorkoutPlans from './pages/WorkoutPlans';
import Nutrition from './pages/Nutrition';
import Habits from './pages/Habits';
import AICoach from './pages/AICoach';
import Progress from './pages/Progress';
import Subscription from './pages/Subscription';
import AuthCallback from './pages/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppRouter() {
  const location = window.location;
  
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
<Route path="/login" element={<LoginPage />} />

<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />

<Route path="/onboarding" element={
  <ProtectedRoute>
    <OnboardingPage />
  </ProtectedRoute>
} />

<Route path="/" element={<LandingPage />} />
<Route path="/login" element={<LoginPage />} />

<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />

<Route path="/onboarding" element={
  <ProtectedRoute>
    <OnboardingPage />
  </ProtectedRoute>
} />

<Route path="/premium" element={
  <ProtectedRoute>
    <PremiumPage />
  </ProtectedRoute>
} />
    </Routes>
  );
}

export default App;