import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import morgan from 'morgan';

import { connectDB } from './db/connect.js';
const app = express();
import authRouter from './routes/authRoutes.js'

//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

app.use(express.json())
app.use(express.static('public'))
app.use(morgan('tiny'))

app.get('/api/v1',(req, res)=>{
    res.send('hi there!! ')
})


app.use('/api/v1/auth',authRouter);



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

start()