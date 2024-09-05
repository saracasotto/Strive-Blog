
import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true }); 


const Comment = mongoose.model('Comment', commentSchema, 'comments'); 

export default Comment;
