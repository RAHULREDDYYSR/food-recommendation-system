import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

export function FoodDetails({ food }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!food) return;

    const foodName = Object.values(food)[0]; // Extract food name
    console.log("Selected Food:", foodName); // Debugging log

    const fetchRestaurants = async () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get("http://localhost:7777/api/v1/nearby/restaurants", {
              params: { latitude, longitude, foodItem: foodName },
              withCredentials: true,
            });

            const restaurantData = Array.isArray(response?.data?.restaurants?.data)
              ? response.data.restaurants.data
              : [];
            console.log("Extracted restaurantData:", restaurantData);

            if (restaurantData.length > 0) {
              setRestaurants(restaurantData);
            } else {
              setError("No restaurants found.");
            }
          } catch (err) {
            console.error("Error fetching restaurants:", err);
            setError("Failed to load restaurants.");
          } finally {
            setLoading(false);
          }
        },
        (geoError) => {
          console.error("Geolocation error:", geoError);
          setError("Failed to retrieve location.");
          setLoading(false);
        }
      );
    };

    fetchRestaurants();
  }, [food]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Nearby Restaurants for {Object.values(food)[0]}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader className="animate-spin h-8 w-8 text-gray-500" />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : restaurants.length === 0 ? (
          <p className="text-gray-500">No restaurants found.</p>
        ) : (
          <div className="overflow-y-auto h-96 space-y-4 border p-3 rounded-lg shadow-sm">
            {restaurants.map((restaurant, index) => (
              <Card key={index} className="p-4 shadow-md">
                {restaurant.photoUrl && (
                  <img
                    src={restaurant.photoUrl}
                    alt={restaurant.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                <p className="text-gray-600">{restaurant.address}</p>
                <p className="text-sm">
                  <strong>Rating:</strong> {restaurant.rating || "N/A"} ⭐
                </p>
                <p className="text-sm">
                  <strong>Price Level:</strong> {restaurant.price_level ? "💲".repeat(restaurant.price_level) : "N/A"}
                </p>
                <p className={`text-sm ${restaurant.is_open ? "text-green-600" : "text-red-500"}`}>
                  {restaurant.is_open ? "Open Now ✅" : "Closed ❌"}
                </p>
                <a
                  href={restaurant.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 block"
                >
                  Get Directions 📍
                </a>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
