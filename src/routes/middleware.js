import { Authenticated } from "../Middlewares/auth.js";
import express from 'express';
const router = express.Router();


router.get("/protected", Authenticated, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});


export default router