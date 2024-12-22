import express from 'express';
const app = express();
import { createMoodFood, updateMoodFood, deleteMoodFood, getAllMoodFoods  } from '../controllers/foodController.js';

app.post('/create',createMoodFood)
app.patch('/update',updateMoodFood)
app.delete('/delete',deleteMoodFood)
app.get('/getAllMoodFoods',getAllMoodFoods)

export default app;