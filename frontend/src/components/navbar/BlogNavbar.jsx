import React, { useContext } from "react";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';  // Importa il contesto di autenticazione
import logo from "../../assets/logo.png";
import "./styles.css";

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);  // Usa il contesto per autenticazione e logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  // Usa la funzione logout dal contesto
    navigate('/login');  // Reindirizza alla pagina di login
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        
        {/* Navbar Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* Collapsible Navbar Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto me-2">
            <Nav.Link as={Link} to="/blogposts">Posts</Nav.Link>
            <Nav.Link as={Link} to="/authors">Authors</Nav.Link>

            {/* Se l'utente non è loggato, mostriamo Register e Login */}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}

            {/* Se l'utente è loggato, mostriamo Profilo e Logout */}
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/profile">Profilo</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          
          {/* Bottone per creare un nuovo articolo */}
          <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            Nuovo Articolo
          </Button>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
