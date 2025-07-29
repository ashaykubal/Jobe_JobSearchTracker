import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { setupGlobalScrollbarVisibility } from './utils/scrollbar';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Applications from './pages/Applications';
import Searches from './pages/Searches';
import NewSearch from './pages/NewSearch';
import Profile from './pages/Profile';
import AuthCallback from './pages/AuthCallback';

function App() {
  // Initialize global scrollbar visibility management
  useEffect(() => {
    const cleanup = setupGlobalScrollbarVisibility();
    
    // Cleanup on component unmount
    return cleanup;
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/applications" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="searches" element={<Searches />} />
            <Route path="new-search" element={<NewSearch />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;