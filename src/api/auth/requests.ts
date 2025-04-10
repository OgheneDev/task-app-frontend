import axiosInstance, { tokenUtils } from "../axios";
import { AxiosError } from "axios";
import { LoginCredentials, LoginResponse, ErrorResponse, RegisterCredentials } from "@/types/types";

export const login = async ({ email, password, rememberMe }: LoginCredentials): Promise<void> => {
    try {
        const response = await axiosInstance.post<LoginResponse>(
            '/api/auth/login',
            { email, password }
        );
        
        if (response.status === 200) {
            const { token } = response.data;
            tokenUtils.setToken(token);

            // Wait for storage update before redirecting
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 100);
        } 
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        throw new Error(axiosError.response?.data?.message || 'Login failed');
    }
}

export const register = async ({ username, email, password }: RegisterCredentials): Promise<void> => {
    try {
        const response = await axiosInstance.post(
            '/api/auth/register',
            { username, email, password }
        );

        if (response.status === 200) {
            window.location.href = "/login"
        }
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        throw new Error(axiosError.response?.data?.message || 'Registration failed');
    }
}