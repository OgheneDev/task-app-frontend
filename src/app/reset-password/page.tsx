'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { resetPassword } from '@/api/auth/requests';
import { KeyRound, ArrowLeft, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import Swal from 'sweetalert2';
import PasswordStrength from '@/components/password/PasswordStrength';
import PasswordChecklist from '@/components/password/PasswordChecklist';

interface PasswordChecks {
  minLength: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  hasUpper: boolean;
  hasLower: boolean;
}

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState<PasswordChecks>({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUpper: false,
    hasLower: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add early return if not mounted
  if (!mounted) {
    return null;
  }

  const validatePassword = (pass: string) => {
    setPasswordChecks({
      minLength: pass.length >= 8,
      hasNumber: /\d/.test(pass),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      hasUpper: /[A-Z]/.test(pass),
      hasLower: /[a-z]/.test(pass),
    });
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const isPasswordValid = () => {
    return Object.values(passwordChecks).every(check => check === true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!isPasswordValid()) {
      setError('Please create a stronger password');
      setIsLoading(false);
      return;
    }

    const resetToken = searchParams.get('token');
    if (!resetToken) {
      setError('Reset token is missing');
      setIsLoading(false);
      return;
    }

    try {
      await resetPassword(resetToken, { password });
      await Swal.fire({
        title: 'Success!',
        text: 'Password has been reset successfully!',
        icon: 'success',
        confirmButtonColor: '#0ea5e9'
      });
      router.push('/login');
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
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <KeyRound className={`h-8 w-8 ${isDark ? 'text-white' : 'text-gray-900'}`} />
          </motion.div>
          <motion.h2 
            className={`mt-6 text-center text-3xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Set New Password
          </motion.h2>
          <motion.p 
            className={`mt-2 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Enter your new password below
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
          <div className="rounded-md shadow-sm p-4">
            <div className="relative">
              <div className="flex gap-2 items-center mb-3">
                <KeyRound className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <label htmlFor="password" className="text-sm">
                  New Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    isDark 
                      ? 'border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]' 
                      : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]'
                  } rounded-md focus:outline-none focus:z-10 transition-colors`}
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <Eye className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
              {password && (
                <div className="mt-2 space-y-2">
                  <PasswordStrength passwordChecks={passwordChecks} isDark={isDark} />
                  <PasswordChecklist passwordChecks={passwordChecks} />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link 
              href="/login" 
              className={`flex items-center text-sm font-medium ${isDark ? 'text-[#38bdf8] hover:text-[#7dd3fc]' : 'text-[#0284c7] hover:text-[#0ea5e9]'} transition-colors`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </Link>
          </div>

          <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
            <button
              type="submit"
              disabled={isLoading || !isPasswordValid()}
              className={`
                group relative w-full flex justify-center py-3 px-4 
                border border-transparent text-sm font-medium rounded-md 
                text-white bg-[#0284c7] hover:bg-[#0369a1]
                dark:bg-[#0ea5e9] dark:hover:bg-[#0284c7]
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-[#0ea5e9] dark:focus:ring-[#38bdf8] 
                transition-colors
                ${(isLoading || !isPasswordValid()) ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
              ) : (
                <KeyRound className="h-5 w-5 mr-2" />
              )}
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;