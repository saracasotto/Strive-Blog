import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AuthorSchema = new Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dataNascita: { type: String, required: true },
  avatar: { type: String, required: true }
});

const Author = model('Author', AuthorSchema);

export default Author;
