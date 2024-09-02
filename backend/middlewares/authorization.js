import jwt from "jsonwebtoken";
import User from "../models/Users.js";

// Utilizza la chiave segreta per firmare i token
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

export default async (req, res, next) => {
  // Verifica se l'header Authorization è presente e se è di tipo Bearer
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token mancante" });
  }
  // Se l'header è presente, viene diviso in due parti utilizzando lo spazio come delimitatore.
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Token malformato" });
  }

  //Usa jwt.verify per decodificare e verificare il token utilizzando la chiave segreta.
  //Se il token è valido, il payload decodificato (che contiene le informazioni dell'utente) viene restituito.
  const token = parts[1];

  try {
    // Verifica il token e recupera il payload
    const payload = jwt.verify(token, JWT_SECRET);

    // Recupera i dati dell'utente dal database escludendo il campo password
    const user = await User.findById(payload.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Utente non trovato" });
    }

    // Aggiungi i dati dell'utente all'oggetto req
    req.loggedUser = user;

    // Passa al prossimo middleware
    next();
  } catch (err) {
    // Gestione degli errori: token non valido o scaduto
    return res.status(401).json({ error: "Token non valido o scaduto" });
  }
};
