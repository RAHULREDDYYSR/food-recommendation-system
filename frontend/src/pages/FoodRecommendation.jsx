"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FoodDetails } from "./FoodDetails"

const mockRecommendations = [
  { id: 1, name: "Chocolate Cake", reason: "Sweet treats can boost your mood!" },
  { id: 2, name: "Grilled Salmon", reason: "Omega-3s are great for reducing stress." },
  { id: 3, name: "Fresh Fruit Salad", reason: "Vitamins and natural sugars for energy." },
]

export function FoodRecommendations() {
  const [selectedFood, setSelectedFood] = useState(null)

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Recommended Foods</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {mockRecommendations.map((food) => (
            <Card key={food.id} className="cursor-pointer hover:bg-accent" onClick={() => setSelectedFood(food)}>
              <CardHeader>
                <CardTitle>{food.name}</CardTitle>
                <CardDescription>{food.reason}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div>{selectedFood && <FoodDetails food={selectedFood} />}</div>
      </div>
    </div>
  )
}

