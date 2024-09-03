import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      console.log('Login successful:', result);
      // Salva il token JWT in locale
      localStorage.setItem('token', result.token);
      // Puoi gestire la risposta come necessario
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Container fluid="sm" className='mt-5'>
      <h2>Login</h2>
      <Form onSubmit={handleLoginSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={loginData.email}
            onChange={handleLoginChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3'>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
