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

//UPDATE COMMENTO - UTENTE  IDENTIFICATO
export const updateComment = async (req, res) => {
  try {
    const { content } = req.body;

    // Trova il commento per ID
    const comment = await Comment.findById(req.params.commentId);

    // Verifica se il commento esiste
    if (!comment) {
      return res.status(404).json({ message: 'Commento non trovato' });
    }

    // Verifica se l'autore del commento è lo stesso dell'utente autenticato
    if (comment.author.toString() !== req.loggedAuthor._id.toString()) {
      return res.status(403).json({ message: 'Non hai il permesso di modificare questo commento.' });
    }

    // Aggiorna il commento
    comment.content = content;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};


//CANCELLAZIONE COMMENTO - UTENTE IDENTIFICATO
export const deleteComment = async (req, res) => {
  try {
    // Trova il commento per ID
    const comment = await Comment.findById(req.params.commentId);
    
    // Verifica se il commento esiste
    if (!comment) {
      return res.status(404).json({ message: 'Commento non trovato' });
    }

    // Verifica se l'autore del commento è lo stesso dell'utente autenticato
    if (comment.author.toString() !== req.loggedAuthor._id.toString()) {
      return res.status(403).json({ message: 'Non hai il permesso di eliminare questo commento.' });
    }

    // Elimina il commento
    await comment.remove();

    // Rimuovi il commento dall'array dei commenti del post
    await BlogPost.findByIdAndUpdate(req.params.id, {
      $pull: { comments: req.params.commentId }, // Rimuove il commento dall'array
    });

    res.json({ message: 'Commento eliminato' });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};

