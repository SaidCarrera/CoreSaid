import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <h3>Manage Books</h3>
          <button routerLink="books">View Books</button>
        </div>
        <div class="dashboard-card">
          <h3>User Management</h3>
          <button routerLink="users">View Users</button>
        </div>
        <div class="dashboard-card">
          <h3>Reports</h3>
          <button routerLink="reports">View Reports</button>
        </div>
        <div class="dashboard-card">
          <h3>Loans</h3>
          <button routerLink="loans">View Loans</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 20px;
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .dashboard-card {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    button {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AdminDashboardComponent {}