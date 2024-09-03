import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import NewBlogPost from "./views/new/New";
import BlogAuthorsList from "./components/blog/blog-author-list/BlogAuthorsList";
import AuthorDetails from "./components/blog/blog-author-details/AuthorDetails"
import BlogPosts from "./components/blog/blog-posts/BlogPosts";
import BlogPostDetails from "./components/blog/blog-post-details/BlogPostDetails"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UploadAvatar from "./components/blog/blog-avatar-uploads/UploadAvatar";
import UploadCover from "./components/blog/blog-avatar-uploads/UploadCover";
import CommentDetails from "./components/blog/blog-comments/CommentDetails";
import Register from "./components/blog/register-login/Register";
import Login from "./components/blog/register-login/Login";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Reindirizza la rotta principale alla pagina di Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
