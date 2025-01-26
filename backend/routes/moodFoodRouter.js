import express from 'express';
const app = express();
import { createMoodFood, updateMoodFood, deleteMoodFood, getAllMoodFoods, currentMoodFood ,getSingleMoodFood } from '../controllers/foodController.js';
import {authenticateUser, authorizePermission} from '../middleware/authentication.js'

app.get('/',authenticateUser,currentMoodFood)
app.post('/create',authenticateUser,createMoodFood)

app.get('/getSingleMoodFood/:id',authenticateUser,authorizePermission('admin'),getSingleMoodFood)

app.get('/getAllMoodFoods',authenticateUser,authorizePermission('admin'),getAllMoodFoods)
app.patch('/:id',authenticateUser,updateMoodFood)
app.delete('/:id',authenticateUser,authorizePermission('admin'),deleteMoodFood)
export default app;