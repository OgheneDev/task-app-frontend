import { motion } from 'framer-motion';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { BarChart2, PieChart } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartSectionProps {
  statusData: ChartData<'bar'> | null;
  priorityData: ChartData<'doughnut'> | null;
  barOptions: ChartOptions<'bar'>;
  doughnutOptions: ChartOptions<'doughnut'>;
  loading: boolean;
}

const barChartVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.8
    }
  }
};

const doughnutChartVariants = {
  hidden: { rotate: -90, opacity: 0, scale: 0.8 },
  visible: {
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 11,
      duration: 1.2
    }
  }
};

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="h-48 bg-gray-200 rounded-lg"></div>
  </div>
);

export const ChartSection = ({ statusData, priorityData, barOptions, doughnutOptions, loading }: ChartSectionProps) => {
  const {theme} = useTheme();
  const isDark = theme === 'dark'
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm`}>
          <SkeletonLoader />
        </div>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm`}>
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Status Chart */}
      <motion.div 
        className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm overflow-hidden`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BarChart2 size={20} className="text-indigo-600 mr-2" />
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Tasks by Status</h2>
          </div>
        </div>
        {statusData ? (
          <motion.div
            variants={barChartVariants}
            initial="hidden"
            animate="visible"
            className={`w-full h-72 ${isDark ? 'text-white' : 'text-gray-800'}`}
          >
            <Bar options={barOptions} data={statusData} />
          </motion.div>
        ) : (
          <div className="flex justify-center items-center h-72 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-gray-500">No status data available</p>
          </div>
        )}
      </motion.div>

      {/* Priority Chart */}
      <motion.div 
        className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-sm overflow-hidden`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* ...similar structure for priority chart... */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <PieChart size={20} className="text-amber-500 mr-2" />
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Tasks by Priority</h2>
          </div>
          {/* ... rest of the priority chart JSX ... */}
        </div>
        {priorityData && (
          <motion.div
            variants={doughnutChartVariants}
            initial="hidden"
            animate="visible"
            className="w-full h-72 flex items-center justify-center"
          >
            <Doughnut options={doughnutOptions} data={priorityData} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
