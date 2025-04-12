import { Task } from '@/types/types'
import { Trash2, Edit2, Clock, Tag, AlertCircle, CheckCircle, Circle, Clock3, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface TaskTableProps {
  tasks: Task[]
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
}

const TaskTable = ({ tasks, onDelete, onEdit }: TaskTableProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = tasks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': 
        return { 
          bgColor: isDark ? 'bg-red-900/30' : 'bg-red-100', 
          textColor: isDark ? 'text-red-300' : 'text-red-800',
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
        };
      case 'medium': 
        return { 
          bgColor: isDark ? 'bg-orange-900/30' : 'bg-orange-100', 
          textColor: isDark ? 'text-orange-300' : 'text-orange-800',
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
        };
      case 'low': 
        return { 
          bgColor: isDark ? 'bg-blue-900/30' : 'bg-blue-100', 
          textColor: isDark ? 'text-blue-300' : 'text-blue-800',
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
        };
      default: 
        return { 
          bgColor: isDark ? 'bg-gray-800' : 'bg-gray-100', 
          textColor: isDark ? 'text-gray-300' : 'text-gray-800',
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done': 
        return { 
          bgColor: isDark ? 'bg-green-900/30' : 'bg-green-100', 
          textColor: isDark ? 'text-green-300' : 'text-green-800',
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
        };
      case 'in-progress': 
        return { 
          bgColor: isDark ? 'bg-yellow-900/30' : 'bg-yellow-100', 
          textColor: isDark ? 'text-yellow-300' : 'text-yellow-800',
          icon: <Clock3 className="h-3.5 w-3.5 mr-1.5" /> 
        };
      default: 
        return { 
          bgColor: isDark ? 'bg-gray-800' : 'bg-gray-100', 
          textColor: isDark ? 'text-gray-300' : 'text-gray-800',
          icon: <Circle className="h-3.5 w-3.5 mr-1.5" />
        };
    }
  };

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  // Animation variants
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut" 
      }
    })
  };

  const tableContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="mt-8 flow-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="overflow-x-auto rounded-xl shadow-md">
        <div className={`inline-block min-w-full align-middle ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          <table className="min-w-full divide-y divide-gray-700">
            <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th scope="col" className={`px-4 py-3.5 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Task</th>
                <th scope="col" className={`px-4 py-3.5 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Status</th>
                <th scope="col" className={`px-4 py-3.5 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Priority</th>
                <th scope="col" className={`px-4 py-3.5 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Category</th>
                <th scope="col" className={`px-4 py-3.5 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Due Date</th>
                <th scope="col" className={`px-4 py-3.5 text-center text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Actions</th>
              </tr>
            </thead>
            <motion.tbody 
              className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}
              variants={tableContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentTasks.map((task, index) => {
                const priorityConfig = getPriorityConfig(task.priority);
                const statusConfig = getStatusConfig(task.status);
                const overdueTask = isOverdue(task.dueDate) && task.status !== 'done';

                return (
                  <motion.tr 
                    key={task._id} 
                    className={`${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} transition-colors`}
                    variants={tableRowVariants}
                    custom={index}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{task.title}</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} line-clamp-2 max-w-xs`}>{task.description}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                        {statusConfig.icon}
                        <span className="capitalize">{task.status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${priorityConfig.bgColor} ${priorityConfig.textColor}`}>
                        {priorityConfig.icon}
                        <span className="capitalize">{task.priority}</span>
                      </span>
                    </td>
                    <td className={`px-4 py-4 text-sm whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {task.category}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`flex items-center text-sm ${
                        overdueTask 
                          ? (isDark ? 'text-red-400' : 'text-red-600') 
                          : (isDark ? 'text-gray-300' : 'text-gray-700')
                      }`}>
                        <Clock className="h-4 w-4 mr-1.5" />
                        <span>{formatDueDate(task.dueDate)}</span>
                        {task.dueTime && <span className="ml-1.5">{task.dueTime}</span>}
                        {overdueTask && (
                          <motion.span 
                            className={`ml-2 text-xs font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}
                            initial={{ opacity: 0.5, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                          >
                            OVERDUE
                          </motion.span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center space-x-3">
                        <motion.button
                          onClick={() => onEdit(task)}
                          className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} cursor-pointer`}
                          title="Edit task"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Edit2 className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          onClick={() => onDelete(task._id)}
                          className={`${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} cursor-pointer`}
                          title="Delete task"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </table>
          {tasks.length === 0 ? (
            <motion.div 
              className={`flex justify-center items-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              No tasks available
            </motion.div>
          ) : (
            <div className={`flex items-center justify-center py-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <nav className="flex items-center space-x-2" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg cursor-pointer ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} 
                    ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <ChevronLeft className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 cursor-pointer rounded-lg ${
                      currentPage === i + 1
                        ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900')
                        : (isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100')
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg cursor-pointer ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} 
                    ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <ChevronRight className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskTable;