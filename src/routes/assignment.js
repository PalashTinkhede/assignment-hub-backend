import express from 'express'
import { addAssignment, allAssignment, enroll, getAssignmentById, getAssignmentCompleted, getEnrolledById } from '../controllers/assignment.js';
import { Authenticated } from '../Middlewares/auth.js';

const router = express.Router();



// add assignment
router.post('/add' ,Authenticated , addAssignment);

// get all assignment
router.get('/all'  ,allAssignment);



//get specific assignment
router.get('/:id'  ,getAssignmentById);


//enroll 
router.post("/enroll/:id"  , enroll)

//status
router.post("/status", getAssignmentCompleted )

//enrolled assignemt details
router.post("/enrolled" , getEnrolledById )

export default router