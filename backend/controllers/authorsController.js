import Author from '../models/Authors.js';

export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().limit(15);
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};

export const getAuthorById = async (req, res) => {
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
};

export const createAuthor = async (req, res) => {
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
};

export const updateAuthor = async (req, res) => {
  try {
    const { name, surname, email, birthDate, avatar } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Nome e email sono obbligatori' });
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { name, surname, email, birthDate, avatar },
      { new: true }
    );
    if (updatedAuthor) {
      res.json(updatedAuthor);
    } else {
      res.status(404).json({ message: 'Autore non trovato' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Errore nella richiesta: ' + error.message });
  }
};

export const deleteAuthor = async (req, res) => {
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
};
