const express = require('express');
const { createBook, getBook, getBooks, updateBook, deleteBook } = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Crear un libro (Requiere autenticación y permiso de administrador)
router.post('/create', authMiddleware, createBook);

// Obtener un libro por ID o varios libros con filtros
router.get('/:id', getBook);          // Obtener libro por ID
router.get('/', getBooks);             // Obtener libros con filtros

// Actualizar un libro (Requiere autenticación y permiso)
router.put('/update/:id', authMiddleware, updateBook);

// Eliminar un libro (Soft delete, requiere autenticación y permiso)
router.delete('/delete/:id', authMiddleware, deleteBook);

module.exports = router;
