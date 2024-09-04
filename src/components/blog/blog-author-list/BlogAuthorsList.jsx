import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css'

const BlogAuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Per verificare se ci sono più autori da caricare
  const limit = 10; // Numero di autori per pagina

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(`http://localhost:5000/authors?_page=${page}&_limit=${limit}`);
        const data = await response.json();

        // Aggiorna lo stato con i nuovi autori
        setAuthors((prevAuthors) => [...prevAuthors, ...data.authors]);

        // Controlla se ci sono più autori da caricare
        if (data.authors.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, [page]); // Ricarica quando cambia la pagina

  const loadMoreAuthors = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Container  className='mt-5'>
      <Row className="blog-author-row">
        {authors.map((author) => (
          <Col sm={6} md={4} xl={3} key={author._id}>
            <Link to={`/authors/${author._id}`} style={{ textDecoration: 'none' }}>
              <Card className="author-card">
                <div className="image-container">
                  <Card.Img variant="top" src={author.avatar} />
                </div>
                <Card.Body>
                  <Card.Title>{`${author.name} ${author.surname}`}</Card.Title>
                  <Card.Text>
                    {author.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Birth Date:</strong> {author.birthDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      {hasMore && (
        <div className="d-flex justify-content-center my-4">
          <Button onClick={loadMoreAuthors}>Carica Altro</Button>
        </div>
      )}
    </Container>
  );
};

export default BlogAuthorsList;
