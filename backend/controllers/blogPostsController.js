import BlogPost from '../models/BlogPosts.js';
import Author from '../models/Authors.js';

//OTTIENI TUTTI I POST
export const getBlogPosts = async (req, res) => {
  try {
    const { _page = 1, _limit = 10 } = req.query;
    const skip = (parseInt(_page) - 1) * parseInt(_limit);

    const totalPosts = await BlogPost.countDocuments();
    const posts = await BlogPost.find()
      .populate('author', 'name surname') // Popola il nome e il cognome dell'autore
      .skip(skip)
      .limit(parseInt(_limit));

    res.json({
      totalPosts: totalPosts,
      totalPages: Math.ceil(totalPosts / _limit),
      currentPage: parseInt(_page),
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//OTTIENI SOLO UN POST 
export const getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'name surname');
    if (!post) return res.status(404).json({ message: 'Post non trovato' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//CREAZIONE NUOVO POST DA BACKEND
export const createBlogPost = async (req, res) => {
  try {
    const { category, title, cover, readTime, content } = req.body;
    const defaultAuthorId = '66d9c8459f9a4567c7da80c4'; // ID autore di default per test senza autenticazione

    // Trova l'autore nel database
    const author = await Author.findById(defaultAuthorId);
    if (!author) {
      return res.status(404).json({ message: 'Autore non trovato' });
    }

    // Crea un nuovo post con l'autore predefinito
    const newPost = new BlogPost({
      category,
      title,
      cover,
      readTime,
      content,
      author: defaultAuthorId, // Associa l'autore predefinito al post
    });

    // Salva il nuovo post nel database
    await newPost.save();

    // Aggiungi il nuovo post all'autore
    author.blogPosts.push(newPost._id);
    await author.save();  // Aggiorna l'autore con il nuovo post

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(400).json({ message: error.message });
  }
};

//MODIFICA POST DA BACKEND
export const updateBlogPost = async (req, res) => {
  try {
    const { category, title, cover, readTime, content } = req.body;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { category, title, cover, readTime, content },
      { new: true }
    );

    if (!updatedPost) return res.status(404).json({ message: 'Post non trovato' });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//CANCELLA POST DA BACKEND
export const deleteBlogPost = async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post non trovato' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//CANCELLA TUTTI I POST DA BACKEND 
export const deleteAllBlogPosts = async (req, res) => {
  try {
    await BlogPost.deleteMany({});
    res.json({ message: 'Tutti i blog posts sono stati cancellati' });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};

//CREAZIONE NUOVO POST CON AUTENTICAZIONE DA FRONTEND
export const createOwnBlogPost = async (req, res) => {
  try {
    const { category, title, cover, readTime, content } = req.body;

    // Crea un nuovo post con l'autore autenticato
    const newPost = new BlogPost({
      category,
      title,
      cover,
      readTime,
      content,
      author: req.loggedAuthor._id,  // Associa l'autore autenticato al post
    });

    // Salva il nuovo post
    const savedPost = await newPost.save();

    // Aggiorna l'autore aggiungendo l'ID del nuovo post all'array blogPosts
    await Author.findByIdAndUpdate(req.loggedAuthor._id, {
      $push: { blogPosts: savedPost._id }  // Aggiungi l'ID del post all'array blogPosts
    });

    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(400).json({ message: error.message });
  }
};

//MODIFICA POST CON AUTENTICAZIONE DA FRONTEND
export const updateOwnBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post non trovato' });

    // Verifica che l'utente sia l'autore del post
    if (post.author.toString() !== req.loggedAuthor._id.toString()) {
      return res.status(403).json({ message: 'Non hai il permesso di modificare questo post' });
    }

    const { category, title, cover, readTime, content } = req.body;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { category, title, cover, readTime, content },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//CANCELLA POST CON AUTENTICAZIONE DA FRONTEND
export const deleteOwnBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post non trovato' });

    // Verifica che l'utente sia l'autore del post
    if (post.author.toString() !== req.loggedAuthor._id.toString()) {
      return res.status(403).json({ message: 'Non hai il permesso di cancellare questo post' });
    }

    await BlogPost.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//CARICA UN'IMMAGINE DEL BLOGPOST
export const uploadBlogPostCover = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post non trovato' });

    post.cover = req.file.path;
    await post.save();

    res.json({ message: 'Cover caricata con successo', coverImage: post.cover });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};

