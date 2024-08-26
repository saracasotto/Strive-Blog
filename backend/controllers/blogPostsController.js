import BlogPost from '../models/BlogPosts.js';

export const getBlogPosts = async (req, res) => {
  try {
    const { _page = 1, _limit = 10 } = req.query;
    const skip = (parseInt(_page) - 1) * parseInt(_limit);

    const totalPosts = await BlogPost.countDocuments();

    const posts = await BlogPost.find()
      .skip(skip)
      .limit(parseInt(_limit));

    res.json({
      totalPosts: totalPosts,
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post) res.json(post);
    else res.status(404).send('Post not found');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlogPost = async (req, res) => {
  try {
    const newPost = new BlogPost(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (post) res.json(post);
    else res.status(404).send('Post not found');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (post) res.status(204).send();
    else res.status(404).send('Post not found');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const uploadBlogPostCover = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post non trovato' });
    }

    post.cover = req.file.path;
    await post.save();

    res.json({ message: 'Cover caricata con successo', coverImage: post.coverImage });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};


