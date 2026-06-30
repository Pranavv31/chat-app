import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'

export const protectRoute = async(req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized acccess"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized -Invalid token"})
        }
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.json({message:"Unauthorized -Invalid token"})
        }
        req.user = user;
        next()
    } catch (error) {
         console.log("error detected in protectRoute ", error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}