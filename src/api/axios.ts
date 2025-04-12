import axios from "axios";

// Token management utilities
const tokenUtils = {
    getToken: () => {
        try {
            return localStorage.getItem('authToken');
        } catch (error) {
            console.error('Error reading token:', error);
            return null;
        }
    },
    setToken: (token: string) => {
        try {
            localStorage.setItem('authToken', token);
        } catch (error) {
            console.error('Error setting token:', error);
        }
    },
    removeToken: () => {
        try {
            localStorage.removeItem('authToken');
        } catch (error) {
            console.error('Error removing token:', error);
        }
    }
};

const axiosInstance = axios.create({
    baseURL: 'https://task-app-backend-1-micf.onrender.com/',
    timeout: 1000000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = tokenUtils.getToken();
        console.log('Token from localStorage:', token); // Debug token

        if (!token) {
            console.warn('No authentication token found');
            // Optionally redirect to login if token is required
             window.location.href = '/login';
        }

        if (token) {
            config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${token.trim()}`
            } as any;
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.error('Response Error:', error.response?.status, error.response?.data);
        
        if (error.response?.status === 401) {
            tokenUtils.removeToken();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export { tokenUtils };
export default axiosInstance;