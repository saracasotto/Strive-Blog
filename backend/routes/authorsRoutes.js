import express from 'express';
import upload from '../config/multerConfig.js';
import authorization from '../middlewares/authorization.js'; // Middleware per autenticazione

import {
  getAuthors,
  getAuthorById,
  registerAuthor,
  loginAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  deleteAllAuthors,
  uploadAuthorAvatar,
  updateProfile,
  deleteProfile,
  me
} from '../controllers/authorsController.js';

const router = express.Router();

// Rotte Pubbliche (senza autenticazione)
router.get('/', getAuthors); // Ottenere tutti gli autori
router.get('/:id', getAuthorById); // Ottenere un autore per ID
router.post('/register', registerAuthor); // Registrazione
router.post('/login', loginAuthor);       // Login

// Rotte per Amministratori (senza autenticazione richiesta, usate per test o setup)
router.post('/', createAuthor); // Creare un autore (senza autenticazione per test)
router.put('/:id', updateAuthor); // Aggiornare un autore (senza autenticazione per test)
router.delete('/:id', deleteAuthor); // Cancellare un autore (senza autenticazione per test)
router.delete('/', deleteAllAuthors); // Cancellare tutti gli autori

// Rotte Protette (richiedono autenticazione, prefisso /auth)
router.put('/auth/me', authorization, updateProfile); // Aggiornare il profilo dell'autore autenticato
router.delete('/auth/me', authorization, deleteProfile); // Cancellare il profilo dell'autore autenticato
router.patch('/auth/me/avatar', authorization, upload.single('avatar'), uploadAuthorAvatar); // Aggiornare l'avatar
router.get('/auth/me', authorization, me); // Ottenere i dati dell'autore autenticato

export default router;

