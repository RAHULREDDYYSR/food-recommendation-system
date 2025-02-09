import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import {getNearbyRestaurants} from  '../utils/index.js'



export const NearbyRestaurants = async (req, res) => {
    try {
        const { latitude, longitude, foodItem } = req.query;
        const payload = {latitude, longitude, foodItem}
        
        if (!latitude || !longitude) {
            return res.status(StatusCodes.BAD_REQUEST).json({ 
                message: "Latitude and longitude are required." 
            });
        }

        const nearbyRestaurants = await getNearbyRestaurants(payload);

        return res.status(StatusCodes.OK).json({ restaurants: nearbyRestaurants });

    } catch (error) {
        console.error("Error fetching restaurants:", error);
        const customError = new CustomError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(customError.statusCode).json({ message: customError.message });
    }
};