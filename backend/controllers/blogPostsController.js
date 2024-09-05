import BlogPost from '../models/BlogPosts.js';

// GET all blog posts with pagination
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

// GET a single blog post by ID
export const getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'name surname');
    if (!post) return res.status(404).json({ message: 'Post non trovato' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create a new blog post
export const createBlogPost = async (req, res) => {
  try {
    const { category, title, cover, readTime, content } = req.body;
    const author = req.loggedUser; // L'utente autenticato diventa l'autore del post

    const newPost = new BlogPost({
      category,
      title,
      cover,
      readTime,
      content,
      author: author._id, // Associa l'autore al post
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update a blog post
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

// DELETE a blog post
export const deleteBlogPost = async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post non trovato' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE all blog posts
export const deleteAllBlogPosts = async (req, res) => {
  try {
    await BlogPost.deleteMany({});
    res.json({ message: 'Tutti i blog posts sono stati cancellati' });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};

// Upload a blog post cover image
export const uploadBlogPostCover = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post non trovato' });
    }

    post.cover = req.file.path;
    await post.save();

    res.json({ message: 'Cover caricata con successo', coverImage: post.cover });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};
