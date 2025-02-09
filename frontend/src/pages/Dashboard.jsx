import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const moodEmojis = [
  { emoji: "😊", label: "happy" },
  { emoji: "😢", label: "sad" },
  { emoji: "😠", label: "angry" },
  { emoji: "😴", label: "sleepy" },
  { emoji: "😎", label: "cool" },
  { emoji: "🤔", label: "thoughtful" },
  { emoji: "😋", label: "hungry" },
  { emoji: "😰", label: "nervous" },
];

export function Dashboard() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [userLocation, setUserLocation] = useState({ lat: null, long: null });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // NEW: Loading state
  const navigate = useNavigate();

  const BACKEND_URL = "http://localhost:7777/api/v1";

  // Fetch user info from backend on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/auth/me`, {
          withCredentials: true, // Sends cookies
        });

        setUser(response.data.user); // Store user info
      } catch (error) {
        console.error("User authentication failed:", error);
        toast.error("You need to log in first.");
        navigate("/login");
      }
    };

    fetchUser();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          toast.error("Location permission denied. Please enable it.");
        } else {
          toast.error("Unable to access your location.");
        }
      }
    );
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMood) {
      toast.error("Please select a mood before submitting.");
      return;
    }

    if (userLocation.lat === null || userLocation.long === null) {
      toast.error("Location is required for recommendations.");
      return;
    }

    if (!user) {
      toast.error("User is not authenticated.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true); // Show loading screen

      const payload = {
        mood: selectedMood.label,
        prompt,
        latitude: userLocation.lat,
        longitude: userLocation.long,
      };

      console.log("Submitting payload:", payload);

      const response = await axios.post(`${BACKEND_URL}/food/recommend`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      toast.success("Recommendations received!");
      console.log("Response:", response.data);

      // Navigate with recommendations
      navigate("/recommendations", { state: { recommendations: response.data } });
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast.error(error.response?.data?.message || "Failed to get recommendations.");
    } finally {
      setLoading(false); // Hide loading screen
    }
  };

  return (
    <div className="container max-w-2xl mx-auto mt-8 p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-3xl font-bold mb-6">How are you feeling today?</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {moodEmojis.map((mood, index) => (
          <button
            key={index}
            className={`text-4xl p-8 border rounded-md transition-all ${
              selectedMood === mood ? "bg-indigo-500 text-white" : "bg-white border-gray-300"
            }`}
            onClick={() => setSelectedMood(mood)}
            disabled={loading} // Disable while loading
          >
            {mood.emoji}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block mb-2 text-sm font-medium">
            Tell us more about your mood:
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="I'm feeling..."
            className="min-h-[100px] w-full border p-2 rounded-md"
            disabled={loading} // Disable while loading
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md flex justify-center items-center"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            "Get Food Recommendations"
          )}
        </button>
      </form>

      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">Fetching Recommendations...</p>
            <div className="mt-4 animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
          </div>
        </div>
      )}
    </div>
  );
}
