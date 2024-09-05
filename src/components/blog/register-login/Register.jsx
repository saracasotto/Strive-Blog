import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    birthDate: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [authorId, setAuthorId] = useState(null);
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
      const response = await fetch('http://localhost:5000/authors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Registration successful:', result);
        setAuthorId(result.author._id); // Memorizza l'ID dell'autore
        setShowModal(true); // Mostra il modale per confermare la registrazione
      } else {
        console.error('Registration failed:', result);
        // Gestisci l'errore come necessario
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/login'); // Reindirizza alla pagina di login quando il modale viene chiuso
  };

  return (
    <Container fluid="sm" className='mt-5'>
      <h2>Register</h2>
      <Form onSubmit={handleRegisterSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={registerData.name}
            onChange={handleRegisterChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            placeholder="Enter surname"
            value={registerData.surname}
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

        <Form.Group controlId="formBasicBirthDate">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control
            type="date"
            name="birthDate"
            placeholder="Enter birth date"
            value={registerData.birthDate}
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
        <Modal.Body>Your registration was successful! You can now upload your avatar.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Go to Login
          </Button>
          <Button variant="primary" onClick={() => navigate(`/upload-avatar/${authorId}`)}>
            Upload Avatar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};


export default Register