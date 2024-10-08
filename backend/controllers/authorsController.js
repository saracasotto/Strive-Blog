import Author from '../models/Authors.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendWelcomeEmail } from '../services/Email.js';


dotenv.config();

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token non valido' });
      } else {
        req.authorId = decoded.authorId;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Autenticazione richiesta' });
  }
};

//OTTENERE TUTTI GLI AUTORI
export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il recupero degli autori: ' + error.message });
  }
};

//OTTENERE AUTORE SPECIFICO
export const getAuthorById = async (req, res) => {
  try {
    // Popola il campo blogPosts per ottenere i post dell'autore
    const author = await Author.findById(req.params.id).populate('blogPosts');
    if (!author) {
      return res.status(404).json({ message: 'Autore non trovato' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il recupero dell\'autore: ' + error.message });
  }
};

//CREARE AUTORE DAL BACKEND
export const createAuthor = async (req, res) => {
  try {
    const { name, surname, email, password, birthDate, avatar } = req.body;

    // Verifica campi obbligatori
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: 'Campi obbligatori mancanti' });
    }

    // Controlla se l'email o lo username esistono già
    const existingAuthor = await Author.findOne({ $or: [{ email }] });
    if (existingAuthor) {
      return res.status(409).json({ message: 'Autore giá esistente' });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creazione dell'autore
    const newAuthor = new Author({
      name,
      surname,
      email,
      password: hashedPassword,
      birthDate,
      avatar
    });

    const savedAuthor = await newAuthor.save();

    res.status(201).json({ author: savedAuthor });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la creazione dell\'autore: ' + error.message });
  }
};

//AGGIORNARE AUTORE DAL BACKEND
export const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, birthDate, avatar } = req.body;
    
    // Trova e aggiorna l'autore
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { name, surname, email, birthDate, avatar },
      { new: true, runValidators: true }
    );
    
    if (!updatedAuthor) {
      return res.status(404).json({ message: 'Autore non trovato' });
    }
    
    res.json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ message: 'Errore durante l\'aggiornamento dell\'autore: ' + error.message });
  }
};

//CANCELLARE AUTORE DAL BACKEND
export const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Autore non trovato' });
    }
    res.status(200).json({ message: 'Autore eliminato' });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la cancellazione dell\'autore: ' + error.message });
  }
};

//CANCELLARE TUTTI GLI AUTORI DAL BACKEND
export const deleteAllAuthors = async (req, res) => {
  try {
    await Author.deleteMany();
    res.status(200).json({ message: 'Tutti gli autori sono stati cancellati' });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la cancellazione degli autori: ' + error.message });
  }
};

//REGISTRARE AUTORE
export const registerAuthor = async (req, res) => {
  try {
    const { name, surname, email, password, birthDate } = req.body;

    // Verifica campi obbligatori
    if (!name || !surname || !email || !password || !birthDate) {
      return res.status(400).json({ message: 'Campi obbligatori mancanti' });
    }

    // Controlla se l'email esiste già
    const existingAuthor = await Author.findOne({ email });
    if (existingAuthor) {
      return res.status(409).json({ message: 'Autore già esistente' });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creazione dell'autore
    const newAuthor = new Author({
      name,
      surname,
      email,
      password: hashedPassword,
      birthDate
    });

    const savedAuthor = await newAuthor.save();

    await sendWelcomeEmail(savedAuthor);  //INVIAMO EMAIL DI CONFERMA REGISTRAZIONE


    // Genera un token JWT
    const token = jwt.sign(
      { id: savedAuthor._id }, 
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } 
    );

    res.status(201).json({ token, author: savedAuthor });
  } catch (error) {
    res.status(500).json({ message: 'Errore nella registrazione: ' + error.message });
  }
};

//LOGIN AUTORE
export const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica campi
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e password sono obbligatorie' });
    }

    // Trova l'autore per email
    const author = await Author.findOne({ email });
    if (!author) {
      return res.status(401).json({ message: 'Credenziali errate' });
    }

    // Verifica la password
    const isMatch = await bcrypt.compare(password, author.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenziali errate' });
    }

    // Genera un token JWT
    const token = jwt.sign(
      { id: author._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } 
    );

    res.json({ token, author });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il login: ' + error.message });
  }
};

//AGGIORNA AUTORE AUTENTICATO
export const updateProfile = async (req, res) => {
  try {
    const { name, surname, email, birthDate, avatar } = req.body;

    // Trova e aggiorna l'autore autenticato
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.loggedAuthor._id,
      { name, surname, email, birthDate, avatar },
      { new: true, runValidators: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: 'Autore non trovato' });
    }

    res.json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ message: 'Errore durante l\'aggiornamento del profilo: ' + error.message });
  }
};

//CANCELLA PROFILO AUTENTICATO
export const deleteProfile = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.id);
    if (!author) {
      return res.status(404).json({ message: 'Autore non trovato' });
    }
    res.status(200).json({ message: 'Profilo dell\'autore eliminato' });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la cancellazione del profilo: ' + error.message });
  }
};

//CARICA AVATAR AUTORE AUTENTICATO
export const uploadAuthorAvatar = async (req, res) => {
  try {
    // Trova l'autore autenticato
    const author = await Author.findById(req.loggedAuthor._id);
    if (!author) {
      return res.status(404).json({ message: 'Autore non trovato' });
    }

    // Verifica che il file sia stato caricato correttamente su Cloudinary
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Errore durante il caricamento del file.' });
    }

    // Aggiorna l'avatar dell'autore
    author.avatar = req.file.path;
    await author.save();

    res.json({ message: 'Avatar caricato con successo', avatar: author.avatar });
  } catch (error) {
    console.error('Errore durante il caricamento dell\'avatar:', error);

    // Restituisci un errore in formato JSON
    res.status(500).json({
      message: 'Errore del server durante il caricamento dell\'avatar',
      error: error.toString(),  // Serializza l'errore come stringa
    });
  }
};

//OTTENERE DATI AUTORE AUTENTICATO
export const me = async (req, res) => {
  try {
    // Usa req.loggedAuthor che è impostato nel middleware di autorizzazione
    const author = req.loggedAuthor;

    if (!author) {
      return res.status(404).json({ message: 'Autore non trovato' });
    }

    res.json(author);  // Ritorna l'autore autenticato
  } catch (error) {
    res.status(500).json({ message: 'Errore del server: ' + error.message });
  }
};
