import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Registration successful:', result);
        setShowModal(true);  // Mostra il modale se la registrazione è avvenuta con successo
      } else {
        console.error('Registration failed:', result);
        // Puoi gestire l'errore come necessario
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/login');  // Reindirizza alla pagina di login quando il modale viene chiuso
  };

  return (
    <Container fluid="sm" className='mt-5'>
      <h2>Register</h2>
      <Form onSubmit={handleRegisterSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={registerData.username}
            onChange={handleRegisterChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={registerData.email}
            onChange={handleRegisterChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={handleRegisterChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3'>
          Register
        </Button>
      </Form>

      {/* Modale per confermare la registrazione avvenuta con successo */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your registration was successful! You can now log in.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Register;
