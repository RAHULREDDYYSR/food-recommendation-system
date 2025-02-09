import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

export const createJWT = ({ payload }) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
  };
  
export const isTokenValid = ({token}) => jwt.verify(token, process.env.JWT_SECRET)
// do not use { jwt.verify(.....)} it cant be destructured  

export const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user });
    const oneDay = 1000 * 60 * 60 * 24;
  
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production", // Secure in production
      signed: true,
      sameSite: "strict", // Prevents CSRF
    });
  };
  
