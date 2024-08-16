import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Author from './models/Authors.js';
import dotenv from 'dotenv';

// Configura dotenv per caricare variabili ambientali
dotenv.config();

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

// Recupera le credenziali dal file .env
const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const uri = `mongodb+srv://${username}:${password}@cluster0.dhchqcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// GET /authors - Ritorna la lista degli autori
server.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /authors/:id - Ritorna un singolo autore
server.get("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /authors - Crea un nuovo autore
server.post("/authors", async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /authors/:id - Modifica un autore esistente
server.put("/authors/:id", async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Aggiunge la validazione del modello
    );
    if (!updatedAuthor) return res.status(404).json({ message: "Author not found" });
    res.json(updatedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /authors/:id - Cancella un autore
server.delete("/authors/:id", async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ message: "Author not found" });
    res.json({ message: "Author deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Avvia il server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
