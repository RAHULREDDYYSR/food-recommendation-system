import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockFoodDetails = {
  1: { location: "123 Main St", rating: 4.5, price: "$$", address: "123 Main St, City, Country" },
  2: { location: "456 Oak Ave", rating: 4.2, price: "$$$", address: "456 Oak Ave, City, Country" },
  3: { location: "789 Pine Rd", rating: 4.8, price: "$", address: "789 Pine Rd, City, Country" },
}

export function FoodDetails({ food }) {
  const details = mockFoodDetails[food.id]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{food.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">
          <strong>Rating:</strong> {details.rating} / 5
        </p>
        <p className="mb-2">
          <strong>Price:</strong> {details.price}
        </p>
        <p className="mb-2">
          <strong>Address:</strong> {details.address}
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Location</h3>
          <div className="bg-muted h-48 flex items-center justify-center rounded-md">[Map Placeholder]</div>
        </div>
      </CardContent>
    </Card>
  )
}

