import passport from 'passport';

//AVVIO PROCESSO DI AUTENTICAZIONE(richiede l'accesso a profilo ed email)
export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

//GESTISCO CALLBACK DOPO AUTENTICAZIONE
export const googleCallback = passport.authenticate('google', { failureRedirect: '/login' });

//DOPO LOGIN REDIREZIONO ALLA HOME
export const loginSuccess = (req, res) => {
  res.redirect('/'); // Redirigi alla dashboard
};

//GESTIONE LOGOUT
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/login'); //DOPO LOGOUT REDIREZIONO A LOGIN
  });
};

