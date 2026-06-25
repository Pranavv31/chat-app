import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';
import { generateToken } from '../utils/utils.js';

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are mandatory",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save user
    await newUser.save();

    // Generate JWT Cookie
    generateToken(newUser._id, res);

    // Response
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });

  } catch (error) {
    console.log("Error in signup controller:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const Login = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordCorrect){
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        });

    } catch (error) {
        console.log("error detected", error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
};
export const Logout = async(req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.json({message:"Logged out successfully"})
    } catch (error) {
        console.log("error in logout controller",error);
        res.json({message:"internal server error"})
    }
}
export const updateprofile = async(req,res) => {
    try {
        const {profilePic} = req.body
        const userId = req.user._id;
    } catch (error) {
        
    }
}