'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { 
  Mail, 
  Lock, 
  UserPlus, 
  LogIn,
  AlertCircle,
  Loader2,
  User,
  Eye,
  EyeOff,
} from 'lucide-react';
import { register } from '@/api/auth/requests';
import PasswordStrength from '../password/PasswordStrength';
import PasswordChecklist from '../password/PasswordChecklist';

interface PasswordChecks {
  minLength: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  hasUpper: boolean;
  hasLower: boolean;
}

export const RegisterForm = ({ isDark }: { isDark: boolean }) => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState<PasswordChecks>({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUpper: false,
    hasLower: false,
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!isPasswordValid()) {
      setError('Please create a stronger password');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await register({username, email, password});
      await Swal.fire({
        title: 'Success!',
        text: 'Your account has been created successfully',
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

  const isPasswordValid = () => {
    return Object.values(passwordChecks).every(check => check === true);
  };

  return (
    <motion.form 
      className="mt-8 space-y-6" 
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
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

      <div className="rounded-md shadow-sm p-4 space-y-3">
        {/* Form fields implementation... */}
        <div className="relative">
          <div className="flex gap-2 items-center mb-3">
            <User className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <label htmlFor="username" className="text-sm">Username</label>
          </div>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
              isDark 
                ? 'border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]' 
                : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]'
            } rounded-t-md focus:outline-none focus:z-10 transition-colors`}
            placeholder="Username"
          />
        </div>

        {/* Email field */}
        <div className="relative">
          <div className="flex gap-2 items-center mb-3">
            <Mail className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <label htmlFor="email-address" className="text-sm">Email address</label>
          </div>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
              isDark 
                ? 'border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]' 
                : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]'
            } rounded-t-md focus:outline-none focus:z-10 transition-colors`}
            placeholder="Email address"
          />
        </div>

        {/* Password fields */}
        <div className="relative">
          <div className="flex gap-2 items-center mb-3">
            <Lock className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <label htmlFor="password" className="text-sm">Password</label>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
                isDark 
                  ? 'border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]' 
                  : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]'
              } focus:outline-none focus:z-10 transition-colors`}
              placeholder="Password"
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

        <div className="relative">
          <div className="flex gap-2 items-center mb-3">
            <Lock className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <label htmlFor="confirm-password" className="text-sm">Confirm Password</label>
          </div>
          <div className="relative">
            <input
              id="confirm-password"
              name="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
                isDark 
                  ? 'border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]' 
                  : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]'
              } rounded-b-md focus:outline-none focus:z-10 transition-colors`}
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              ) : (
                <Eye className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
        <button
          type="submit"
          disabled={isLoading || !isPasswordValid() || password !== confirmPassword}
          className={`
            group relative w-full flex justify-center py-3 px-4 
            border border-transparent text-sm font-medium rounded-md 
            text-white bg-[#0284c7] hover:bg-[#0369a1]
            dark:bg-[#0ea5e9] dark:hover:bg-[#0284c7]
            focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-[#0ea5e9] dark:focus:ring-[#38bdf8] 
            transition-colors cursor-pointer
            ${(isLoading || !isPasswordValid() || password !== confirmPassword) ? 'opacity-70 cursor-not-allowed' : ''}
          `}
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
          ) : (
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <UserPlus className="h-5 w-5 text-[#7dd3fc] group-hover:text-[#bae6fd]" />
            </span>
          )}
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </motion.div>
    </motion.form>
  );
};
