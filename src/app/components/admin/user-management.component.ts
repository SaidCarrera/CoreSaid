import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="user-management">
      <h2>User Management</h2>
      
      <div class="users-list">
        <div class="user-filters">
          <input 
            type="text" 
            placeholder="Search users..." 
            (input)="filterUsers($event)"
            class="search-input">
        </div>

        <div class="user-grid">
          <div class="user-card" *ngFor="let user of filteredUsers">
            <div class="user-info">
              <h3>{{ user.name }}</h3>
              <p>{{ user.email }}</p>
              <p class="role-badge" [class.admin]="user.role === 'admin'">
                {{ user.role }}
              </p>
            </div>
            <div class="user-actions">
              <button (click)="editUser(user)">Edit</button>
              <button 
                class="delete" 
                (click)="deleteUser(user.id!)"
                *ngIf="user.role !== 'admin'">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="edit-modal" *ngIf="selectedUser">
        <div class="modal-content">
          <h3>Edit User</h3>
          <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Name</label>
              <input id="name" type="text" formControlName="name">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email">
            </div>
            <div class="form-group">
              <label for="role">Role</label>
              <select id="role" formControlName="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="modal-actions">
              <button type="submit" [disabled]="userForm.invalid">Save</button>
              <button type="button" class="cancel" (click)="cancelEdit()">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-management {
      padding: 20px;
    }
    .user-filters {
      margin-bottom: 20px;
    }
    .search-input {
      width: 100%;
      max-width: 300px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .user-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .user-card {
      padding: 15px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .user-info h3 {
      margin: 0 0 10px 0;
    }
    .role-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      background: #28a745;
      color: white;
      font-size: 0.8em;
    }
    .role-badge.admin {
      background: #007bff;
    }
    .user-actions {
      margin-top: 15px;
      display: flex;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background: #007bff;
      color: white;
    }
    button.delete {
      background: #dc3545;
    }
    button.cancel {
      background: #6c757d;
    }
    .edit-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
    }
    .form-group input,
    .form-group select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .modal-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
  `]
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  userForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
      },
      error: (error) => console.error('Error loading users:', error)
    });
  }

  filterUsers(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      role: user.role
    });
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (error) => console.error('Error deleting user:', error)
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid && this.selectedUser) {
      this.adminService.updateUser(
        this.selectedUser.id!,
        this.userForm.value
      ).subscribe({
        next: () => {
          this.loadUsers();
          this.cancelEdit();
        },
        error: (error) => console.error('Error updating user:', error)
      });
    }
  }

  cancelEdit(): void {
    this.selectedUser = null;
    this.userForm.reset({ role: 'user' });
  }
}