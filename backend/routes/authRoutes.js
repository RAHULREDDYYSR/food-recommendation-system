import { register, login, logout } from "../controllers/authController.js";
import express from "express";
const app = express();

app.post('/register',register);//takes name, email and password
app.post('/login',login);//takes email and password
app.get('/logout',logout);//button on profile page

export default app;