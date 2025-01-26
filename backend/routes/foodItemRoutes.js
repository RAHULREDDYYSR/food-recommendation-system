import express from 'express';
import {
  getAllFoodItems,
  getSingleFoodItem,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getFoodByNutrition
} from '../controllers/foodItemsController.js';
import {authenticateUser, authorizePermission} from '../middleware/authentication.js'
const app = express();


app.route('/')
  .get(authenticateUser,authorizePermission('admin'),getAllFoodItems)
  .post(authenticateUser,authorizePermission('admin'), createFoodItem);

app.route('/nutrition').get(authenticateUser,authorizePermission('admin'),getFoodByNutrition);

app.route('/:id')
  .get(authenticateUser,authorizePermission('admin'),getSingleFoodItem)
  .patch(authenticateUser,authorizePermission('admin'), updateFoodItem)
  .delete(authenticateUser,authorizePermission('admin'),deleteFoodItem);

export default app;