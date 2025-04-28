'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { UserPlus, LogIn } from 'lucide-react';
import { RegisterForm } from '@/components/forms/RegisterForm';

const RegisterPage = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  if (!mounted) return null;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <motion.div 
        className="max-w-md w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.div 
            className={`mx-auto h-16 w-16 rounded-full ${isDark ? 'bg-[#0284c7]' : 'bg-[#0ea5e9]'} flex items-center justify-center shadow-lg`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <UserPlus className={`h-8 w-8 ${isDark ? 'text-white' : 'text-gray-900'}`} />
          </motion.div>
          <motion.h2 
            className={`mt-6 text-center text-3xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Create your account
          </motion.h2>
          <motion.p 
            className={`mt-2 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Already have an account?{' '}
            <Link href="/login" className={`font-medium ${isDark ? 'text-[#38bdf8] hover:text-[#7dd3fc]' : 'text-[#0284c7] hover:text-[#0ea5e9]'} transition-colors`}>
              <span className="inline-flex items-center">
                Sign in here
                <LogIn className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </motion.p>
        </div>

        <RegisterForm isDark={isDark} />
      </motion.div>
    </div>
  );
};

export default RegisterPage;