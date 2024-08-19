import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import "./styles.css";


const BlogAuthorsList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://localhost:3002/authors');
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  return (
      <Row className="blog-author-row">
        {authors.map((author) => (
          <Col sm={6} md={4} key={author._id}>
            <Card className="author-card">
              <Card.Img variant="top" src={author.avatar}/>
              <Card.Body>
                <Card.Title>{`${author.name} ${author.surname}`}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {author.email}
                </Card.Text>
                <Card.Text>
                  <strong>Birth Date:</strong> {author.birthDate}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
  );
};

export default BlogAuthorsList;