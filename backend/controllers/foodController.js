import { MoodFood } from "../models/moodFood.js";
import { User } from "../models/User.js";
import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
export const createMoodFood = async (req, res)=>{
    req.body.user = req.body.userId
    const moodFood = await MoodFood.create(req.body)
    res.status(StatusCodes.CREATED).json(moodFood)
}

export const  updateMoodFood = async (req, res) =>{
    const {id: moodFoodId} = req.params
    const moodFood = await MoodFood.findOneAndUpdate({_id:moodFoodId},
        req.body, {runValidators: true}
    )
    if(!moodFood) {
        throw new CustomError.NotFoundError('moodFood not found')
    }
    res.status(StatusCodes.OK).json(moodFood)
}

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