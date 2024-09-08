import express from 'express';
import upload from '../config/multerConfig.js';
import authorization from '../middlewares/authorization.js'; //IMPORTO MIDDLEWARE AUTENTICAZIONE

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

//ROTTE PUBBLICHE CHE NON RICHIEDONO AUTENTICAZIONE 
router.get('/', getAuthors); 
router.get('/:id', getAuthorById); 
router.post('/register', registerAuthor); 
router.post('/login', loginAuthor);     

//ROTTE DA BACKEND(SENZA AUTENTICAZIONE -  USATE PER TESTING O SETUP)
router.post('/', createAuthor); 
router.put('/:id', updateAuthor); 
router.delete('/:id', deleteAuthor); 
router.delete('/', deleteAllAuthors); 

// ROTTE PROTETTE 
router.put('/auth/me', authorization, updateProfile); // Aggiornare il profilo dell'autore autenticato
router.delete('/auth/me', authorization, deleteProfile); // Cancellare il profilo dell'autore autenticato
router.patch('/auth/me/avatar', authorization, upload.single('avatar'), uploadAuthorAvatar); // Aggiornare l'avatar
router.get('/auth/me', authorization, me); // Ottenere i dati dell'autore autenticato (pagina PROFILE)

export default router;

