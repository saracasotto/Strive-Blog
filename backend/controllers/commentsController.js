import BlogPost from '../models/BlogPosts.js';
import Comment from '../models/Comments.js';

// GET all comments for a specific blog post
export const getCommentsByPostId = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate('comments');
    if (!blogPost) {
      return res.status(404).json({ message: 'Post non trovato' });
    }
    res.json(blogPost.comments);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};

// GET a specific comment by commentId
export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Commento non trovato' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};

// POST add a new comment to a specific blog post
export const addCommentToPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Post non trovato' });
    }

    const { content } = req.body;
    const author = req.loggedUser; // L'utente autenticato diventa l'autore del commento

    const newComment = new Comment({
      content,
      author: author._id, // Associa l'autore al commento
    });

    await newComment.save();

    blogPost.comments.push(newComment._id); // Aggiungi il commento al post
    await blogPost.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};

// PUT update a specific comment
export const updateComment = async (req, res) => {
  try {
    const { content } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content },
      { new: true }
    );

    if (!updatedComment) return res.status(404).json({ message: 'Commento non trovato' });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};

// DELETE a specific comment from a blog post
export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Commento non trovato' });
    }

    await BlogPost.findByIdAndUpdate(req.params.id, {
      $pull: { comments: req.params.commentId }, // Rimuove il commento dal post
    });

    res.json({ message: 'Commento eliminato' });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};
