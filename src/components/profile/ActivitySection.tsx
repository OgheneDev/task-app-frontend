'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, ListTodo } from 'lucide-react'
import { getTasks } from '@/api/tasks/requests'
import { Task } from '@/types/types'

interface ActivitySectionProps {
  isDark: boolean;
}

const ActivitySection = ({ isDark }: ActivitySectionProps) => {
  const [loading, setLoading] = useState(true)
  const [taskStats, setTaskStats] = useState({
    completed: 0,
    total: 0,
    pending: 0
  })
  
  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const tasks = await getTasks()
        setTaskStats({
          completed: tasks.filter((task: Task) => task.status === 'done').length,
          total: tasks.length,
          pending: tasks.filter((task: Task) => task.status === 'todo' || task.status === 'in_progress').length
        })
      } finally {
        setLoading(false)
      }
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

  // Loading skeleton component
  if (loading) {
    return (
      <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className={`h-6 w-48 mb-6 rounded-lg animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-lg animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <div className="space-y-2">
                <div className={`h-4 w-24 rounded animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className={`h-6 w-12 rounded animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`rounded-xl p-6 shadow-sm ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}
    >
      <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : ''}`}>Activity Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          variants={item}
          className="flex items-center gap-4"
        >
          <div className={`p-3 rounded-lg ${isDark ? 'bg-green-900/30' : 'bg-green-50'}`}>
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Completed Tasks</p>
            <p className="text-xl font-semibold">{taskStats.completed}</p>
          </div>
        </motion.div>
        
        <motion.div
          variants={item}
          className="flex items-center gap-4"
        >
          <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
            <Clock className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Tasks</p>
            <p className="text-xl font-semibold">{taskStats.total}</p>
          </div>
        </motion.div>
        
        <motion.div
          variants={item}
          className="flex items-center gap-4"
        >
          <div className={`p-3 rounded-lg ${isDark ? 'bg-yellow-900/30' : 'bg-yellow-50'}`}>
            <ListTodo className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pending Tasks</p>
            <p className="text-xl font-semibold">{taskStats.pending}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ActivitySection