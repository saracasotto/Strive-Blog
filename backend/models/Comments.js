
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Definizione dello schema per i commenti
const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  // Aggiungi il timestamp
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true }); // Aggiungi l'opzione timestamps per gestire createdAt e updatedAt

// Creazione del modello basato sullo schema e definizione della collection
const Comment = mongoose.model('Comment', commentSchema, 'comments'); // La collection sarà chiamata "comments"

export default Comment;
