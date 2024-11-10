const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  borrowDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'returned', 'overdue'],
    default: 'active'
  }
}, {
  timestamps: true
});

loanSchema.pre('save', function(next) {
  if (this.isNew) {
    // Set due date to 14 days from borrow date
    const dueDate = new Date(this.borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);
    this.dueDate = dueDate;
  }
  next();
});

module.exports = mongoose.model('Loan', loanSchema);