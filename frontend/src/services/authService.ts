import api from './api';
import { LoginRequest, LoginResponse } from '../types/User';

const authService = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },

    register: async (userData: any): Promise<any> => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
};

export default authService;
