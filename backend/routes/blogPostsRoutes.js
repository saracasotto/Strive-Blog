import express from 'express';
import BlogPost from '../models/BlogPosts.js';

const router = express.Router();

// GET /blogPosts - Ritorna una lista di blog post
// utilizzo funzioni asincrone per le chiamate per non bloccare il flusso

router.get('/', async (req, res) => {
  try {
    //PAGINAZIONE RISULTATI GET
    //n pagina corrente e numero post massimi per pagina
    const { _page = 1, _limit = 10 } = req.query; 

    //Calcola quanti elementi devono essere saltati per ottenere la pagina richiesta
    const skip = (parseInt(_page) - 1) * parseInt(_limit); 
    
    //calcola numero istanze
    const totalPosts = await BlogPost.countDocuments();  //asincrono


    const posts = await BlogPost.find()

    //paginazione 
      .skip(skip)
      .limit(parseInt(_limit));
    
    //stabilisco come risposta al client il n. di post e post
      res.json({
        totalPosts: totalPosts,
        posts: posts
      });;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /blogPosts/:id - Ritorna un singolo blog post
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post) res.json(post);
    else res.status(404).send('Post not found');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /blogPosts - Crea un nuovo blog post
router.post('/', async (req, res) => {
  try {
    const newPost = new BlogPost(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /blogPosts/:id - Modifica un blog post esistente
router.put('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (post) res.json(post);
    else res.status(404).send('Post not found');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /blogPosts/:id - Cancella un blog post
router.delete('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (post) res.status(204).send();
    else res.status(404).send('Post not found');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
