import express from 'express';
import { googleLogin, googleCallback  } from '../controllers/authController.js'
import passport from 'passport';
const router = express.Router();

// Route per iniziare il processo di autenticazione con Google
router.get('/auth/login-google', googleLogin);

// Route per gestire il callback dopo l'autenticazione con Google
router.get('/auth/google/callback', passport.authenticate('google', { session: false }), googleCallback);

  

export default router;

