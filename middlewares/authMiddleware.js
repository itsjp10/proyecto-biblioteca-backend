const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  try {
    // Obtener el token de la cabecera de autorización
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado: No se proporcionó un token' });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    // Verificar si el usuario existe y no está deshabilitado
    if (!user || user.disabled) {
      return res.status(401).json({ message: 'Acceso denegado: Usuario no válido o deshabilitado' });
    }

    // Añadir la información del usuario a la solicitud
    req.user = { id: user._id, role: user.role };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Acceso denegado: Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
