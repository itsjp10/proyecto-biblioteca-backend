const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publishedDate: Date,
  publisher: String, 
  available: { type: Boolean, default: true },
  reservationHistory: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      reservedDate: Date,
      returnedDate: Date
    }
  ],
  disabled: { type: Boolean, default: false },
});

module.exports = mongoose.model('Book', bookSchema);
