import BlogPost from '../models/BlogPosts.js';
import Comment from '../models/Comments.js';

// GET /blogPosts/:id/comments - Ritorna tutti i commenti di un post specifico
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

// GET /blogPosts/:id/comments/:commentId - Ritorna un commento specifico di un post
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

// POST /blogPosts/:id/comments - Aggiungi un nuovo commento a un post specifico
export const addCommentToPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Post non trovato' });
    }

    const newComment = new Comment(req.body);
    await newComment.save();

    blogPost.comments.push(newComment._id);
    await blogPost.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};

// PUT /blogPosts/:id/comments/:commentId - Modifica un commento di un post specifico
export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: 'Commento non trovato' });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};

// DELETE /blogPosts/:id/comments/:commentId - Elimina un commento specifico di un post
export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Commento non trovato' });
    }

    await BlogPost.findByIdAndUpdate(req.params.id, {
      $pull: { comments: req.params.commentId }
    });

    res.json({ message: 'Commento eliminato' });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};
