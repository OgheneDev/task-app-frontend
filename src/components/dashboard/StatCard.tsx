import { motion } from 'framer-motion';
import { StatItem } from '@/types/types';

type StatCardProps = {
  stat: StatItem;
  index: number; 
  isDark: boolean;
};

export const StatCard = ({ stat, index, isDark }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative overflow-hidden p-6 rounded-xl cursor-pointer ${isDark ? 'bg-gray-800' : 'bg-white'} 
        shadow-lg hover:shadow-xl transition-all duration-300 border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>
            {stat.title}
          </p>
          <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
        </div>
        <div className={`p-3 rounded-xl ${stat.color.replace('bg-', 'bg-opacity-')} bg-opacity-20`}>
          <stat.Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')} text-opacity-100`} />
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 ${stat.color}`} style={{ width: '60%' }}></div>
    </motion.div>
  );
};
