import CustomError from '../errors/index.js'
import { isTokenValid, createTokenUser } from '../utils/index.js'

export const authenticateUser = async (req,res,next) =>{
    const token = req.signedCookies.token
    if(!token){
      throw new CustomError
        .UnauthenticatedError(`Authentication Invalid`)
    }
    try {
        const {name, userId, role} = isTokenValid({token});
        
        req.user = {name, userId, role};
        //attach the user data to the request object
        next()
    } catch (error) {
      throw new CustomError.UnauthenticatedError('Authentication invalid')
    }
    
}
export const authorizePermission = (...roles)=>{
  return (req, res, next)=>{
    if(!roles.includes(req.user.role)){
      throw new CustomError.UnauthorizedError('Unauthorized to access to this route')
    }
    next()
  }
  
}