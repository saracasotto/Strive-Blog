import React, { useState, useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";  // Contesto di autenticazione
import { useNavigate } from 'react-router-dom';

const NewBlogPost = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Categoria 1");
  const [content, setContent] = useState("");  // Usare una stringa per il Markdown
  const [cover, setCover] = useState("");
  const [readTime, setReadTime] = useState({ value: 5, unit: "min" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Devi essere loggato per creare un post");
      return;
    }

    const userId = localStorage.getItem('userId');  // Ottieni l'ID utente loggato

    const postData = {
      title,
      category,
      cover,
      readTime,
      content,  // Questo è ora Markdown
      authorId: userId  // Usa l'ID dell'utente loggato
    };

    try {
      const response = await fetch('http://localhost:5000/blogposts/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        navigate('/blogposts');
      } else {
        const error = await response.json();
        console.error("Errore nella creazione del post:", error.message);
      }
    } catch (error) {
      console.error("Errore di rete:", error);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-cover" className="mt-3">
          <Form.Label>Immagine di Copertura</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL dell'immagine di copertura"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-readtime" className="mt-3">
          <Form.Label>Tempo di Lettura</Form.Label>
          <Form.Control
            type="number"
            placeholder="Tempo di lettura (in minuti)"
            value={readTime.value}
            onChange={(e) => setReadTime({ ...readTime, value: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Scrivi il tuo post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
