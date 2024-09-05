import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);  // Stato per l'alert di successo
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');  // Controlla se l'utente è autenticato

  useEffect(() => {
    if (isAuthenticated) {
      setShowModal(true);  // Mostra il modale se l'utente è già loggato
    }
  }, [isAuthenticated]);

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/authors/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token);  // Salva il token nel localStorage
        setShowSuccessAlert(true);  // Mostra l'alert di successo
        setTimeout(() => {
          navigate('/');  // Reindirizza alla home dopo 2 secondi
        }, 2000);  // Aspetta 2 secondi prima di reindirizzare
      } else {
        setErrorMessage(result.message);  // Mostra l'errore se il login fallisce
      }
    } catch (error) {
      setErrorMessage('Error during login, please try again.');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/');  // Reindirizza alla home quando il modale si chiude
  };

  return (
    <Container fluid="sm" className='mt-3'>
      {!isAuthenticated ? (
        <>
          <h1>Accedi per poter visualizzare il contenuto</h1>
          <h2 className='mt-5'>Login</h2>
          
          {showSuccessAlert && (
            <Alert variant="success">
              Login avvenuto con successo!
            </Alert>
          )}

          {errorMessage && (
            <Alert variant="danger">
              {errorMessage}
            </Alert>
          )}

          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className='mt-3'>
              Login
            </Button>
          </Form>
        </>
      ) : (
        <Alert variant="success">
          Sei già loggato!
        </Alert>
      )}

      {/* Modale per "Sei già loggato!" */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sei già loggato!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei già loggato. Vuoi tornare alla homepage?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Torna alla Home
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;
