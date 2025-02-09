import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { FoodRecommendations } from "./pages/FoodRecommendation";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./pages/Navbar";

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
      </Routes>
    </>
  );
}

export default App;
