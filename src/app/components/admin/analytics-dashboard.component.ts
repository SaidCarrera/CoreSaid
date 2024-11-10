import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { LoanStats, BookStats, UserStats } from '../../models/report.model';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytics-dashboard">
      <h2>Library Analytics</h2>
      
      <div class="stats-grid">
        <div class="stats-card">
          <h3>Loan Statistics</h3>
          <div class="stats-content" *ngIf="loanStats">
            <div class="stat-item">
              <span class="label">Total Loans</span>
              <span class="value">{{ loanStats.totalLoans }}</span>
            </div>
            <div class="stat-item">
              <span class="label">Active Loans</span>
              <span class="value">{{ loanStats.activeLoans }}</span>
            </div>
            <div class="stat-item">
              <span class="label">Overdue Loans</span>
              <span class="value">{{ loanStats.overdueLoans }}</span>
            </div>
            <div class="stat-item">
              <span class="label">Avg. Duration (days)</span>
              <span class="value">{{ loanStats.averageLoanDuration | number:'1.0-1' }}</span>
            </div>
          </div>
        </div>

        <div class="stats-card">
          <h3>Book Statistics</h3>
          <div class="stats-content" *ngIf="bookStats">
            <div class="stat-item">
              <span class="label">Total Books</span>
              <span class="value">{{ bookStats.totalBooks }}</span>
            </div>
            <div class="stat-item">
              <span class="label">Available Books</span>
              <span class="value">{{ bookStats.availableBooks }}</span>
            </div>
            <div class="popular-books">
              <h4>Most Borrowed Books</h4>
              <ul>
                <li *ngFor="let book of bookStats.mostBorrowedBooks">
                  {{ book.title }} by {{ book.author }}
                  <span class="count">({{ book.loanCount }} loans)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="stats-card">
          <h3>User Statistics</h3>
          <div class="stats-content" *ngIf="userStats">
            <div class="stat-item">
              <span class="label">Total Users</span>
              <span class="value">{{ userStats.totalUsers }}</span>
            </div>
            <div class="stat-item">
              <span class="label">Active Users</span>
              <span class="value">{{ userStats.activeUsers }}</span>
            </div>
            <div class="top-borrowers">
              <h4>Top Borrowers</h4>
              <ul>
                <li *ngFor="let user of userStats.topBorrowers">
                  {{ user.name }}
                  <span class="count">({{ user.loanCount }} loans)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics-dashboard {
      padding: 20px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .stats-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .stats-card h3 {
      margin: 0 0 20px 0;
      color: #2c3e50;
    }
    .stat-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
    .label {
      color: #666;
    }
    .value {
      font-weight: bold;
      color: #2c3e50;
    }
    .popular-books,
    .top-borrowers {
      margin-top: 20px;
    }
    .popular-books h4,
    .top-borrowers h4 {
      margin-bottom: 10px;
      color: #2c3e50;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .count {
      font-size: 0.9em;
      color: #666;
    }
  `]
})
export class AnalyticsDashboardComponent implements OnInit {
  loanStats: LoanStats | null = null;
  bookStats: BookStats | null = null;
  userStats: UserStats | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.adminService.getLoanStats().subscribe({
      next: (stats) => this.loanStats = stats,
      error: (error) => console.error('Error loading loan stats:', error)
    });

    this.adminService.getBookStats().subscribe({
      next: (stats) => this.bookStats = stats,
      error: (error) => console.error('Error loading book stats:', error)
    });

    this.adminService.getUserStats().subscribe({
      next: (stats) => this.userStats = stats,
      error: (error) => console.error('Error loading user stats:', error)
    });
  }
}