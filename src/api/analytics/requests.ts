import axiosInstance from "../axios";

export const getTasksByStatus = async () => {
    try {
        const response = await axiosInstance.get('/api/analytics/status');
        console.log('API response:', response)
        const { data, status } = response

        if (response.status !== 200) {
            throw new Error("Failed to fetch tasks by status");
        }
        return data.data
    } catch (error) {
        console.error('Error fetching data', error);
        return[];
    }
}

export const getCompletionTrends = async () => {
    try {
        const response = await axiosInstance.get('/api/analytics/trends');
        console.log('API response:', response)
        const { data, status } = response

        if (response.status !== 200) {
            throw new Error("Failed to fetch trends");
        }
        return data.data
    } catch (error) {
        console.error('Error fetching data', error);
        return[];
    }
}

export const getTasksByPriority = async () => {
    try {
        const response = await axiosInstance.get('/api/analytics/priority');
        console.log('API response:', response)
        const { data, status } = response

        if (response.status !== 200) {
            throw new Error("Failed to fetch tasks by priority");
        }
        return data.data
    } catch (error) {
        console.error('Error fetching data', error);
        return[];
    }
}

export const getOverdueTasks = async () => {
    try {
        const response = await axiosInstance.get('/api/analytics/overdue');
        console.log('API response:', response)
        const { data, status } = response

        if (response.status !== 200) {
            throw new Error("Failed to fetch overdue tasks");
        }
        return data.data
    } catch (error) {
        console.error('Error fetching data', error);
        return[];
    }
}