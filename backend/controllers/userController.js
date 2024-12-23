import { User } from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import CustomError from '../errors/index.js'


export const getAllUsers = async (req, res) =>{
    console.log(req.user);
    
    const users = await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({users})
}
export const getSingleUser = async (req, res) =>{
    const user = await User.findOne({_id:req.params.id}).select('-password');
    if(!user){
        throw new CustomError.NotFoundError(`no user with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({user})
}
export const showCurrentUser = async (req, res) =>{
    res.send(' show current user')
}
export const updateUser = async (req, res) =>{
    res.send(' update user')
}
export const updateUserPassword = async (req, res) =>{
    res.send(' update user password')
}