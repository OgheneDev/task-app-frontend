'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageSquarePlus } from 'lucide-react'
import { getTasks, createTask, deleteTask, updateTask } from '@/api/tasks/requests'
import { Task } from '@/types/types'
import TaskTable from '@/components/tasks/TaskTable'
import TableSkeleton from '@/components/tasks/TableSkeleton'
import CreateTaskModal from '@/components/tasks/CreateTaskModal'

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => { 
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');
    
    if (!isConfirmed) {
      return;
    }
  
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = async (task: Task) => {
    setSelectedTask(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleUpdateTask = async (taskData: Omit<Task, '_id'>) => {
    if (!selectedTask) return;
    
    try {
      const updatedTask = await updateTask(selectedTask._id, taskData);
      setTasks(tasks.map(task => 
        task._id === selectedTask._id ? updatedTask : task
      ));
      setIsModalOpen(false);
      setIsEditing(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCreateTask = async (taskData: Omit<Task, '_id'>) => {
    const newTask = await createTask(taskData);
    setTasks([...tasks, newTask]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedTask(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-1 py-3 lg:px-8 md:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <h1 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
            View Tasks
          </h1>
          <button onClick={() => setIsModalOpen(true)} className='flex gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white cursor-pointer p-3 rounded-md'>
            Create Task 
            <MessageSquarePlus />
          </button>
        </div>
        
        {isLoading ? <TableSkeleton /> : <TaskTable tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />}

        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={isEditing ? handleUpdateTask : handleCreateTask}
          initialData={selectedTask}
          isEditing={isEditing}
        />
      </motion.div>
    </div>
  )
}

export default Page