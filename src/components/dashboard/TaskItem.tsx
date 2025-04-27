import React from 'react'
import { motion } from 'framer-motion';
import { Task } from '@/types/types';

type TaskItemProps = {
    task: Task;
    isDark: boolean;
}

const TaskItem = ({ task, isDark }:  TaskItemProps) => {
    return (
      <motion.div
        whileHover={{ scale: 1.005 }}
        className={`p-6 transition-all cursor-pointer ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2">
            <h3 className={`text-lg font-medium leading-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{task.title}</h3>
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
            ${task.status === 'done' ? 'bg-green-100 text-green-700' :
            task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
            'bg-red-100 text-red-700'} ${isDark && 'opacity-90'}`}>
            {task.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
        </div>
      </motion.div>
    );
  };

export default TaskItem