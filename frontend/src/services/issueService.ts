import api from './api';
import { Issue, IssueFormData } from '../types/Issue';

const issueService = {
    issueBook: async (data: IssueFormData): Promise<Issue> => {
        const response = await api.post<Issue>('/issues', data);
        return response.data;
    },

    returnBook: async (id: number): Promise<Issue> => {
        const response = await api.put<Issue>(`/issues/return/${id}`);
        return response.data;
    },

    getAllIssues: async (): Promise<Issue[]> => {
        const response = await api.get<Issue[]>('/issues');
        return response.data;
    },

    getIssueById: async (id: number): Promise<Issue> => {
        const response = await api.get<Issue>(`/issues/${id}`);
        return response.data;
    },

    getOverdueIssues: async (): Promise<Issue[]> => {
        const response = await api.get<Issue[]>('/issues/overdue');
        return response.data;
    },

    getActiveIssues: async (): Promise<Issue[]> => {
        const response = await api.get<Issue[]>('/issues/active');
        return response.data;
    },

    getDashboardStats: async (): Promise<any> => {
        const response = await api.get('/issues/dashboard/stats');
        return response.data;
    },
};

export default issueService;
