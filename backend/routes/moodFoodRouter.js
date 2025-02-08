import express from 'express';
const app = express();
import { createMoodFood, updateMoodFood, deleteMoodFood, getAllMoodFoods, currentMoodFood ,getSingleMoodFood } from '../controllers/foodController.js';
import {authenticateUser, authorizePermission} from '../middleware/authentication.js'

app.get('/',authenticateUser,currentMoodFood) // to view current user  mood food 
app.post('/create',authenticateUser,createMoodFood) // to create current user mood food

app.get('/getSingleMoodFood/:id',authenticateUser,authorizePermission('admin'),getSingleMoodFood) // to view mood food by the admin using user id

app.get('/getAllMoodFoods',authenticateUser,authorizePermission('admin'),getAllMoodFoods) // to view all the users mood food
app.patch('/:id',authenticateUser,updateMoodFood) // to updated mood food of the current user
app.delete('/:id',authenticateUser,authorizePermission('admin'),deleteMoodFood) // to delete mood food of a user by his id by admin
export default app;