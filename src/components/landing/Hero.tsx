'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Manage Tasks with Ease
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay organized, boost productivity, and achieve your goals with our powerful task management solution.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/register"
              className="bg-blue-600 text-sm hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/tasks"
              className="border text-sm border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View Demo
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,51,238,0.1)_25%,rgba(68,51,238,0.1)_50%,transparent_50%,transparent_75%,rgba(68,51,238,0.1)_75%)] bg-[length:24px_24px]"
        ></motion.div>
      </div>
    </section>
  );
};

export default Hero;
