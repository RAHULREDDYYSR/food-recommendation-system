import express from "express";
const app = express();
import { NearbyRestaurants } from "../controllers/nearByRestaurantsController.js";
import {authenticateUser, authorizePermission} from '../middleware/authentication.js'


app.get('/',authenticateUser,NearbyRestaurants)


export default app;