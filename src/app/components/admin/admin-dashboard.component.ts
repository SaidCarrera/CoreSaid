import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookManagementComponent } from './book-management.component';
import { UserManagementComponent } from './user-management.component';
import { AnalyticsDashboardComponent } from './analytics-dashboard.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BookManagementComponent, UserManagementComponent, AnalyticsDashboardComponent],
  template: `
    <div class="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div class="dashboard-grid">
        <!-- Books Section -->
        <div class="dashboard-card">
          <h3>Books Management</h3>
          <div class="button-group">
            <button routerLink="books" class="primary">View All Books</button>
            <button routerLink="books/new" class="success">Add New Book</button>
          </div>
        </div>

        <!-- Users Section -->
        <div class="dashboard-card">
          <h3>User Management</h3>
          <div class="button-group">
            <button routerLink="users" class="primary">View All Users</button>
            <button routerLink="users/active" class="info">Active Users</button>
          </div>
        </div>

        <!-- Loans Section -->
        <div class="dashboard-card">
          <h3>Loan Management</h3>
          <div class="button-group">
            <button routerLink="loans" class="primary">View All Loans</button>
            <button routerLink="loans/active" class="warning">Active Loans</button>
          </div>
        </div>

        <!-- Reports Section -->
        <div class="dashboard-card">
          <h3>Reports & Analytics</h3>
          <div class="button-group">
            <button routerLink="reports" class="primary">View Reports</button>
            <button routerLink="reports/analytics" class="info">Analytics Dashboard</button>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h3>Quick Actions</h3>
        <div class="action-buttons">
          <button routerLink="books/new" class="success">
            <i class="fas fa-plus"></i> Add New Book
          </button>
          <button routerLink="loans/new" class="primary">
            <i class="fas fa-book"></i> Create New Loan
          </button>
          <button routerLink="reports/generate" class="info">
            <i class="fas fa-chart-bar"></i> Generate Report
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      color: #2c3e50;
      margin-bottom: 30px;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .dashboard-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .dashboard-card h3 {
      color: #2c3e50;
      margin: 0 0 15px 0;
      font-size: 1.2rem;
    }

    .button-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    button.primary {
      background-color: #3498db;
      color: white;
    }

    button.success {
      background-color: #2ecc71;
      color: white;
    }

    button.warning {
      background-color: #f1c40f;
      color: #2c3e50;
    }

    button.info {
      background-color: #9b59b6;
      color: white;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .quick-actions {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-top: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .quick-actions h3 {
      color: #2c3e50;
      margin: 0 0 15px 0;
    }

    .action-buttons {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .action-buttons button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
    }

    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
      
      .action-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class AdminDashboardComponent {}