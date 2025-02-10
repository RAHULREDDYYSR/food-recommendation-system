import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { FoodRecommendations } from "./pages/FoodRecommendation";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./pages/Navbar";
import History from "./pages/History"; // ✅ Default import

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/auth";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recommendations" element={<FoodRecommendations />} />
        <Route path="/history" element={<History />} /> {/* ✅ Route now works */}
      </Routes>
    </>
  );
}

export default App;
