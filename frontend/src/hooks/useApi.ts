import { useState, useCallback } from 'react';
import axios from 'axios';

interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

function useApi<T>() {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = useCallback(async (apiCall: () => Promise<T>) => {
        setState({ data: null, loading: true, error: null });
        try {
            const data = await apiCall();
            setState({ data, loading: false, error: null });
            return data;
        } catch (error: any) {
            const message =
                axios.isAxiosError(error)
                    ? error.response?.data?.message || error.message
                    : 'An unexpected error occurred';
            setState({ data: null, loading: false, error: message });
            throw error;
        }
    }, []);

    return { ...state, execute };
}

export default useApi;
