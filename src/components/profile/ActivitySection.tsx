'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Trophy } from 'lucide-react'

const ActivitySection = () => {
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
      className="space-y-4"
    >
      <h3 className="text-xl font-semibold">Activity Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          variants={item}
          whileHover={{ scale: 1.03 }}
          className="stat-card p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <h4 className="text-gray-600">Tasks Completed</h4>
          </div>
          <p className="text-3xl font-bold text-gray-900">127</p>
        </motion.div>

        <motion.div 
          variants={item}
          whileHover={{ scale: 1.03 }}
          className="stat-card p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <h4 className="text-gray-600">Time Logged</h4>
          </div>
          <p className="text-3xl font-bold text-gray-900">48h</p>
        </motion.div>

        <motion.div 
          variants={item}
          whileHover={{ scale: 1.03 }}
          className="stat-card p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h4 className="text-gray-600">Achievement Points</h4>
          </div>
          <p className="text-3xl font-bold text-gray-900">850</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ActivitySection