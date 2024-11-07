const Book = require('../models/Book');

// Crear un libro
exports.createBook = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Acceso denegado' });
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: 'Libro creado exitosamente', book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un libro por ID
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.disabled) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener libros con filtros
exports.getBooks = async (req, res) => {
  try {
    const filters = { ...req.query, disabled: false };
    const books = await Book.find(filters);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un libro
exports.updateBook = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Acceso denegado' });
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Libro actualizado', book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete para libro
exports.deleteBook = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Acceso denegado' });
    const book = await Book.findByIdAndUpdate(req.params.id, { disabled: true }, { new: true });
    res.json({ message: 'Libro inhabilitado', book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
