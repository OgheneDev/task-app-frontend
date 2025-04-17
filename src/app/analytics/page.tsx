'use client';
import { useEffect, useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { getTasksByStatus, getTasksByPriority, getCompletionTrends, getOverdueTasks } from '@/api/analytics/requests';
import { getTasks } from '@/api/tasks/requests';
import { Activity, Layers, AlertTriangle, CheckCircle, Coffee } from 'lucide-react';
import { StatCard } from '@/components/analytics/StatCard';
import { StatCardSkeleton } from '@/components/analytics/StatCardSkeleton';
import { ChartSection } from '@/components/analytics/ChartSection';

export default function AnalyticsPage() {
  const [statusData, setStatusData] = useState<ChartData<'bar'> | null>(null);
  const [priorityData, setPriorityData] = useState<ChartData<'doughnut'> | null>(null);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const colorPalette = {
    primary: '#6366F1',
    secondary: '#F59E0B',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F97316',
    info: '#3B82F6',
    background: '#F9FAFB',
    cardBg: '#FFFFFF',
    textDark: '#1F2937',
    textLight: '#6B7280',
    chartColors: [
      'rgba(99, 102, 241, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(249, 115, 22, 0.8)',
      'rgba(59, 130, 246, 0.8)',
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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

        // Calculate task statistics
        const validTasks = Array.isArray(tasksData) ? tasksData : [];
        const total = validTasks.length;
        const completed = validTasks.filter(task => task.status === 'done').length;
        setTotalTasks(total);
        setCompletedTasks(completed);

        // Status chart data
        if (Array.isArray(statusData)) {
          setStatusData({
            labels: statusData.map(item => item._id),
            datasets: [{
              label: 'Tasks',
              data: statusData.map(item => item.count),
              backgroundColor: colorPalette.chartColors,
              borderColor: colorPalette.chartColors.map(color => color.replace('0.8', '1')),
              borderWidth: 1,
              borderRadius: 6
            }]
          });
        }

        // Priority chart data
        if (Array.isArray(priorityData)) {
          setPriorityData({
            labels: priorityData.map(item => item._id),
            datasets: [{
              label: 'Tasks by Priority',
              data: priorityData.map(item => item.count),
              backgroundColor: colorPalette.chartColors,
              borderColor: colorPalette.chartColors.map(color => color.replace('0.8', '1')),
              borderWidth: 1,
              hoverOffset: 6
            }]
          });
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          font: {
            size: 12
          },
          color: colorPalette.textLight
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          },
          color: colorPalette.textLight
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12
          },
          color: colorPalette.textDark,
          usePointStyle: true,
          padding: 20
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: colorPalette.textDark,
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        cornerRadius: 8,
        boxPadding: 6
      }
    },
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '70%',
    animation: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 12
          },
          color: colorPalette.textDark,
          usePointStyle: true,
          padding: 16
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: colorPalette.textDark,
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        cornerRadius: 8,
        boxPadding: 6
      }
    },
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-1 py-3 md:px-4 md:py-8">
        {/* Header section remains the same */}
        <h1 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text mb-5 text-transparent'>
            View Analytics
        </h1>
        
        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard 
                icon={<Layers size={24} color={colorPalette.primary} />} 
                title="Total Tasks" 
                value={totalTasks} 
                color={colorPalette.primary}
                index={0}
              />
              <StatCard 
                icon={<CheckCircle size={24} color={colorPalette.success} />} 
                title="Completed" 
                value={completedTasks} 
                color={colorPalette.success}
                index={1}
              />
              <StatCard 
                icon={<AlertTriangle size={24} color={colorPalette.warning} />} 
                title="Pending" 
                value={totalTasks - completedTasks} 
                color={colorPalette.warning}
                index={2}
              />
              <StatCard 
                icon={<Activity size={24} color={colorPalette.secondary} />} 
                title="Completion Rate" 
                value={`${totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0}%`} 
                color={colorPalette.secondary}
                index={3}
              />
            </>
          )}
        </div>

        {/* Charts Section */}
        <ChartSection 
          statusData={statusData}
          priorityData={priorityData}
          barOptions={barOptions}
          doughnutOptions={doughnutOptions}
          loading={loading}
        />
      </div>
    </div>
  );
}