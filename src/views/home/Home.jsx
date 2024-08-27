import React from "react";
import { Container } from "react-bootstrap";
import "./styles.css";
import BlogPosts from "../../components/blog/blog-posts/BlogPosts"

const Home = props => {
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <BlogPosts />
    </Container>
  );
};

export default Home;
