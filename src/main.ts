import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { BookCatalogComponent } from './app/components/book-catalog/book-catalog.component';
import { AdminDashboardComponent } from './app/components/admin/admin-dashboard.component';
import { UserProfileComponent } from './app/components/profile/user-profile.component';
import { BookManagementComponent } from './app/components/admin/book-management.component';
import { UserManagementComponent } from './app/components/admin/user-management.component';
import { LoanManagementComponent } from './app/components/admin/loan-management.component';
import { AdminGuard } from './app/guards/admin.guard';
import { AuthGuard } from './app/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'books', 
    component: BookCatalogComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'profile', 
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'admin', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'books', component: BookManagementComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'loans', component: LoanManagementComponent },
      { path: '', redirectTo: 'books', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));