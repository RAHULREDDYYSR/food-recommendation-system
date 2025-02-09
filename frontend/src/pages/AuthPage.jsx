import React, { useState } from "react";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const BACKEND_URL = "http://localhost:7777/api/v1/auth";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = tab === "login" ? `${BACKEND_URL}/login` : `${BACKEND_URL}/register`;
      const data = tab === "login" 
        ? { email: formData.email, password: formData.password } 
        : formData;

      const response = await axios.post(endpoint, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      toast.success(tab === "login" ? "Login successful!" : "Registration successful!");

      if (tab === "login") {
        localStorage.setItem("token", response.data.token); // Store token
        window.dispatchEvent(new Event("authChange")); // Notify navbar to update UI
      }

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome</h2>
          <p className="text-gray-600">Sign up or log in to your account</p>
        </div>

        <div className="flex mt-4">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 text-center ${tab === "login" ? "border-b-2 border-indigo-500 font-semibold" : "text-gray-500"}`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-2 text-center ${tab === "register" ? "border-b-2 border-indigo-500 font-semibold" : "text-gray-500"}`}
          >
            Register
          </button>
        </div>

        <form className="mt-4" onSubmit={handleSubmit}>
          {tab === "register" && (
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required className="w-full p-2 border rounded" />
              </div>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="m@example.com" required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-medium">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="w-full mt-4 bg-indigo-600 text-white py-2 rounded">
            {tab === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
