import express from 'express';
import upload from '../config/multerConfig.js';
import authorization from '../middlewares/authorization.js'; 

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

// ROTTE PUBBLICHE (CON ROTTE PER TESING E SETUP)
router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', createBlogPost); 
router.put('/:id', updateBlogPost);
router.delete('/:id', deleteBlogPost);
router.delete('/', deleteAllBlogPosts);
router.patch('/:id/cover', upload.single('coverImage'), uploadBlogPostCover);


//ROTTE PROTETTE
router.post('/auth', authorization, createOwnBlogPost); // Creazione autenticata
router.put('/auth/:id', authorization, updateOwnBlogPost); // Aggiornamento autenticato
router.delete('/auth/:id', authorization, deleteOwnBlogPost); // Cancellazione autenticata


export default router;
