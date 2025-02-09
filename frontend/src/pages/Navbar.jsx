import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mood-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setIsLoggedIn(false); // Update state
    navigate("/auth"); // Redirect to login page
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
