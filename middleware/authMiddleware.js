// const jwt = require('jsonwebtoken');

// const protect = (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       console.error('Error en la validación del token:', error.message);
//       return res.status(401).json({ message: 'No autorizado, token inválido o vencido' });
//     }
//   } else {
//     return res.status(401).json({ message: 'No autorizado, se requiere un token de acceso' });
//   }
// };

// module.exports = protect;
