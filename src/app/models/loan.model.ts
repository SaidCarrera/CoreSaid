export interface Loan {
  id?: string;
  userId: string;
  bookId: string;
  bookTitle: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'active' | 'returned' | 'overdue';
}

export interface LoanHistory extends Loan {
  book: {
    title: string;
    author: string;
    ISBN: string;
  };
}