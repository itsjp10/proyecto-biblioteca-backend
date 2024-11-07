const express = require('express');
const { register, login, getUser, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Crear un usuario (Registro)
router.post('/register', register);

// Iniciar sesión (Login)
router.post('/login', login);

// Obtener perfil de usuario (Requiere autenticación)
router.get('/:id', authMiddleware, getUser);

// Actualizar usuario (Requiere autenticación y permisos)
router.put('/update/:id', authMiddleware, updateUser);

// Eliminar usuario (Soft delete, requiere autenticación y permisos)
router.delete('/delete/:id', authMiddleware, deleteUser);

module.exports = router;

