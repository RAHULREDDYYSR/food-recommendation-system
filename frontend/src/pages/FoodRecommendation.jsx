"use client";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FoodDetails } from "./FoodDetails";

export function FoodRecommendations() {
  const location = useLocation();
  const { state } = location;
  const recommendations = state?.recommendations?.foods || [];
  const systemMessage = state?.recommendations?.systemMessage || "Food recommendations based on your mood.";

  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Recommended Foods</h1>
      {systemMessage && <p className="mb-6 text-lg font-semibold text-gray-700">{systemMessage}</p>}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {recommendations.length > 0 ? (
            recommendations.map((food, index) => {
              const foodName = Object.values(food)[0]; // Extracting the food name
              return (
                <Card
                  key={index}
                  className={`cursor-pointer hover:bg-accent transition-all ${
                    selectedFood === food ? "bg-indigo-100" : ""
                  }`}
                  onClick={() => setSelectedFood(food)}
                >
                  <CardHeader>
                    <CardTitle>{foodName}</CardTitle>
                    <CardDescription>{food.reason}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
        <div>{selectedFood && <FoodDetails food={selectedFood} />}</div>
      </div>
    </div>
  );
}
