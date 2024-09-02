import User from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Funzione di registrazione dell'utente
export const register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email già in uso' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email.toLowerCase().trim(),
            password: hashedPassword,
            verifiedAt: new Date(),
        });

        const userCreated = await newUser.save();
        res.status(201).json(userCreated);
    } catch (err) {
        console.error('Errore durante la registrazione:', err); // Log dell'errore
        res.status(500).json({ error: 'Errore nel salvataggio dell\'utente' });
    }
};


// Funzione di login dell'utente
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email.toLowerCase().trim() });
        if (!user) {
            return res.status(401).json({ error: 'Credenziali errate' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenziali errate' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Errore durante il login' });
    }
};

// Funzione per ottenere i dati dell'utente autenticato
export const me = (req, res) => {
    res.json(req.loggedUser);
};
