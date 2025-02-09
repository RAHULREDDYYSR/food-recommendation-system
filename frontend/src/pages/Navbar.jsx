import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mood-toggle";
import { Button } from "@/components/ui/button";
import axios from "axios";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Listen for login/logout updates
  useEffect(() => {
    const updateAuthState = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("authChange", updateAuthState);
    return () => window.removeEventListener("authChange", updateAuthState);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Call backend logout API to clear cookies
      await axios.get("http://localhost:7777/api/v1/auth/logout", { withCredentials: true });
  
      // Clear local storage and session storage
      localStorage.clear();
      sessionStorage.clear();
  
      // Completely remove all browsing history and prevent back navigation
      window.location.replace("/auth");
  
      // Push a new empty history state to disable back button
      setTimeout(() => {
        window.history.pushState(null, null, "/auth");
        window.history.replaceState(null, null, "/auth");
      }, 50);
  
      // Reload the page to enforce logout
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  
  

  return (
    <nav className="border-b mx-5">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold">
          Mood Food
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/history">
            <Button variant="ghost">History</Button>
          </Link>
          <ModeToggle />
          
          {isLoggedIn ? (
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="default">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
