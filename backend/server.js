import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authorsRouter from './routes/authorsRoutes.js'; 
import blogPostsRouter from './routes/blogPostsRoutes.js';
import commentsRouter from './routes/commentsRoutes.js';
import authRouter from './routes/authRoutes.js';
import passport from 'passport';
import googleStrategy from './config/passportConfig.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST;

app.use(cors());
app.use(express.json());


passport.use('google', googleStrategy);

const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);

const uri = `mongodb+srv://${username}:${password}@cluster0.dhchqcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;
`;

mongoose
  .connect(uri)
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.error("Errore di connessione a MongoDB: ", err));

app.use('/authors', authorsRouter);
app.use('/blogposts', blogPostsRouter);
app.use('/blogposts/:id/comments', commentsRouter);
app.use('/', authRouter);

app.listen(port, () => {
  console.log(`Server in esecuzione su ${host}:${port}`);
});
