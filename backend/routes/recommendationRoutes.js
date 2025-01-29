import { recommendFood } from "../controllers/recommendationController.js";
import {authenticateUser, authorizePermission} from '../middleware/authentication.js'


import express from "express";
const app = express();

app.get('/',authenticateUser,recommendFood)

export default app;