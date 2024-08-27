import Author from '../models/Authors.js';



export const getAuthors = async (req, res) => {
  try {
    const { _page = 1, _limit = 10 } = req.query; // Parametri di paginazione
    const skip = (parseInt(_page) - 1) * parseInt(_limit);

    const totalAuthors = await Author.countDocuments(); // Conta totale degli autori

    const authors = await Author.find()
      .skip(skip) // Salta gli autori delle pagine precedenti
      .limit(parseInt(_limit)); // Limita il numero di autori per pagina

    res.json({
      totalAuthors: totalAuthors,
      totalPages: Math.ceil(totalAuthors / _limit),
      currentPage: parseInt(_page),
      authors: authors,
    });
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


export const deleteAllAuthors = async (req, res) => {
  try {
    await Author.deleteMany({}); // Cancella tutti i documenti nella collezione Author
    res.json({ message: 'Tutti gli autori sono stati cancellati' });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};

export const uploadAuthorAvatar = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Autore non trovato' });
    }

    // L'URL dell'immagine caricata è disponibile in req.file.path
    author.avatar = req.file.path;
    await author.save();

    res.json({ message: 'Avatar caricato con successo', avatar: author.avatar });
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};