import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import './styles.css';

const AuthorDetails = () => {
  const { id } = useParams(); // Ottieni l'id dell'autore dall'URL
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/authors/${id}`);
        const data = await response.json();
        console.log('Dati dell\'autore:', data);
        setAuthor(data);
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    };

    fetchAuthor();
  }, [id]);

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Card className="author-detail-card">
        <div className="image-container">
          <Card.Img variant="top" src={author.avatar} />
        </div>
        <Card.Body>
          <Card.Title>{`${author.name} ${author.surname}`}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {author.email}
          </Card.Text>
        </Card.Body>
      </Card>

      <h3 className="mt-4">Blog Posts</h3>
      <Row>
        {author.blogPosts && author.blogPosts.length > 0 ? (
          author.blogPosts.map(post => {
            console.log('Post:', post);
            return (
              <Col lg={4} key={post._id}>
                <Card className="mb-4">
                  <Card.Img variant="top" src={post.cover || 'default-image.jpg'} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                    <Link to={`/blogposts/${post._id}`}>
                      <Button variant="primary">Leggi di più</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <p>Nessun post disponibile</p>
        )}
      </Row>
    </Container>
  );
};


export default AuthorDetails;
