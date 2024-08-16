import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AuthorSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthDate: { type: String, required: true },
  avatar: { type: String, required: true }
});

const Author = model('Author', AuthorSchema);

export default Author;
