import { Assignment } from "../models/assignment.models.js";
import { AssignmentCompleted } from "./../models/assignComplete.models.js";

export const addAssignment = async (req, res) => {
  try {
    const { title, body, task } = req.body;
    let assignment = await Assignment.create({
      title,
      body,
      task,
    });
    res.json({ message: "Assignment added", assignment });
  } catch (error) {
    console.log(error);
  }
};

export const allAssignment = async (req, res) => {
  try {
    let assignment = await Assignment.find().sort({ createdAt: -1 });
    res.json({ message: "All assignment", assignment });
  } catch (error) {
    console.log(error);
  }
};

// Get assignment by ID
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).send("Assignment not found");
    res.json(assignment);
  } catch (error) {
    console.log(error)
  }
};
export const enroll = async (req, res) => {
  try {
    
    const {userId} = req.body;
    // console.log(userId)
    if (!userId) {
      return res.status(401).send("User  not authenticated"); 
    }

    const assignment = await Assignment.findById(req.params.id);


    

  
    if (!assignment) {
      return res.status(404).send({message :"Assignment not found"});
    }
    let assign = await AssignmentCompleted.create({
      assignment_id: assignment._id,
      user_id: userId,
      title: assignment.title,
      body: assignment.body,
      task: assignment.task,
      status: false 
    });

    res.status(201).json(assign); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error"); 
  }
};

export const getAssignmentCompleted = async (req, res) => {
  const {assignmentId} = req.body;
  if (!assignmentId) {
    return res.status(404).json({ message: 'AssignmentId not found' });
  }
  const assignment = await AssignmentCompleted.findById(assignmentId);

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  assignment.status = true; 
  await assignment.save(); 
  res.status(200).json({ message: 'Assignment status updated successfully', assignment });


  try {
    
  } catch (error) {
    console.log(error)
  }
}


export const getEnrolledById = async (req, res)=>{
  const {assignmentId} = req.body;
  if (!assignmentId) {
    return res.status(404).json({ message: 'AssignmentId not found' });
  }
  const assignment = await AssignmentCompleted.findById(assignmentId);

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  res.status(200).json({ message: 'Assignment founded successfully', assignment });


  try {
    
  } catch (error) {
    console.log(error)
  }
}