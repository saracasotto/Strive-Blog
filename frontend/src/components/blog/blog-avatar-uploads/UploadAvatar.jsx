import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';

const UploadAvatar = () => {
  const { id } = useParams(); // Ottieni l'id dell'autore dall'URL
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Stato per l'indicatore di caricamento
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Per favore, seleziona un file da caricare.");
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    setLoading(true); // Mostra indicatore di caricamento
    setError(null); // Resetta eventuali errori precedenti

    try {
      const response = await fetch(`http://localhost:5000/authors/auth/me/avatar`, {
        method: 'PATCH',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setSuccess("Avatar caricato con successo!");
        setTimeout(() => {
          navigate(`/authors/${id}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(`Errore: ${errorData.message}`);
      }
    } catch (error) {
      setError(`Errore durante il caricamento dell'avatar: ${error.message}`);
    } finally {
      setLoading(false); // Nascondi indicatore di caricamento
    }
  };

  return (
    <Container fluid="sm" className="mt-5">
      <h2>Carica il tuo Avatar</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form>
        <Form.Group>
          <Form.Label>Seleziona un'immagine</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button onClick={handleUpload} variant="primary" className="mt-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Carica Avatar"}
        </Button>
      </Form>
    </Container>
  );
};

export default UploadAvatar;
