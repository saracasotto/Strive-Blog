import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    birthDate: '',
    avatar: ''
  });
  const [avatarFile, setAvatarFile] = useState(null); // Stato per l'avatar
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Stato per l'indicatore di caricamento
  const [avatarLoading, setAvatarLoading] = useState(false); // Stato per il caricamento dell'avatar
  const navigate = useNavigate();

  // Funzione per ottenere i dati dell'utente autenticato
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Inizia il caricamento
      try {
        const response = await fetch('http://localhost:5000/authors/auth/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Invia il token JWT
          },
        });
        const result = await response.json();
        if (response.ok) {
          setUserData(result); // Popoliamo i dati dell'utente
        } else {
          setErrorMessage('Errore nel recupero dei dati utente');
        }
      } catch (error) {
        setErrorMessage('Errore durante il caricamento dei dati utente');
      } finally {
        setLoading(false); // Termina il caricamento
      }
    };

    fetchUserData();
  }, []);

  // Funzione per gestire il cambiamento dei dati utente
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Funzione per inviare i dati aggiornati dell'utente
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/authors/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setSuccessMessage('Profilo aggiornato con successo!');
        // Reindirizza alla home dopo 2 secondi
        setTimeout(() => {
          navigate('/'); // Reindirizza alla home
        }, 2000);
      } else {
        setErrorMessage('Errore durante l\'aggiornamento del profilo');
      }
    } catch (error) {
      setErrorMessage('Errore durante l\'aggiornamento del profilo');
    }
  };

  // Funzione per gestire il caricamento dell'avatar
  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  // Funzione per aggiornare l'avatar
  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      setErrorMessage('Seleziona un file avatar prima di caricare.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', avatarFile); // Aggiungi il file avatar al formData

    setAvatarLoading(true); // Mostra il caricamento dell'avatar

    try {
      const response = await fetch('http://localhost:5000/authors/auth/me/avatar', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData, // Invia il form con il file
      });

      if (response.ok) {
        setSuccessMessage('Avatar aggiornato con successo!');
        const result = await response.json();
        setUserData({ ...userData, avatar: result.avatarUrl }); // Aggiorna l'avatar nello stato
      } else {
        const result = await response.json();
        setErrorMessage(`Errore durante l'aggiornamento dell'avatar: ${result.message}`);
      }
    } catch (error) {
      setErrorMessage('Errore durante l\'aggiornamento dell\'avatar');
    } finally {
      setAvatarLoading(false); // Nascondi il caricamento
    }
  };

  return (
    <Container className="mt-5">
      <h2>Profilo Utente</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <>

          {userData.avatar && (
            <Image
            src={userData.avatar}
            roundedCircle
            className="profile-avatar mb-3"
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />
          )}
          <Form.Group controlId="formAvatar">
            <Form.Label>Seleziona un nuovo avatar</Form.Label>
            <Form.Control type="file" onChange={handleAvatarChange} />
          </Form.Group>
          <Button variant="primary" onClick={handleAvatarUpload} className="mt-3">
            {avatarLoading ? <Spinner animation="border" size="sm" /> : 'Carica Avatar'}
          </Button>

          <hr />

          <Form onSubmit={handleProfileUpdate}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formSurname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={userData.surname}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBirthDate">
              <Form.Label>Data di Nascita</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={userData.birthDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Aggiorna Dati
            </Button>
          </Form>


        </>
      )}
    </Container>
  );
};

export default Profile;
