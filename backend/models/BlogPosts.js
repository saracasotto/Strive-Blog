import mongoose from 'mongoose';
const { Schema } = mongoose;

const BlogPostSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  cover: { type: String, required: true },
  readTime: {
    value: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  author: { type: String, required: true },
  content: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] // Referencing Comments

});

// Creazione del modello basato sullo schema
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

export default BlogPost;
