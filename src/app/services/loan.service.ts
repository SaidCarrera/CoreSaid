import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan, LoanHistory } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:3000/api/loans';

  constructor(private http: HttpClient) {}

  getUserLoans(userId: string): Observable<LoanHistory[]> {
    return this.http.get<LoanHistory[]>(`${this.apiUrl}/user/${userId}`);
  }

  borrowBook(userId: string, bookId: string): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, { userId, bookId });
  }

  returnBook(loanId: string): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${loanId}/return`, {});
  }
}