const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const Loan = require('../models/Loan');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all loans with details
router.get('/loans', [auth, admin], async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('userId', 'name email')
      .populate('bookId', 'title author ISBN');
    
    const formattedLoans = loans.map(loan => ({
      id: loan._id,
      status: loan.status,
      borrowDate: loan.borrowDate,
      dueDate: loan.dueDate,
      returnDate: loan.returnDate,
      user: {
        id: loan.userId._id,
        name: loan.userId.name,
        email: loan.userId.email
      },
      book: {
        id: loan.bookId._id,
        title: loan.bookId.title,
        author: loan.bookId.author,
        ISBN: loan.bookId.ISBN
      }
    }));

    res.json(formattedLoans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', [auth, admin], async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user
router.put('/users/:id', [auth, admin], async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
router.delete('/users/:id', [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete admin user' });
    }
    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get loan statistics
router.get('/stats/loans', [auth, admin], async (req, res) => {
  try {
    const totalLoans = await Loan.countDocuments();
    const activeLoans = await Loan.countDocuments({ status: 'active' });
    const overdueLoans = await Loan.countDocuments({ status: 'overdue' });
    
    const loans = await Loan.find({ status: 'returned' });
    const totalDuration = loans.reduce((acc, loan) => {
      const duration = loan.returnDate.getTime() - loan.borrowDate.getTime();
      return acc + duration;
    }, 0);
    const averageLoanDuration = loans.length > 0 ? 
      totalDuration / loans.length / (1000 * 60 * 60 * 24) : 0;

    res.json({
      totalLoans,
      activeLoans,
      overdueLoans,
      averageLoanDuration
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;