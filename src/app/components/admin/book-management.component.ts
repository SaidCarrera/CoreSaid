import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="book-management">
      <h2>Book Management</h2>
      
      <form [formGroup]="bookForm" (ngSubmit)="onSubmit()" class="book-form">
        <div class="form-group">
          <label for="title">Title</label>
          <input id="title" type="text" formControlName="title">
        </div>
        <div class="form-group">
          <label for="author">Author</label>
          <input id="author" type="text" formControlName="author">
        </div>
        <div class="form-group">
          <label for="ISBN">ISBN</label>
          <input id="ISBN" type="text" formControlName="ISBN">
        </div>
        <div class="form-group">
          <label for="publicationYear">Publication Year</label>
          <input id="publicationYear" type="number" formControlName="publicationYear">
        </div>
        <div class="form-group">
          <label for="language">Language</label>
          <input id="language" type="text" formControlName="language">
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" formControlName="category">
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="science">Science</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <button type="submit" [disabled]="bookForm.invalid">
          {{ selectedBook ? 'Update' : 'Add' }} Book
        </button>
      </form>

      <div class="books-list">
        <h3>Books List</h3>
        <div class="book-item" *ngFor="let book of books">
          <div class="book-details">
            <h4>{{ book.title }}</h4>
            <p>{{ book.author }} - {{ book.ISBN }}</p>
          </div>
          <div class="book-actions">
            <button (click)="editBook(book)">Edit</button>
            <button (click)="deleteBook(book.id!)" class="delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .book-management {
      padding: 20px;
    }
    .book-form {
      max-width: 600px;
      margin-bottom: 30px;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
    }
    .form-group input, .form-group select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .books-list {
      margin-top: 30px;
    }
    .book-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin-bottom: 10px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .book-actions {
      display: flex;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button.delete {
      background-color: #dc3545;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class BookManagementComponent implements OnInit {
  books: Book[] = [];
  bookForm: FormGroup;
  selectedBook: Book | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      ISBN: ['', Validators.required],
      publicationYear: ['', Validators.required],
      language: ['', Validators.required],
      category: ['', Validators.required],
      available: [true]
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.searchBooks({}).subscribe({
      next: (books) => this.books = books,
      error: (error) => console.error('Error loading books:', error)
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      if (this.selectedBook) {
        this.bookService.updateBook(this.selectedBook.id!, bookData).subscribe({
          next: () => {
            this.loadBooks();
            this.resetForm();
          },
          error: (error) => console.error('Error updating book:', error)
        });
      } else {
        this.bookService.createBook(bookData).subscribe({
          next: () => {
            this.loadBooks();
            this.resetForm();
          },
          error: (error) => console.error('Error creating book:', error)
        });
      }
    }
  }

  editBook(book: Book): void {
    this.selectedBook = book;
    this.bookForm.patchValue(book);
  }

  deleteBook(id: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks(),
        error: (error) => console.error('Error deleting book:', error)
      });
    }
  }

  resetForm(): void {
    this.selectedBook = null;
    this.bookForm.reset({ available: true });
  }
}