import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="app-container">
      <nav *ngIf="authService.isAuthenticated()">
        <a routerLink="/books">Books</a>
        <a routerLink="/profile">Profile</a>
        <a routerLink="/admin" *ngIf="authService.isAdmin()">Admin</a>
        <button (click)="logout()">Logout</button>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 20px;
    }
    nav {
      margin-bottom: 20px;
      padding: 10px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
    nav a {
      margin-right: 15px;
      text-decoration: none;
      color: #007bff;
    }
    nav button {
      float: right;
      padding: 5px 10px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}