import { register, login } from "../controllers/authController.js";
import express from "express";
const app = express();

app.post('/register',register);
app.post('/login',login);
export default app;