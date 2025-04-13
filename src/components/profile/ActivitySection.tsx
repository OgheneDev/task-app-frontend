'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, ListTodo } from 'lucide-react'
import { getTasks } from '@/api/tasks/requests'
import { Task } from '@/types/types'

const ActivitySection = () => {
  const [taskStats, setTaskStats] = useState({
    completed: 0,
    total: 0,
    pending: 0
  })

  useEffect(() => {
    const fetchTaskStats = async () => {
      const tasks = await getTasks()
      setTaskStats({
        completed: tasks.filter((task: Task) => task.status === 'done').length,
        total: tasks.length,
        pending: tasks.filter((task: Task) => task.status === 'todo' || task.status === 'in_progress').length
      })
    }
    fetchTaskStats()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-white rounded-xl p-6 shadow-sm"
    >
      <h3 className="text-xl font-semibold mb-6">Activity Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          variants={item}
          className="flex items-center gap-4"
        >
          <div className="p-3 bg-green-50 rounded-lg">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Completed Tasks</p>
            <p className="text-xl font-semibold">{taskStats.completed}</p>
          </div>
        </motion.div>

        <motion.div 
          variants={item}
          className="flex items-center gap-4"
        >
          <div className="p-3 bg-blue-50 rounded-lg">
            <Clock className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Tasks</p>
            <p className="text-xl font-semibold">{taskStats.total}</p>
          </div>
        </motion.div>

        <motion.div 
          variants={item}
          className="flex items-center gap-4"
        >
          <div className="p-3 bg-yellow-50 rounded-lg">
            <ListTodo className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Pending Tasks</p>
            <p className="text-xl font-semibold">{taskStats.pending}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ActivitySection