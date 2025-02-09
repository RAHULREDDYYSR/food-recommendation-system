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
    console.log(req.user);
    
    res.status(StatusCodes.OK).json({user:req.user})
}
export const updateUser = async (req, res) =>{
    console.log(req.user);
    
    const user = await User.findOneAndUpdate({_id:req.user.userId}, req.body, {new:true, runValidators:true});
    if(!user){
        throw new CustomError.NotFoundError(`no user with id : ${req.user._id}`);
        }
        await user.save();
        res.status(StatusCodes.OK).json({user})
}
export const updateUserPassword = async (req, res) =>{
   const {oldPassword, newPassword} = req.body;
   if(!oldPassword || !newPassword){
    throw new CustomError.BadRequestError('please provide old and new password')
   }
   const user = await User.findOne({_id:req.user.userId});
   const isPasswordCorrect = await user.comparePassword(oldPassword);
   if(!isPasswordCorrect){
    throw new CustomError.UnauthorizedError('old password is incorrect')
   }
   user.password = newPassword;
   await user.save();
   res.status(StatusCodes.OK).json({msg:'password updated successfully'})
}