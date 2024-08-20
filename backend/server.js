import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authorsRouter from './routes/authorsRoutes.js'; // Importa il router per gli autori

// Configura dotenv per caricare variabili ambientali
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST

app.use(cors());
app.use(express.json());

// Recupera le credenziali dal file .env
const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const uri = `mongodb+srv://${username}:${password}@cluster0.dhchqcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.error("Errore di connessione a MongoDB: ", err));


// Usa i router per gestire le rotte
app.use('/authors', authorsRouter);

// Avvia il server
app.listen(port, () => {
  console.log(`Server in esecuzione su ${host}:${port}`);
});
