import GoogleStrategy from "passport-google-oauth20"; //STRATEGIA AUTENTICAZIONE
import Author from "../models/Authors.js";
import jwt from "jsonwebtoken";

const googleStrategy = new GoogleStrategy( //RICEVE DUE PARAMETRI
  //PRIMO PARAMETRO: OGGETTO DELLA CONFIGURAZIONE CHE CONTIENE
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL, //URL a cui Google invierà la risposta una volta completata l'autenticazione
    /*scope: ['profile', 'email']*/  //CHE INFO CHIEDERE A GOOGLE
  },
  //SECONDO PARAMETRO: FUNZIONE CHE RICEVE 4 ARGOMENTI
  async function (accessToken, refreshToken, profile, passportNext) {
    console.log("Inizio strategia Google");
  
    try {
      const { given_name: name, family_name: surname, email, sub: googleId, picture: avatar } = profile._json;
      console.log("Dati estratti da Google:", { googleId, name, surname, email });
  
      let author = await Author.findOne({ googleId });
      console.log("Autore trovato:", author);
  
      if (!author) {
        console.log("Creazione nuovo autore");
        const newAuthor = new Author({ googleId, name, surname, email, avatar });
        author = await newAuthor.save();
        console.log("Autore creato:", author);
      }
  
      const jwtToken = jwt.sign({ id: author.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      console.log("Token generato:", jwtToken);
  
      passportNext(null, { jwtToken });
    } catch (error) {
      console.error("Errore nella strategia Google:", error);
      passportNext(error);
    }
  }
  
  
);

export default googleStrategy;
