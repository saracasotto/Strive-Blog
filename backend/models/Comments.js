// models/Comment.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Creazione del modello basato sullo schema
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
