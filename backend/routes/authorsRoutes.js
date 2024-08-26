import express from 'express';
import upload from '../config/multerConfig.js';

import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  uploadAuthorAvatar
} from '../controllers/authorsController.js';

const router = express.Router();

router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.post('/', createAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);
router.patch('/:id/avatar', upload.single('avatar'), uploadAuthorAvatar);


export default router;
