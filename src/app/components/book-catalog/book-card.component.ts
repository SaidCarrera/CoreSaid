import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="book-card">
      <h3>{{ book.title }}</h3>
      <p>Author: {{ book.author }}</p>
      <p>ISBN: {{ book.ISBN }}</p>
      <p>Year: {{ book.publicationYear }}</p>
      <p>Language: {{ book.language }}</p>
      <p>Category: {{ book.category }}</p>
      <div class="actions">
        <button 
          [disabled]="!book.available" 
          (click)="borrow.emit(book.id)">
          Borrow
        </button>
        <button 
          [disabled]="!book.available" 
          (click)="reserve.emit(book.id)">
          Reserve
        </button>
      </div>
    </div>
  `,
  styles: [`
    .book-card {
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      background: white;
    }
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    button {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class BookCardComponent {
  @Input() book!: Book;
  @Output() borrow = new EventEmitter<string>();
  @Output() reserve = new EventEmitter<string>();
}