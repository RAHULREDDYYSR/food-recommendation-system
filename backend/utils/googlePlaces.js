import { Client } from '@googlemaps/google-maps-services-js';
const client = new Client({});


export const getNearbyRestaurants = ({payload}) => {
  const { latitude, longitude, foodItem  } = payload;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and Longitude are required.' });
  }

  try {
    const response =  client.placesNearby({
      params: {
        location: `${latitude},${longitude}`,
        radius: 1500, // meters
        type: 'restaurant, food',
        keyword: foodItem,
        key: process.env.GOOGLE_API_KEY,
      },
      timeout: 1000, // milliseconds
    });

    const restaurants = response.data.results.map((place) => ({
      name: place.name,
      rating: place.rating,
      price_level: place.price_level,
      types: place.types,
      address: place.vicinity || place.formatted_address,
      location: place.geometry.location,
      is_open: place.opening_hours?.open_now ?? null,
    }));

    return restaurants;
  } catch (error) {
    console.error('Google Places API Error:', error.response?.data?.error_message || error.message);
    return ({ error: 'Failed to fetch nearby restaurants.' });
  }
};
