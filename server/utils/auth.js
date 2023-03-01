const jwt = require('jsonwebtoken');

// establecer secreto de token y la fecha de vencimiento
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // función para nuestras rutas autenticadas
  authMiddleware: function (req, res, next) {
    // permite que el token se envíe a través de req.query o encabezados
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // verificar el token y obtener datos del usuario de él
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    // enviar al siguiente endpoint
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
