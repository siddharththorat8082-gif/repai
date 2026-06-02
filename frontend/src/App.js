import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Subscription from './pages/Subscription';
import AuthCallback from './pages/AuthCallback';
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
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
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } 
      />

      <Route path="/onboarding" element={
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
      } />

      <Route path="/premium" element={
        <ProtectedRoute>
          <Subscription />
        </ProtectedRoute>
      } />

      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
}

export default App;