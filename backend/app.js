import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import morgan from 'morgan';
import 'express-async-errors'
import cookieParser from 'cookie-parser';
import { connectDB } from './db/connect.js';
const app = express();
//router routes
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import foodRouter from './routes/moodFoodRouter.js'
import foodItemRouter from './routes/foodItemRoutes.js'
import recommendation from './routes/recommendationRoutes.js'

import { aiChat } from './utils/aiRecommendation.js';


//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'


app.use(express.static('public'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser(process.env.JWT_SECRET))  //signing cookie

app.get('/api/v1',(req, res)=>{
    //  console.log(req.cookies);
    console.log(req.signedCookies);//since we are using cookie-parser middleware with sign
    
    res.send('hi there!! ')
})


app.use('/api/v1/auth',authRouter);
app.use('/api/v1/moodFood',foodRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/foodItem',foodItemRouter);
app.use('/api/v1/food/recommend',recommendation)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)
const port =  process.env.PORT || 7777

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening at ${port}`))
    } catch (error) {
        console.log(error)
        
    }
}

// let system_message = "You are an assistant that is great at telling jokes"
// let user_prompt = "Tell a light-hearted joke for an audience of Data Scientists"
// let prompts = [
//     {"role": "system", "content": system_message},
//     {"role": "user", "content": user_prompt}
//   ]
// const result = await aiChat(prompts)
// console.log(result)

// Usage
// const mealData = getMealTime();
// console.log(mealData.message); 
// console.log('Meal type:', mealData.meal);
start()
