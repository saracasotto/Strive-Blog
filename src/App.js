import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import BlogAuthorsList from "./components/blog/blog-author-list/BlogAuthorsList";
import AuthorDetails from "./components/blog/blog-author-details/AuthorDetails"
import BlogPosts from "./components/blog/blog-posts/BlogPosts";
import BlogPostDetails from "./components/blog/blog-post-details/BlogPostDetails"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadAvatar from "./components/blog/blog-avatar-uploads/UploadAvatar";
import UploadCover from "./components/blog/blog-avatar-uploads/UploadCover";
import CommentDetails from "./components/blog/blog-comments/CommentDetails";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
        <Route path="/blogposts" element={<BlogPosts />} />
        <Route path="/blogposts/:id" element={<BlogPostDetails />} />
        <Route path="/authors" element={<BlogAuthorsList />} />
        <Route path="/authors/:id" element={<AuthorDetails />}/>
        <Route path="/authors/:id/avatar" element={<UploadAvatar />} />
        <Route path="/blogposts/:id/cover" element={<UploadCover />} />
        <Route path="/blogposts/:id/comments/:commentId" element={<CommentDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
