import { motion } from 'framer-motion';
import { StatCardProps } from '@/types/analytics';
import { useTheme } from '@/hooks/useTheme';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export const StatCard = ({ icon, title, value, color, index }: StatCardProps) => {
  const {theme} = useTheme();

  const isDark = theme === 'dark'

  return(
    <motion.div 
    className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl cursor-pointer shadow-sm p-4 flex items-center`}
    variants={fadeInUpVariants}
    initial="hidden"
    animate="visible"
    custom={index}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="p-3 mr-4 rounded-lg" style={{ backgroundColor: `${color}20` }}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={`${isDark ? 'text-white' : 'text-black'} text-xl font-bold`}>{value}</p>
    </div>
  </motion.div>
  );
};
