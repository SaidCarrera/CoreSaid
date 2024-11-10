const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  publicationYear: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['fiction', 'non-fiction', 'science', 'technology']
  },
  available: {
    type: Boolean,
    default: true
  },
  totalCopies: {
    type: Number,
    required: true,
    default: 1
  },
  availableCopies: {
    type: Number,
    required: true,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);