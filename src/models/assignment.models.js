import mongoose, {Schema} from 'mongoose';


const assignmentSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required : true },
  task: { type: String, required : true },
  created_at: { type: Date, default: Date.now }
});


export const Assignment = mongoose.model('Assignment', assignmentSchema);
