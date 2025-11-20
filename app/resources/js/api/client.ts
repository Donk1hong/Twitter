import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
    authToken = token;
};

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

export const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return (
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            'Не удалось выполнить запрос.'
        );
    }
    return 'Произошла непредвиденная ошибка.';
};
