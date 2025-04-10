import { motion } from 'framer-motion';
import { Task } from '@/types/types';

type TaskListProps = {
  tasks: Task[];
  isDark: boolean;
};

export const TaskList = ({ tasks, isDark }: TaskListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold">Recent Tasks</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {tasks.length > 0 ? tasks.map((task) => (
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

const TaskItem = ({ task, isDark }: { task: Task; isDark: boolean }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      className={`p-6 transition-all ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium leading-6">{task.title}</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
            {task.description}
          </p>
          <div className="flex gap-4 items-center">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
              ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'} ${isDark && 'opacity-90'}`}>
              {task.priority.toUpperCase()}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Due: {new Date(task.dueDate).toLocaleDateString()} {task.dueTime}
            </span>
          </div>
        </div>
        <span className={`px-4 py-2 rounded-lg text-sm font-medium
          ${task.status === 'completed' ? 'bg-green-100 text-green-700' :
          task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
          'bg-red-100 text-red-700'} ${isDark && 'opacity-90'}`}>
          {task.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </span>
      </div>
    </motion.div>
  );
};
