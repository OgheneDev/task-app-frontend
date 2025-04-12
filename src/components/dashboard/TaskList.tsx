import { motion } from 'framer-motion';
import { Task } from '@/types/types';
import TaskItem from './TaskItem';
import Link from 'next/link';

type TaskListProps = {
  tasks: Task[];
  isDark: boolean;
};

export const TaskList = ({ tasks, isDark }: TaskListProps) => {
  const recentTasks = tasks.slice(0, 3);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recent Tasks</h2>
        <Link
         href='/tasks'
        >
          <button className="text-xs cursor-pointer px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full font-medium">
          View More
        </button>
        </Link>
      </div> 
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {recentTasks.length > 0 ? recentTasks.map((task) => (
          <TaskItem key={task._id} task={task} isDark={isDark} />
        )) : ( 
          <div className="p-8 text-center">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No tasks available
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};


