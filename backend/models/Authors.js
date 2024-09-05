import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AuthorSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Aggiunto per l'autenticazione
  avatar: { type: String},
  birthDate: { type: String, required: true },
  blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],  // Relazione con i post
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]     // Relazione con i commenti
}, 
{ timestamps: true });  // Per avere createdAt e updatedAt automaticamente

const Author = model('Author', AuthorSchema, 'authors');

export default Author;
