import { MoodFood } from "../models/moodFood.js";
import { User } from "../models/User.js";
import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";


export const createMoodFood = async (req, res) => {
    try {
        const userId = req.user.userId;
        const moodFood = await MoodFood.create({
            ...req.body,
            user: userId
        });
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: moodFood
        });        
    } catch (error) {
        
        if (error.code === 11000) {
            throw new CustomError.ConflictError('User can only have one MoodFood profile');
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            throw new CustomError.BadRequestError(messages.join(', '));
        }
        throw error;
    }
};

export const currentMoodFood = async (req, res) =>{
    const userId = req.user.userId
    const moodFood = await MoodFood.findOne({ user: userId });
    if (!moodFood) {
        throw new CustomError.BadRequestError('User does not have a MoodFood profile');}
        res.status(StatusCodes.OK).json(moodFood)
}

export const updateMoodFood = async (req, res) => {
    const { id: moodFoodId } = req.params;
    const userId = req.user.userId;
    
    const moodFood = await MoodFood.findOneAndUpdate(
        { 
            _id: moodFoodId,
            user: userId 
        },
        req.body,
        { 
            new: true,
            runValidators: true
        }
    );
    if (!moodFood) {
        throw new CustomError.NotFoundError('MoodFood profile not found or you are not authorized');
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: moodFood
    });
};

export const deleteMoodFood = async (req, res) =>{
    const {id: moodFoodId} = req.params
    const result  = await MoodFood.findOne({_id:moodFoodId})
    if(!result){
        throw new CustomError.NotFoundError(" moodFood not found")
    }
    await result.deleteOne()
    res.status(StatusCodes.OK).json({msg:'moodFood deleted successfully'})
}

export const getAllMoodFoods = async (req, res) =>{
    const moodFoods = await MoodFood.find()
    res.status(StatusCodes.OK).json({moodFoods,count:moodFoods.length})
}

export const getSingleMoodFood = async (req, res) =>{
    const {id: moodFoodId} = req.params
    const moodFood = await MoodFood.findOne({_id:moodFoodId})
    if(!moodFood){
        throw new CustomError.NotFoundError('MoodFood profile not found')}
    res.status(StatusCodes.OK).json(moodFood)
}