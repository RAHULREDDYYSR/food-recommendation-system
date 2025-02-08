import express from "express";
const app = express();
import { NearbyRestaurants } from "../controllers/nearByRestaurantsController.js";
import {authenticateUser, authorizePermission} from '../middleware/authentication.js'


app.get('/',authenticateUser,NearbyRestaurants) // to find the nearest restaurant using the current location ?(latitude and longitude) of the user and the desired food item

export default app;