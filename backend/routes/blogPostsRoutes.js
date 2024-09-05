import express from 'express';
import upload from '../config/multerConfig.js';
import authorization from '../middlewares/authorization.js'; // Middleware di autenticazione

import {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  createOwnBlogPost,
  updateBlogPost,
  updateOwnBlogPost,
  deleteBlogPost,
  deleteOwnBlogPost,
  deleteAllBlogPosts,
  uploadBlogPostCover,
} from '../controllers/blogPostsController.js';

const router = express.Router();

// Rotte pubbliche per il testing (senza autenticazione)
router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', createBlogPost); // Creazione senza autenticazione (per testing)
router.put('/:id', updateBlogPost);
router.delete('/:id', deleteBlogPost);
router.delete('/', deleteAllBlogPosts);

// Rotte protette (autenticazione necessaria)
router.post('/auth', authorization, createOwnBlogPost); // Creazione autenticata
router.put('/auth/:id', authorization, updateOwnBlogPost); // Aggiornamento autenticato
router.delete('/auth/:id', authorization, deleteOwnBlogPost); // Cancellazione autenticata

// Upload della cover del blog post
router.patch('/:id/cover', upload.single('coverImage'), uploadBlogPostCover);

export default router;
