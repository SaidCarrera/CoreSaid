import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoanService } from '../../services/loan.service';
import { LoanHistoryComponent } from './loan-history.component';
import { User } from '../../models/user.model';
import { LoanHistory } from '../../models/loan.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, LoanHistoryComponent],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h2>User Profile</h2>
        <div class="user-info" *ngIf="user">
          <p><strong>Name:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
        </div>
      </div>
      
      <div class="loan-history">
        <h3>Loan History</h3>
        <app-loan-history
          [loans]="loans"
          (returnBook)="onReturnBook($event)">
        </app-loan-history>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .profile-header {
      margin-bottom: 30px;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .user-info {
      margin-top: 15px;
    }
  `]
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  loans: LoanHistory[] = [];

  constructor(
    private authService: AuthService,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.user = user;
        this.loadLoans();
      }
    });
  }

  loadLoans(): void {
    if (this.user?.id) {
      this.loanService.getUserLoans(this.user.id).subscribe({
        next: (loans) => this.loans = loans,
        error: (error) => console.error('Error loading loans:', error)
      });
    }
  }

  onReturnBook(loanId: string): void {
    this.loanService.returnBook(loanId).subscribe({
      next: () => this.loadLoans(),
      error: (error) => console.error('Error returning book:', error)
    });
  }
}