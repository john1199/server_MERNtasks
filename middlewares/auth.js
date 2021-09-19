const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No existe el token de autenticacion" });
  }
  try {
    const cifrado = jwt.verify(token, process.env.SECRET);
    req.user = cifrado.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no valido" });
  }
};
