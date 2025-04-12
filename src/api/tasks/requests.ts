import axiosInstance from "../axios";
import { Task } from "@/types/types";

export const getTasks = async () => {
   try {
    const response = await axiosInstance.get(
        '/api/tasks',
    );
    console.log('API response:', response)
    const { data, status } = response;

    if (response.status !== 200) {
        throw new Error("Failed to fetch tasks");
    }
    return data.data
   } catch (error) {
     console.error('Error fetching tasks', error);
      return [];
    } 
}

export const createTask = async (task: Partial<Task>) => {
    try {
        const response =  await axiosInstance.post('/api/tasks', task);

        if (response.status !== 201) {
            throw new Error("Failed to create task");
        }

        return response.data.data
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

export const deleteTask = async (taskId: string) => {
    try {
        const response = await axiosInstance.delete(`/api/tasks/${taskId}`);

        if (response.status !== 200) {
            throw new Error("Failed to delete task");
        }

        return response.data.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}

export const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    try {
        const response = await axiosInstance.put(`/api/tasks/${taskId}`, updatedTask);

        if (response.status !== 200) {
            throw new Error("Failed to update task");
        }

        return response.data.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}