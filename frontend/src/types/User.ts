export interface User {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'LIBRARIAN';
    phone?: string;
    address?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    type: string;
    user: User;
}

export interface UserFormData {
    name: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    address: string;
}
