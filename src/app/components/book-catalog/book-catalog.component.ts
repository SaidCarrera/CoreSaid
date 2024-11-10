import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { BookCardComponent } from './book-card.component';
import { BookSearchComponent } from './book-search.component';

@Component({
  selector: 'app-book-catalog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BookCardComponent, BookSearchComponent],
  template: `
    <div class="catalog-container">
      <h2>Book Catalog</h2>
      <app-book-search (search)="onSearch($event)"></app-book-search>
      <div class="books-grid">
        <app-book-card
          *ngFor="let book of books"
          [book]="book"
          (reserve)="onReserve($event)"
          (borrow)="onBorrow($event)">
        </app-book-card>
      </div>
    </div>
  `,
  styles: [`
    .catalog-container {
      padding: 20px;
    }
    .books-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
  `]
})
export class BookCatalogComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.searchBooks({}).subscribe({
      next: (books) => this.books = books,
      error: (error) => console.error('Error loading books:', error)
    });
  }

  onSearch(filters: Partial<Book>): void {
    this.bookService.searchBooks(filters).subscribe({
      next: (books) => this.books = books,
      error: (error) => console.error('Error searching books:', error)
    });
  }

  onReserve(bookId: string): void {
    // Implement reserve logic
  }

  onBorrow(bookId: string): void {
    // Implement borrow logic
  }
}