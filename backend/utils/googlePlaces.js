import { Client } from '@googlemaps/google-maps-services-js';
const client = new Client({});
 
export const getNearbyRestaurants = async (payload) => {
  const { latitude, longitude, foodItem } = payload;
  console.log(latitude, longitude, foodItem);

  if (!latitude || !longitude) {
    return { status: 400, error: 'Latitude and Longitude are required.' };
  }

  try {
    const response = await client.placesNearby({
      params: {
        location: `${latitude},${longitude}`,
        radius: 1000,
        type: 'restaurant',
        keyword: foodItem,
        key: process.env.GOOGLE_API_KEY,
      },
      timeout: 5000,
    });

    // console.log("Full API Response:", response);

    if (response.status !== 200) {
      console.error('Google Places API Error:', response.data?.error_message || response.statusText);
      return { status: response.status, error: response.data?.error_message || 'Failed to fetch nearby restaurants.' };
    }

    if (!response.data || !response.data.results) {
      console.error('Google Places API Error: No data or results found.');
      return { status: 500, error: 'No data or results found.' };
    }

    const restaurants = response.data.results.map((place) => {
      // console.log("place_id:", place.place_id); // Debugging: Inspect the place_id

      let photoUrl = null;
      if (place.photos && place.photos.length > 0) {
        const photoReference = place.photos[0].photo_reference;
        photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.GOOGLE_API_KEY}`;
      }

      // Construct the directions URL using latitude and longitude
      const restaurantLatitude = place.geometry.location.lat;
      const restaurantLongitude = place.geometry.location.lng;
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${restaurantLatitude},${restaurantLongitude}`;
      // console.log("directionsUrl:", directionsUrl); // Debugging: Inspect the directionsUrl

      return {
        name: place.name,
        rating: place.rating,
        price_level: place.price_level,
        photoUrl: photoUrl,
        address: place.vicinity || place.formatted_address,
        directionsUrl: directionsUrl,
        is_open: place.opening_hours?.open_now ?? null,
      };
    });

    return { status: 200, data: restaurants.slice(0,5) };
  } catch (error) {
    console.error('Google Places API Error:', error.response?.data?.error_message || error.message);
    return { status: error.response?.status || 500, error: error.response?.data?.error_message || 'Failed to fetch nearby restaurants.' };
  }
};