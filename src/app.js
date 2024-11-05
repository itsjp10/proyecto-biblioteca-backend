const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para JSON
app.use(express.json());

// Importar y usar rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
