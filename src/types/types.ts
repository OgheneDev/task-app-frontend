import { IconType } from "react-icons";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface ErrorResponse {
    message?: string;
    error?: string;
    success: boolean;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

export interface ForgotPasswordCredentials {
    email: string;
}

export interface ResetPasswordCredentials {
    password: string;
}

export interface UpdatePasswordCredentials {
    currentPassword: string;
    newPassword: string;
  }
  
  export interface UpdateDetailsCredentials {
    username?: string;
    bio?: string;
  }
  
  export interface DeleteAccountCredentials {
    password: string;
  }
  

export interface StatItem {
    id: number;
    title: string;
    value: string;
    Icon: IconType;
    color: string;
}
  
interface TimeTracking {
    totalTime: number;
    timeEntries: any[]; // You might want to define a specific type for timeEntries
}

interface RecurrencePattern {
    interval: number;
    daysOfWeek: string[];
}

export interface Task {
    _id: string;
    title: string;
    description: string;
    user: string;
    priority: 'high' | 'medium' | 'low';
    status: 'todo' | 'in_progress' | 'done';
    dueDate: string;
    dueTime: string;
    tags: string[];
    category: string;
    collaborators: string[];
    isRecurring: boolean;
    attachments: string[];
    timeTracking: TimeTracking;
    recurrencePattern: RecurrencePattern;
    createdAt: string;
    updatedAt: string;
    __v: number;
}