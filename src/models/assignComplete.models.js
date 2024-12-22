import mongoose, {Schema} from 'mongoose';

const assignmentCompletedSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String,  required:true },
    task: { type: String,  required:true },
    user_id: { type: mongoose.Types.ObjectId , ref: 'User' , required : true },
    assignment_id: { type: mongoose.Types.ObjectId, ref: 'Assignment', required : true },
    status: { type: Boolean, required: true, default: false },
    created_at: { type: Date, default: Date.now }
  });

export const AssignmentCompleted = mongoose.model('AssignmentCompleted', assignmentCompletedSchema);
