import { MoodFood } from "../models/moodFood.js";
import { User } from "../models/User.js";
import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { aiChat,getNearbyRestaurants, getMealTime } from "../utils/index.js";

export const recommendFood = async (req, res) =>{
    try {
        const userId = req.user.userId;
        const {longitude, latitude} = req.body
        const user = await User.findById(userId);
        const moodFood = await MoodFood.findOne({user:userId});
        if(!moodFood){
            throw new CustomError("MoodFood not found", StatusCodes.NOT_FOUND);
        }
        
        const mealTime = getMealTime();
        
        let systemPrompt = "you are personalized food recommender"
        systemPrompt += `you are provided with all the details of user: ${user}, current time: ${mealTime}`
        systemPrompt += `along with all the details of moodFood based on his history : ${moodFood}`
        systemPrompt += `and the location of the user longitude:${longitude} and latitude:${latitude}`
        let userPrompt =  " provide 3 food recommendations to the user using his data along with the proper image link of the recommended food and provide the location of the user"        
        let message = [
            {"role":"system","content":`${systemPrompt}`},
            {"role":"user","content":`${userPrompt}`}
        ]
        console.log(message);
        const result = await aiChat(message)
        console.log(result);
        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        res.status(StatusCodes.ERROR).json(error)
        
    }
}