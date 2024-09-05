import express from 'express';
import upload from '../config/multerConfig.js';
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
import authorization from '../middlewares/authorization.js';

const router = express.Router();

// Rotte Pubbliche
router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.post('/register', registerAuthor); // Registrazione
router.post('/login', loginAuthor);       // Login

// Rotte per Amministratori (senza autenticazione richiesta)
router.post('/', createAuthor); // Creazione di un nuovo autore
router.put('/:id', updateAuthor); // Aggiornamento di un autore
router.delete('/:id', deleteAuthor); // Cancellazione di un autore
router.delete('/', deleteAllAuthors); // Cancellazione di tutti gli autori

// Rotte Protette (richiedono autenticazione)
router.put('/me', authorization, updateProfile); // Aggiornamento del profilo dell'autore autenticato
router.delete('/me', authorization, deleteProfile); // Cancellazione del profilo dell'autore autenticato
router.patch('/me/avatar', authorization, upload.single('avatar'), uploadAuthorAvatar); // Aggiornamento dell'avatar dell'autore autenticato
router.get('/me', authorization, me); // Ottenere i dati dell'autore autenticato

export default router;
