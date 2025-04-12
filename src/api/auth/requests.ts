import axiosInstance, { tokenUtils } from "../axios";
import { AxiosError } from "axios";
import { LoginCredentials, LoginResponse, ErrorResponse, RegisterCredentials } from "@/types/types";
import Cookies from 'js-cookie'

export const login = async ({ email, password }: LoginCredentials): Promise<void> => {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        '/api/auth/login',
        { email, password }
      );
  
      if (response.status === 200) {
        const { token } = response.data;
  
        // Store in localStorage (for axios)
        tokenUtils.setToken(token);
  
        // Store in cookie (for middleware)
        Cookies.set('authToken', token, {
          expires: 7,
          secure: true,
          sameSite: 'strict',
        });
  
        window.location.href = '/dashboard';
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

export const getMe = async () => {
    try {
      const response = await axiosInstance.get('/api/auth/me');
      const { data, status } = response

      if (response.status !== 200) {
        throw new Error('Failed to fetch user');
      }
      return data.data
    } catch (error) {
      console.error("Error Fetching data", error);
      return[];
    }
}

export const logout = () => {
  tokenUtils.removeToken();
  Cookies.remove('authToken');
  window.location.href = '/login';
}
