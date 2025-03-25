export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
      console.log(req.session);
      console.log(req.session.user);
      return next();
    }
    res.status(401).json({ message: "No autorizado, inicia sesión." });
  };