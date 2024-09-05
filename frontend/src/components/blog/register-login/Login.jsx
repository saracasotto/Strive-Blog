import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');  // Controlla se l'utente è autenticato

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');  // Reindirizza alla home se già loggato
    }
  }, [isAuthenticated, navigate]);

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
        navigate('/');  // Reindirizza alla home
      } else {
        // Gestisci errori di login
        console.error('Login failed:', result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Container fluid="sm" className='mt-3'>
      {!isAuthenticated ? (
        <>
          <h1>Accedi per poter visualizzare il contenuto</h1>
          <h2 className='mt-5'>Login</h2>
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
        </>
      ) : (
        <Alert variant="success">
          Sei già loggato!
        </Alert>
      )}
    </Container>
  );
};

export default Login;
