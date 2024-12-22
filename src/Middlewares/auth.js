import jwt from "jsonwebtoken";
import { User } from "./../models/User.models.js";
export const Authenticated = (req, res, next) => {
  
  const token = req.cookies.access_token; 
  if (!token) return res.sendStatus(401); 

  jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, user) => {
    if (err) return res.sendStatus(403); 
    req.user = user; 
    next(); 
  });
};


