import api from './api';
import { Book, BookFormData } from '../types/Book';

const bookService = {
    getAllBooks: async (): Promise<Book[]> => {
        const response = await api.get<Book[]>('/books');
        return response.data;
    },

    getBookById: async (id: number): Promise<Book> => {
        const response = await api.get<Book>(`/books/${id}`);
        return response.data;
    },

    createBook: async (book: BookFormData): Promise<Book> => {
        const response = await api.post<Book>('/books', book);
        return response.data;
    },

    updateBook: async (id: number, book: BookFormData): Promise<Book> => {
        const response = await api.put<Book>(`/books/${id}`, book);
        return response.data;
    },

    deleteBook: async (id: number): Promise<void> => {
        await api.delete(`/books/${id}`);
    },

    searchBooks: async (keyword: string): Promise<Book[]> => {
        const response = await api.get<Book[]>(`/books/search?keyword=${encodeURIComponent(keyword)}`);
        return response.data;
    },
};

export default bookService;
