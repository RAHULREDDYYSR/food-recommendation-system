"use client";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FoodDetails } from "./FoodDetails";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FoodRecommendations() {
  const location = useLocation();
  const { state } = location;
  const recommendations = state?.recommendations?.foods || [];
  const systemMessage = state?.recommendations?.systemMessage || "Food recommendations based on your mood.";

  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-primary">🍽️ Recommended Foods</h1>
      {systemMessage && <p className="mb-6 text-lg font-medium text-center text-muted-foreground">{systemMessage}</p>}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {recommendations.length > 0 ? (
            recommendations.map((food, index) => {
              const foodName = Object.values(food)[0];
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className={cn(
                      "cursor-pointer p-5 rounded-xl shadow-md border transition-all", 
                      "hover:shadow-lg hover:bg-accent hover:text-accent-foreground",
                      selectedFood === food && "bg-indigo-500 text-white"
                    )}
                    onClick={() => setSelectedFood(food)}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">{foodName}</CardTitle>
                      <CardDescription className="text-muted-foreground">{food.reason}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <p className="text-center text-lg text-muted-foreground">No recommendations available.</p>
          )}
        </div>
        <div className="flex justify-center">
          {selectedFood ? <FoodDetails food={selectedFood} /> : <p className="text-lg text-muted-foreground">Select a food item to see details.</p>}
        </div>
      </div>
    </div>
  );
}
