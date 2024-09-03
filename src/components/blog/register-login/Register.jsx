import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: ''
  });

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
      console.log('Registration successful:', result);
      // Puoi gestire la risposta come necessario
    } catch (error) {
      console.error('Error during registration:', error);
    }
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
    </Container>
  );
};

export default Register;
