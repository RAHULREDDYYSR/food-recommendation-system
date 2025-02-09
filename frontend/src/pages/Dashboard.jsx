import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const moodEmojis = ["😊", "😢", "😠", "😴", "😎", "🤔", "😋", "😰"];

export function Dashboard() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) {
      toast.error("Please select a mood before submitting.");
      return;
    }
    console.log("Mood:", selectedMood, "Prompt:", prompt);
    navigate("/recommendations"); // Redirect to recommendations page
  };

  return (
    <div className="container max-w-2xl mx-auto mt-8 p-4">
      <Toaster position="top-center" reverseOrder={false} />
      
      <h1 className="text-3xl font-bold mb-6">How are you feeling today?</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {moodEmojis.map((emoji, index) => (
          <button
            key={index}
            className={`text-4xl p-8 border rounded-md transition-all ${
              selectedMood === emoji ? "bg-indigo-500 text-white" : "bg-white border-gray-300"
            }`}
            onClick={() => setSelectedMood(emoji)}
          >
            {emoji}
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
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md">
          Get Food Recommendations
        </button>
      </form>
    </div>
  );
}
