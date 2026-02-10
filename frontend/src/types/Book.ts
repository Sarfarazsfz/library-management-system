export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    category?: string;
    publisher?: string;
    publicationYear?: number;
    quantity: number;
    availableCopies: number;
    price?: number;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface BookFormData {
    title: string;
    author: string;
    isbn: string;
    category: string;
    publisher: string;
    publicationYear: number;
    quantity: number;
    price: number;
    description: string;
}
