import React, { useContext, useState } from "react";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';  // Importa il contesto di autenticazione
import logo from "../../assets/logo.png";
import "./styles.css";

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Usa il contesto per autenticazione e logout
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false); // Stato per gestire il collapse

  const handleLogout = () => {
    logout(); // Usa la funzione logout dal contesto
    navigate('/login'); // Reindirizza alla pagina di login
    setExpanded(false); // Chiude la navbar
  };

  const handleLinkClick = () => {
    setExpanded(false); // Chiude la navbar al click di un link
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleLinkClick}>
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)} // Toggles navbar
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto me-2">
            <Nav.Link as={Link} to="/blogposts" onClick={handleLinkClick}>
              Posts
            </Nav.Link>
            <Nav.Link as={Link} to="/authors" onClick={handleLinkClick}>
              Authors
            </Nav.Link>

            {/* Se l'utente non è loggato, mostriamo Register e Login */}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/register" onClick={handleLinkClick}>
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login" onClick={handleLinkClick}>
                  Login
                </Nav.Link>
              </>
            )}

            {/* Se l'utente è loggato, mostriamo Profilo e Logout */}
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/profile" onClick={handleLinkClick}>
                  Profilo
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>

          {/* Bottone per creare un nuovo articolo */}
          <Button
            as={Link}
            to="/new"
            className="blog-navbar-add-button bg-dark"
            size="sm"
            onClick={handleLinkClick}
          >
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
