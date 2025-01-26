import { FoodItems } from "../models/foodItems.js";
import { StatusCodes } from "http-status-codes";
import CustomError from '../errors/index.js';

export const getAllFoodItems = async (req, res) => {
  const foodItems = await FoodItems.find({});
  res.status(StatusCodes.OK).json({ foodItems, count: foodItems.length });
};

export const getSingleFoodItem = async (req, res) => {
  const foodItem = await FoodItems.findOne({ _id: req.params.id });
  
  if (!foodItem) {
    throw new CustomError.NotFoundError(`No food item with id: ${req.params.id}`);
  }
  
  res.status(StatusCodes.OK).json({ foodItem });
};

export const createFoodItem = async (req, res) => {
  const foodItem = await FoodItems.create(req.body);
  res.status(StatusCodes.CREATED).json({ foodItem });
};

export const updateFoodItem = async (req, res) => {
  const foodItem = await FoodItems.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!foodItem) {
    throw new CustomError.NotFoundError(`No food item with id: ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ foodItem });
};

export const deleteFoodItem = async (req, res) => {
  const foodItem = await FoodItems.findOne({ _id: req.params.id });

  if (!foodItem) {
    throw new CustomError.NotFoundError(`No food item with id: ${req.params.id}`);
  }

  await foodItem.deleteOne();
  res.status(StatusCodes.OK).json({ msg: 'Food item removed successfully' });
};


export const getFoodByNutrition = async (req, res) => {
  const { minProtein, maxCalories } = req.body;
  const queryObject = {};

  if (minProtein) {
    queryObject.protein = { $gte: Number(minProtein) };
  }

  if (maxCalories) {
    queryObject.calories = { $lte: Number(maxCalories) };
  }

  const foodItems = await FoodItems.find(queryObject);
  res.status(StatusCodes.OK).json({ foodItems, count: foodItems.length });
};