import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="register-container">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h2>Register</h2>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" formControlName="name">
          <div class="error" *ngIf="registerForm.get('name')?.touched && registerForm.get('name')?.invalid">
            Name is required
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email">
          <div class="error" *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.invalid">
            Valid email is required
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" formControlName="password">
          <div class="error" *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid">
            Password must be at least 6 characters
          </div>
        </div>
        <button type="submit" [disabled]="registerForm.invalid">Register</button>
        <p class="login-link">
          Already have an account? <a routerLink="/login">Login here</a>
        </p>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    form {
      width: 300px;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      background: white;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      margin-top: 4px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
    }
    .error {
      color: #dc3545;
      font-size: 0.8em;
      margin-top: 5px;
    }
    .login-link {
      text-align: center;
      margin-top: 15px;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (error) => console.error('Registration failed:', error)
      });
    }
  }
}