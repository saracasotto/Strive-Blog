import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import './styles.css';


const AuthorDetails = () => {
  const { id } = useParams(); // Ottieni l'id dell'autore dall'URL
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/authors/${id}`);
        const data = await response.json();
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
    <Container className="author-details-container">
      <Card className="author-detail-card">
        <Card.Img variant="top" src={author.avatar} />
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
    </Container>
  );
};

export default AuthorDetails;
