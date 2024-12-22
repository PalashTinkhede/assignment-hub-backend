import { User } from "./../models/User.models.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { AssignmentCompleted } from "../models/assignComplete.models.js";



export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user)
        return res.json({ message: "User Already exist ", success: false });
      const hashPass = await bcrypt.hash(password, 10);
      user = await User.create({ name, email, password: hashPass });
      res.json({
        message: "User register successfully...! ",
        user,
        success: true,
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };

 export const login = async (req, res) => {
    const { email, password } = req.body; 
  
    let user = await User.findOne({ email });
   
    
     
      const token = jwt.sign({ userId: user._id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: "1h" });
  
     
      res.cookie("access_token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        maxAge: 3600000, 
        sameSite: "Strict",
      });
  
      return res.status(200).json({ message: "Logged in successfully!", success: true, user });
    
  
  };

  export const profile = async (req, res)=>{
    try {
      const { userId } = req.body; 
  // console.log(userId)
      if (!userId) {
        // console.log("loginnnnnnn")
        return res.status(400).json({ message: "Please login" }); 
      }
  
     
      const assignments = await AssignmentCompleted.find({ user_id: userId });
 
      if (assignments.size === 0) {
        return res.status(404).json({ message: "No assignments found for this user" });
      }
  
      // console.log(assignments)
      res.status(200).json(assignments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" }); 
    }
  }