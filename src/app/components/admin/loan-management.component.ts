import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loan-management">
      <h2>Loan Management</h2>
      
      <div class="filters">
        <select (change)="filterLoans($event)">
          <option value="all">All Loans</option>
          <option value="active">Active Loans</option>
          <option value="overdue">Overdue Loans</option>
          <option value="returned">Returned Loans</option>
        </select>
      </div>

      <div class="loans-grid">
        <div class="loan-card" *ngFor="let loan of filteredLoans">
          <div class="loan-header">
            <h3>{{ loan.book.title }}</h3>
            <span class="status" [class]="loan.status">{{ loan.status }}</span>
          </div>
          <div class="loan-details">
            <p><strong>User:</strong> {{ loan.user.name }}</p>
            <p><strong>Borrow Date:</strong> {{ loan.borrowDate | date }}</p>
            <p><strong>Due Date:</strong> {{ loan.dueDate | date }}</p>
            <p *ngIf="loan.returnDate">
              <strong>Return Date:</strong> {{ loan.returnDate | date }}
            </p>
          </div>
          <div class="loan-actions" *ngIf="loan.status === 'active'">
            <button (click)="markAsReturned(loan.id)">Mark as Returned</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loan-management {
      padding: 20px;
    }
    .filters {
      margin-bottom: 20px;
    }
    select {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .loans-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .loan-card {
      background: white;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .loan-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8em;
    }
    .status.active { background: #28a745; color: white; }
    .status.overdue { background: #dc3545; color: white; }
    .status.returned { background: #6c757d; color: white; }
    .loan-details p {
      margin: 5px 0;
    }
    .loan-actions {
      margin-top: 15px;
    }
    button {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class LoanManagementComponent implements OnInit {
  allLoans: any[] = [];
  filteredLoans: any[] = [];

  constructor(
    private adminService: AdminService,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.adminService.getAllLoans().subscribe({
      next: (loans) => {
        this.allLoans = loans;
        this.filteredLoans = loans;
      },
      error: (error) => console.error('Error loading loans:', error)
    });
  }

  filterLoans(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    if (status === 'all') {
      this.filteredLoans = this.allLoans;
    } else {
      this.filteredLoans = this.allLoans.filter(loan => loan.status === status);
    }
  }

  markAsReturned(loanId: string): void {
    this.loanService.returnBook(loanId).subscribe({
      next: () => this.loadLoans(),
      error: (error) => console.error('Error returning book:', error)
    });
  }
}