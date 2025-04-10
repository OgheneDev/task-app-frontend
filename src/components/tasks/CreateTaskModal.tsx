import React, { useState, useEffect } from 'react'
import { Task } from '@/types/types';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Loader2 } from 'lucide-react';

interface CreateTaskModalProps {
    isOpen: boolean
    onClose: () => void;
    onSubmit: (task: Omit<Task, '_id'>) => Promise<void>;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onSubmit}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'high' as 'high' | 'medium' | 'low',
        status: 'todo' as 'todo' | 'in-progress' | 'completed',
        dueDate: '',
        dueTime: '',
        tags: [],
        category: '',
        attachments: [],
        user: '', // Add user ID here
        collaborators: [],
        isRecurring: false,
        recurrencePattern: {
        interval: 0,
        daysOfWeek: []
    },// Added missing field
        timeTracking: {
            totalTime: 0,
            timeEntries: [] // You might want to define a specific type for timeEntries
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0 // Added missing field
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            await onSubmit(formData)
            setFormData({
                title: '',
                description: '',
                priority: 'high' as 'high' | 'medium' | 'low',
                status: 'todo' as 'todo' | 'in-progress' | 'completed',
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
    },// Added missing field
                timeTracking: {
                    totalTime: 0,
                    timeEntries: [] // You might want to define a specific type for timeEntries
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                __v: 0 // Added missing field
            });
            onClose();
        } catch (error) {
            console.error('Error creating task:', error)
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

  return (
    <AnimatePresence>
        {isOpen && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
            >
                <motion.div
                 initial={{ scale: 0.95, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.95, opacity: 0 }}
                 className="bg-white rounded-xl w-full h-[90vh] max-w-xl overflow-auto"
                 onClick={e => e.stopPropagation()}
                >
                   {/* Header */}
                   <div className="flex justify-between items-center p-6 border-b">
                     <h2 className="text-xl font-semibold text-[#161E2D]">Create New Task</h2>
                     <button
                       onClick={onClose}
                       className="p-2 hover:bg-gray-100 cursor-pointer rounded-full transition-colors"
                      >
                       <X size={20} />
                     </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Priority */}
                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="todo">To Do</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            {/* Due Date and Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700">Due Time</label>
                                    <input
                                        type="time"
                                        id="dueTime"
                                        name="dueTime"
                                        value={formData.dueTime}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="mr-3 px-4 cursor-pointer py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md disabled:opacity-50 flex gap-2"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                ) : (
                                    <Plus className="h-5 w-5 text-[#7dd3fc] group-hover:text-[#bae6fd]" />
                                )}
                                {isSubmitting ? 'Creating...' : 'Create Task'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default CreateTaskModal