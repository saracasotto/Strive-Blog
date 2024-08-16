import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogAuthor from "../blog-author/BlogAuthor";

const BlogAuthorsList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/authors")
      .then((response) => response.json())
      .then((data) => setAuthors(data))
      .catch((error) => console.error("Error fetching authors:", error));
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Authors List</h2>
        </Col>
      </Row>
      <Row>
        {authors.map((author) => (
          <Col xs={12} md={6} lg={4} key={author._id} className="mb-4">
            <BlogAuthor name={`${author.name} ${author.surname}`} avatar={author.avatar} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BlogAuthorsList;
