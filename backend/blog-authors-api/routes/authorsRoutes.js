import express from 'express';
import Author from '../models/Authors.js'; 

const router = express.Router();

// GET /authors - Ritorna la lista di autori
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
});

// GET /authors/:id - Ritorna un singolo autore
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ message: 'Autore non trovato' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
});

// POST /authors - Crea un nuovo autore
router.post('/', async (req, res) => {
  try {
    const { name, surname, email, birthDate, avatar } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Nome e email sono obbligatori' });
    }

    const newAuthor = new Author({ name, surname, email, birthDate, avatar });
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(400).json({ message: 'Errore nella richiesta: ' + error.message });
  }
});

// PUT /authors/:id - Modifica un autore esistente
router.put('/:id', async (req, res) => {
  try {
    const { name, surname, email, birthDate, avatar } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Nome e email sono obbligatori' });
    }

    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, { name, surname, email, birthDate, avatar }, { new: true });
    if (updatedAuthor) {
      res.json(updatedAuthor);
    } else {
      res.status(404).json({ message: 'Autore non trovato' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Errore nella richiesta: ' + error.message });
  }
});

// DELETE /authors/:id - Cancella un autore
router.delete('/:id', async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (deletedAuthor) {
      res.json({ message: 'Autore cancellato' });
    } else {
      res.status(404).json({ message: 'Autore non trovato' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
});

export default router;
