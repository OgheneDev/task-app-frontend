'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { login } from '@/api/auth/requests';
import { 
  Mail, 
  Lock, 
  LogIn, 
  UserPlus, 
  AlertCircle,
  Loader2 
} from 'lucide-react';

interface LoginError {
  message: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  // Ensure hydration mismatch is avoided
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isDark = theme === 'dark';

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
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
          >
            <LogIn className={`h-8 w-8 ${isDark ? 'text-white' : 'text-gray-900'}`} />
          </motion.div>
          <motion.h2 
            className={`mt-6 text-center text-3xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Sign in to your account
          </motion.h2>
          <motion.p 
            className={`mt-2 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Or{' '}
            <Link href="/register" className={`font-medium ${isDark ? 'text-[#38bdf8] hover:text-[#7dd3fc]' : 'text-[#0284c7] hover:text-[#0ea5e9]'} transition-colors`}>
              <span className="inline-flex items-center">
                create a new account
                <UserPlus className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </motion.p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              className={`rounded-md ${isDark ? 'bg-red-900/30' : 'bg-red-50'} p-4`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${isDark ? 'text-red-200' : 'text-red-800'}`}>{error}</h3>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="rounded-md shadow-sm p-4 space-y-3">
            <div className="relative">
                <div className="flex gap-2 items-center mb-3">
                 <Mail className={` h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                 <label htmlFor="email-address" className="text-sm">
                  Email address
                 </label>
                </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none rounded-none relative block w-full pl-10 px-3 py-3 border ${
                  isDark 
                    ? 'border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]' 
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]'
                } rounded-t-md focus:outline-none focus:z-10 transition-colors`}
                placeholder="Email address"
              />
            </div>
            <div className="relative">
            <div className="flex gap-2 items-center mb-3">
                 <Lock className={` h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                 <label htmlFor="password" className="text-sm">
                  Password
                 </label>
            </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-none relative block w-full pl-10 px-3 py-3 border ${
                  isDark 
                    ? 'border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]' 
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]'
                } rounded-b-md focus:outline-none focus:z-10 transition-colors`}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link href="/forgot-password" className={`font-medium ${isDark ? 'text-[#38bdf8] hover:text-[#7dd3fc]' : 'text-[#0284c7] hover:text-[#0ea5e9]'} transition-colors`}>
                Forgot your password?
              </Link>
            </div>
          </div>

          <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
            <button
              type="submit"
              disabled={isLoading}
              className={`
                group relative w-full flex justify-center py-3 px-4 
                border border-transparent text-sm font-medium rounded-md 
                text-white bg-[#0284c7] hover:bg-[#0369a1]
                dark:bg-[#0ea5e9] dark:hover:bg-[#0284c7]
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-[#0ea5e9] dark:focus:ring-[#38bdf8] 
                transition-colors cursor-pointer
                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
              ) : (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn className="h-5 w-5 text-[#7dd3fc] group-hover:text-[#bae6fd]" />
                </span> 
              )}
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default LoginPage;