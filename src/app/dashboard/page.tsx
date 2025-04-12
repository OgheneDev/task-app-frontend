'use client'
import { motion } from 'framer-motion';
import { FiCheckSquare, FiClock, FiTrello, FiList } from 'react-icons/fi';
import { StatItem, Task } from '@/types/types';
import { getTasks } from '@/api/tasks/requests';
import { getTasksByStatus, getTasksByPriority, getCompletionTrends, getOverdueTasks } from '@/api/analytics/requests';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { StatCard } from '@/components/dashboard/StatCard';
import { TaskList } from '@/components/dashboard/TaskList';
import { LoadingState } from '@/components/dashboard/LoadingState';

const DashboardPage = () =>  {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Fetch tasks and analytics data
        const [
          tasksData,
          statusData,
          priorityData,
          trendsData,
          overdueData
        ] = await Promise.all([
          getTasks(),
          getTasksByStatus(),
          getTasksByPriority(),
          getCompletionTrends(),
          getOverdueTasks()
        ]);

        // Ensure tasksData is an array
        const validTasks = Array.isArray(tasksData) ? tasksData : [];
        setTasks(validTasks);

        // Create stats array from analytics data
        const dashboardStats: StatItem[] = [
          {
            id: 1,
            title: 'Total Tasks',
            value: validTasks.length.toString(),
            Icon: FiList,
            color: 'bg-blue-500'
          },
          {
            id: 2,
            title: 'Completed Tasks',
            value: (validTasks.filter(task => task.status === 'done').length).toString(),
            Icon: FiCheckSquare,
            color: 'bg-green-500'
          },
          {
            id: 3,
            title: 'In Progress',
            value: (validTasks.filter(task => task.status === 'in-progress').length).toString(),
            Icon: FiClock,
            color: 'bg-yellow-500'
          },
          {
            id: 4,
            title: 'Overdue Tasks',
            value: (Array.isArray(overdueData) ? overdueData.length : 0).toString(),
            Icon: FiTrello,
            color: 'bg-red-500'
          }
        ];

        setStats(dashboardStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set default empty values on error
        setTasks([]);
        setStats([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <LoadingState isDark={isDark} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-gray-900 text-white' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto p-3 md:p-8 space-y-8">
        <div className="flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            Dashboard Overview
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} isDark={isDark} />
          ))}
        </div>

        <TaskList tasks={tasks} isDark={isDark} />
      </div>
    </div>
  );
};

export default DashboardPage;