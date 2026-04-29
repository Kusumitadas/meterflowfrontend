import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ApiKeys from "./pages/ApiKeys";
import Billing from "./pages/Billing";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        
        {/* Public/Protected Routes wrapped in Layout */}
        <Route
          path="/*"
          element={
            <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/keys" element={isLoggedIn ? <ApiKeys /> : <Navigate to="/login" />} />
                <Route path="/billing" element={isLoggedIn ? <Billing /> : <Navigate to="/login" />} />
                <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;