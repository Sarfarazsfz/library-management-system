import { Book } from './Book';
import { User } from './User';

export interface Issue {
    id: number;
    book: Book;
    bookId: number;
    bookTitle: string;
    bookIsbn: string;
    user: User;
    userId: number;
    userName: string;
    memberName: string;
    memberEmail: string;
    issueDate: string;
    dueDate: string;
    returnDate?: string;
    fine: number;
    status: 'ISSUED' | 'RETURNED' | 'OVERDUE';
    remarks?: string;
    createdAt: string;
    updatedAt: string;
}

export interface IssueFormData {
    bookId: number;
    memberName: string;
    memberEmail: string;
    remarks?: string;
}
