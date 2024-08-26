import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const UploadAvatar = () => {
  const { id } = useParams(); // Ottieni l'id dell'autore dall'URL
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Aggiorna il file selezionato
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await fetch(`http://localhost:5000/authors/${id}/avatar`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("Avatar caricato con successo!");
        setError(null);
        // Naviga indietro o ad un'altra pagina se necessario
        setTimeout(() => {
          navigate(`/authors/${id}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
        setSuccess(null);
      }
    } catch (error) {
      setError(`Error uploading avatar: ${error.message}`);
      setSuccess(null);
    }
  };

  return (
    <Container className="upload-avatar-container">
      <h2>Carica il tuo Avatar</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form>
        <Form.Group>
          <Form.Label>Seleziona un'immagine</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button onClick={handleUpload} variant="primary" className="mt-3">
          Carica Avatar
        </Button>
      </Form>
    </Container>
  );
};

export default UploadAvatar;
