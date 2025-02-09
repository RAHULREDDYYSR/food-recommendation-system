import { recommendFood } from "../controllers/recommendationController.js";
import {authenticateUser, authorizePermission} from '../middleware/authentication.js'


import express from "express";
const app = express();

app.post('/',authenticateUser,recommendFood) // to call the ai to recommend the food items, it takes user mood food history, time, location and users preferences

export default app;