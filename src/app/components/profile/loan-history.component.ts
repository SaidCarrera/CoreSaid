import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanHistory } from '../../models/loan.model';

@Component({
  selector: 'app-loan-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loan-history-container">
      <div class="loan-card" *ngFor="let loan of loans">
        <div class="loan-info">
          <h4>{{ loan.book.title }}</h4>
          <p><strong>Author:</strong> {{ loan.book.author }}</p>
          <p><strong>ISBN:</strong> {{ loan.book.ISBN }}</p>
          <p><strong>Borrowed:</strong> {{ loan.borrowDate | date }}</p>
          <p><strong>Due:</strong> {{ loan.dueDate | date }}</p>
          <p><strong>Status:</strong> 
            <span [class]="'status-' + loan.status">{{ loan.status }}</span>
          </p>
        </div>
        <div class="loan-actions" *ngIf="loan.status === 'active'">
          <button (click)="returnBook.emit(loan.id)">Return Book</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loan-history-container {
      display: grid;
      gap: 20px;
    }
    .loan-card {
      padding: 15px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .loan-info h4 {
      margin: 0 0 10px 0;
    }
    .loan-actions {
      margin-top: 15px;
    }
    .status-active { color: #28a745; }
    .status-returned { color: #6c757d; }
    .status-overdue { color: #dc3545; }
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
export class LoanHistoryComponent {
  @Input() loans: LoanHistory[] = [];
  @Output() returnBook = new EventEmitter<string>();
}