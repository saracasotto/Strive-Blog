import passport from 'passport';

//AVVIO PROCESSO DI AUTENTICAZIONE(richiede l'accesso a profilo ed email)

export const googleLogin = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};


/*
Dopo che l'utente ha accettato l'autenticazione su Google, 
Google reindirizza utente a  URL di callback specifico.
Questo controller riceve i dati dall'autenticazione di Google e tramite passport 
gestisce il salvataggio dell'utente e la generazione del token JWT.
*/

export const googleCallback = (req, res) => {
  console.log("Token JWT ricevuto:", req.user.jwtToken);
  res.redirect(`http://localhost:3000/?token=${req.user.jwtToken}`);
};

