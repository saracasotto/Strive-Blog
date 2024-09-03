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
  const isAuthenticated = !!localStorage.getItem('token');  // Controlla se l'utente è autenticato

  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Se non autenticato, reindirizza sempre alla pagina di login */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Tutte le altre rotte private richiedono autenticazione */}
        <Route path="/new" element={isAuthenticated ? <NewBlogPost /> : <Navigate to="/login" />} />
        <Route path="/blogposts" element={isAuthenticated ? <BlogPosts /> : <Navigate to="/login" />} />
        <Route path="/blogposts/:id" element={isAuthenticated ? <BlogPostDetails /> : <Navigate to="/login" />} />
        <Route path="/authors" element={isAuthenticated ? <BlogAuthorsList /> : <Navigate to="/login" />} />
        <Route path="/authors/:id" element={isAuthenticated ? <AuthorDetails /> : <Navigate to="/login" />} />
        <Route path="/authors/:id/avatar" element={isAuthenticated ? <UploadAvatar /> : <Navigate to="/login" />} />
        <Route path="/blogposts/:id/cover" element={isAuthenticated ? <UploadCover /> : <Navigate to="/login" />} />
        <Route path="/blogposts/:id/comments/:commentId" element={isAuthenticated ? <CommentDetails /> : <Navigate to="/login" />} />
        {/* Reindirizza qualsiasi altra rotta alla pagina di login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
