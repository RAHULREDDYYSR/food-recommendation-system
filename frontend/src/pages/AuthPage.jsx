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
    age: "",
    gender: "male",
    height: "",
    weight: ""
  });

  const BACKEND_URL = "http://localhost:7777/api/v1/auth";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateBMI = (height, weight) => {
    if (!height || !weight) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = tab === "login" ? `${BACKEND_URL}/login` : `${BACKEND_URL}/register`;
      const bmi = tab === "register" ? calculateBMI(formData.height, formData.weight) : null;
      const data = tab === "login" 
        ? { email: formData.email, password: formData.password } 
        : { ...formData, bmi };
  
      const response = await axios.post(endpoint, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
  
      toast.success(tab === "login" ? "Welcome back! 🎉" : "Welcome to MoodFood! 🎊");
      localStorage.setItem("token", response.data.token);
      window.dispatchEvent(new Event("authChange"));
  
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Oops! Something went wrong 😔");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md p-8 space-y-6 bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl mx-4">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            {tab === "login" ? "Welcome Back! 👋" : "Join MoodFood! 🍽️"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {tab === "login" ? "Let's find your perfect meal" : "Start your culinary journey"}
          </p>
        </div>

        <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-3 rounded-md transition-all duration-300 ${
              tab === "login"
                ? "bg-white dark:bg-gray-800 shadow-md text-red-500 font-medium"
                : "text-gray-600 dark:text-gray-300 hover:text-red-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-3 rounded-md transition-all duration-300 ${
              tab === "register"
                ? "bg-white dark:bg-gray-800 shadow-md text-red-500 font-medium"
                : "text-gray-600 dark:text-gray-300 hover:text-red-500"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "register" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {tab === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}