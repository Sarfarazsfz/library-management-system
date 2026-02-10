import api from './api';
import { User } from '../types/User';

const userService = {
    getAllUsers: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/users');
        return response.data;
    },

    getUserById: async (id: number): Promise<User> => {
        const response = await api.get<User>(`/users/${id}`);
        return response.data;
    },

    updateUser: async (id: number, user: any): Promise<User> => {
        const response = await api.put<User>(`/users/${id}`, user);
        return response.data;
    },

    deleteUser: async (id: number): Promise<void> => {
        await api.delete(`/users/${id}`);
    },
};

export default userService;
