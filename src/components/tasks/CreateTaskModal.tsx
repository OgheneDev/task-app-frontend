import React, { useState } from 'react';
import { Task } from '@/types/types';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Loader2, Calendar, Clock, Tag, Menu, Circle } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, '_id'>) => Promise<void>;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'high' as 'high' | 'medium' | 'low',
    status: 'todo' as 'todo' | 'in-progress' | 'done',
    dueDate: '',
    dueTime: '',
    tags: [],
    category: '',
    attachments: [],
    user: '',
    collaborators: [],
    isRecurring: false,
    recurrencePattern: {
      interval: 0,
      daysOfWeek: []
    },
    timeTracking: {
      totalTime: 0,
      timeEntries: []
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        priority: 'high',
        status: 'todo',
        dueDate: '',
        dueTime: '',
        tags: [],
        category: '',
        attachments: [],
        user: '',
        collaborators: [],
        isRecurring: false,
        recurrencePattern: {
          interval: 0,
          daysOfWeek: []
        },
        timeTracking: {
          totalTime: 0,
          timeEntries: []
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      });
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'done':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const inputClassName = `mt-1 block w-full rounded-lg border ${
    isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
  } px-3 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200`;

  const labelClassName = `block text-sm font-medium mb-1 ${
    isDark ? 'text-gray-200' : 'text-gray-700'
  }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`${
              isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
            } rounded-2xl w-full h-[90vh] max-w-xl overflow-hidden shadow-xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Create New Task
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="overflow-y-auto h-[calc(90vh-80px)]">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className={labelClassName}>
                    Task Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter task title"
                    value={formData.title}
                    onChange={handleChange}
                    className={inputClassName}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className={labelClassName}>
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe your task here..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClassName} resize-none`}
                  />
                </div>

                {/* Priority and Status */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Priority */}
                  <div>
                    <label htmlFor="priority" className={labelClassName}>
                      Priority
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Circle 
                          size={16} 
                          className={`${
                            formData.priority === 'high' ? 'text-red-500' : 
                            formData.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                          } fill-current`} 
                        />
                      </div>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label htmlFor="status" className={labelClassName}>
                      Status
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Menu size={16} className="text-gray-400" />
                      </div>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Due Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dueDate" className={labelClassName}>
                      Due Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="dueTime" className={labelClassName}>
                      Due Time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="time"
                        id="dueTime"
                        name="dueTime"
                        value={formData.dueTime}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      />
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className={labelClassName}>
                    Category
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Tag size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      placeholder="Enter a category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`${inputClassName} pl-10`}
                    />
                  </div>
                </div>

                {/* Priority and Status Pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <div className={`${getPriorityColor(formData.priority)} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center`}>
                    <Circle size={12} className="mr-1 fill-current" />
                    {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)} Priority
                  </div>
                  <div className={`${getStatusColor(formData.status)} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center`}>
                    <Circle size={12} className="mr-1 fill-current" />
                    {formData.status === 'todo' ? 'To Do' : 
                     formData.status === 'in-progress' ? 'In Progress' : 'Completed'}
                  </div>
                </div>

                {/* Submit Button */}
                <div className={`sticky bottom-0 pt-6 pb-4 mt-6 flex justify-end gap-3 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                  <button
                    type="button"
                    onClick={onClose}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isDark
                        ? 'text-white bg-gray-800 hover:bg-gray-700'
                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 ${
                      isSubmitting
                        ? 'bg-blue-500 opacity-70'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    {isSubmitting ? 'Creating...' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateTaskModal;