import express from 'express'
import {  login, profile, register } from './../controllers/user.js';
import { Authenticated } from "../Middlewares/auth.js";
const router = express.Router();

// register user
router.post('/register',register) //=> /api/user/register

// login user
router.post('/login',login)



// get user profile
router.post("/profile" , profile);

export default router