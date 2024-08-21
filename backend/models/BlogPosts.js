import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BlogPostSchema = new Schema({
  category: "string",
  title: "string",
  cover: "string",
  readTime: {
    value: "number",
    unit: "string",
  },
  author: "string",
  content: "string",
});

const BlogPost = model("BlogPost", BlogPostSchema);

export default BlogPost;
