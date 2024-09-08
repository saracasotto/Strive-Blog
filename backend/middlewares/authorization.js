import jwt from "jsonwebtoken";
import Author from "../models/Authors.js"; 

const JWT_SECRET = process.env.JWT_SECRET 

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token mancante" });
  }
  
  // Se l'header è presente, viene diviso in due parti utilizzando lo spazio come delimitatore
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Token malformato" });
  }

  // Usa jwt.verify per decodificare e verificare il token utilizzando la chiave segreta
  // Se il token è valido, il payload decodificato (che contiene le informazioni dell'autore) viene restituito
  const token = parts[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log("Payload del token: ", payload); //CONTROLLO PAYLOAD!

    const author = await Author.findById(payload.authorId).select("-password");
    if (!author) {
      return res.status(401).json({ error: "Autore non trovato" });
    }

    req.loggedAuthor = author;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token non valido o scaduto" });
  }
};
