export interface LoanStats {
  totalLoans: number;
  activeLoans: number;
  overdueLoans: number;
  averageLoanDuration: number;
}

export interface BookStats {
  totalBooks: number;
  availableBooks: number;
  mostBorrowedBooks: {
    title: string;
    author: string;
    loanCount: number;
  }[];
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  topBorrowers: {
    name: string;
    email: string;
    loanCount: number;
  }[];
}