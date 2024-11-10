import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="searchForm" (ngSubmit)="onSubmit()" class="search-form">
      <div class="form-group">
        <input 
          type="text" 
          formControlName="title" 
          placeholder="Search by title">
      </div>
      <div class="form-group">
        <input 
          type="text" 
          formControlName="author" 
          placeholder="Search by author">
      </div>
      <div class="form-group">
        <select formControlName="category">
          <option value="">All Categories</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="science">Science</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <button type="submit">Search</button>
    </form>
  `,
  styles: [`
    .search-form {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .form-group {
      flex: 1;
    }
    input, select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class BookSearchComponent {
  @Output() search = new EventEmitter<Partial<Book>>();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      title: [''],
      author: [''],
      category: ['']
    });
  }

  onSubmit(): void {
    const filters = Object.fromEntries(
      Object.entries(this.searchForm.value).filter(([_, v]) => v !== '')
    );
    this.search.emit(filters);
  }
}