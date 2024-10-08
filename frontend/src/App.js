import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import NewBlogPost from "./views/new/New";
import BlogAuthorsList from "./components/blog/blog-author-list/BlogAuthorsList";
import AuthorDetails from "./components/blog/blog-author-details/AuthorDetails";
import BlogPosts from "./components/blog/blog-posts/BlogPosts";
import BlogPostDetails from "./components/blog/blog-post-details/BlogPostDetails";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UploadAvatar from "./components/blog/blog-avatar-uploads/UploadAvatar";
import UploadCover from "./components/blog/blog-avatar-uploads/UploadCover";
import Register from "./components/blog/authentication/Register";
import Login from "./components/blog/authentication/Login";
import ProtectedRoute from "./components/blog/authentication/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Container } from "react-bootstrap";
import Logout from "./components/blog/authentication/Logout";
import Profile from "./components/blog/authentication/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Container fluid="sm">
          <Routes>
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<ProtectedRoute element={<Logout />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/new" element={<ProtectedRoute element={<NewBlogPost />} />} />
            <Route path="/blogposts" element={<ProtectedRoute element={<BlogPosts />} />} />
            <Route path="/blogposts/:id" element={<ProtectedRoute element={<BlogPostDetails />} />} />
            <Route path="/authors" element={<ProtectedRoute element={<BlogAuthorsList />} />} />
            <Route path="/authors/:id" element={<ProtectedRoute element={<AuthorDetails />} />} />
            <Route path="/authors/:id/avatar" element={<ProtectedRoute element={<UploadAvatar />} />} />
            <Route path="/blogposts/:id/cover" element={<ProtectedRoute element={<UploadCover />} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  );
}


export default App;
