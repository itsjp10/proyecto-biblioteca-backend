const express = require('express');
const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', loginController);

// Ruta para el registro de usuarios
router.post('/register', registerController);

// Exportar el router
module.exports = router;
