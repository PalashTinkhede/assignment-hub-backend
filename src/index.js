import { default as bodyParser, default as express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';
import assignmentRouter from './routes/assignment.js';
import cookieParser from 'cookie-parser';
import middlewareRouter from './routes/middleware.js';
const app = express();
dotenv.config();
app.use(express.json()); 
app.use(cookieParser()); 

app.use(cors({
  origin:'https://assignment-hub-frotend.vercel.app/',
  methods:[ "GET","POST","PUT","DELETE"],
  credentials:true
}))

// home testing route
app.get('/',(req,res)=>res.json({messge:'This is home route'}))
app.use('/api/user',userRouter);
app.use('/api/assignment',assignmentRouter);
app.use('/api/middleware',middlewareRouter);





mongoose.connect(
  `${process.env.MONGODB_URI}`,{
    dbName:"clockwork"
  }
).then(()=>console.log("MongoDB Connected Succssfully...!")).catch((err)=>console.log(err));

const port = 3000;
app.listen(process.env.PORT,()=>console.log(`Server is running on port ${port}`))
