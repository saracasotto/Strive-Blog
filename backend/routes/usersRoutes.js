import express from 'express';
import { register, login, me } from '../controllers/usersController.js';
import authorization from '../middlewares/authorization.js';

const router = express.Router();

// Endpoint per la registrazione di un nuovo utente
router.post('/register', register);

// Endpoint per il login
router.post('/login', login);

// Endpoint per ottenere i dati dell'utente autenticato
router.get('/me', authorization, me);

export default router;