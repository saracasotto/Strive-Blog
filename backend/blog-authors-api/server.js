import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authorsRouter from './routes/authorsRoutes.js'; // Importa il router per gli autori
import blogPostsRouter from './routes/blogPostsRoutes.js'; // Importa il router per i post del blog

// Configura dotenv per caricare variabili ambientali
dotenv.config();

const server = express();
const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());

// Recupera le credenziali dal file .env
const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const uri = `mongodb+srv://${username}:${password}@${process.env.MONGO_CLUSTER_URL}/?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.error("Errore di connessione a MongoDB: ", err));

// Usa i router per gestire le rotte
server.use('/authors', authorsRouter);
server.use('/blogPosts', blogPostsRouter);

// Avvia il server
server.listen(port, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
});
