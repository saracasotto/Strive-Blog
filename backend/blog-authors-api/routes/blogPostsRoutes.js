import express from 'express';
import BlogPost from '../models/BlogPost.js'; // Assicurati di avere questo modello

const router = express.Router();

// GET /blogPosts - Ritorna la lista di post del blog
router.get('/', async (req, res) => {
  try {
    const filter = req.query.title ? { title: new RegExp(req.query.title, 'i') } : {};
    const blogPosts = await BlogPost.find(filter);
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
});

// GET /blogPosts/:id - Ritorna un singolo post del blog
router.get('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (blogPost) {
      res.json(blogPost);
    } else {
      res.status(404).json({ message: 'Post del blog non trovato' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
});

// POST /blogPosts - Crea un nuovo post del blog
router.post('/', async (req, res) => {
  try {
    const { title, content, category, author } = req.body;

    // Verifica che tutti i campi obbligatori siano presenti
    if (!title || !content || !category || !author) {
      return res.status(400).json({ message: 'Titolo, contenuto, categoria e autore sono obbligatori' });
    }

    // Crea e salva il nuovo post
    const newBlogPost = new BlogPost({ title, content, category, author });
    const savedBlogPost = await newBlogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (error) {
    res.status(400).json({ message: 'Errore nella richiesta: ' + error.message });
  }
});

// PUT /blogPosts/:id - Modifica un post del blog esistente
router.put('/:id', async (req, res) => {
  try {
    const { title, content, category, author } = req.body;

    // Verifica che tutti i campi obbligatori siano presenti
    if (!title || !content || !category || !author) {
      return res.status(400).json({ message: 'Titolo, contenuto, categoria e autore sono obbligatori' });
    }

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(req.params.id, { title, content, category, author }, { new: true });
    if (updatedBlogPost) {
      res.json(updatedBlogPost);
    } else {
      res.status(404).json({ message: 'Post del blog non trovato' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Errore nella richiesta: ' + error.message });
  }
});

// DELETE /blogPosts/:id - Cancella un post del blog
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (deletedBlogPost) {
      res.json({ message: 'Post del blog cancellato' });
    } else {
      res.status(404).json({ message: 'Post del blog non trovato' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
});

// GET /authors/:id/blogPosts - Ritorna tutti i post di uno specifico autore
router.get('/authors/:id', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({ author: req.params.id });
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
});

export default router;
