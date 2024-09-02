import express from 'express';
import upload from '../config/multerConfig.js';

import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  deleteAllAuthors,
  uploadAuthorAvatar
} from '../controllers/authorsController.js';

const router = express.Router();

router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.post('/', createAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);
router.delete('/', deleteAllAuthors); // Nuova rotta per cancellare tutti gli autori
router.patch('/:id/avatar', upload.single('avatar'), uploadAuthorAvatar);


export default router;
