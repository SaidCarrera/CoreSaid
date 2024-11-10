const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get user's loans
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.params.userId })
      .populate('bookId', 'title author ISBN');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new loan
router.post('/', auth, async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);

    if (!book || book.availableCopies < 1) {
      return res.status(400).json({ message: 'Book not available' });
    }

    const loan = new Loan({
      userId: req.user.userId,
      bookId
    });

    book.availableCopies--;
    await book.save();
    await loan.save();

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Return book
router.put('/:id/return', auth, async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    loan.returnDate = new Date();
    loan.status = 'returned';
    await loan.save();

    const book = await Book.findById(loan.bookId);
    book.availableCopies++;
    await book.save();

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all loans (admin only)
router.get('/', [auth, admin], async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('userId', 'name email')
      .populate('bookId', 'title author ISBN');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;