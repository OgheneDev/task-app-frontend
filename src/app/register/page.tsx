'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
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
  Check,
  X
} from 'lucide-react';
import { register } from '@/api/auth/requests';

const RegisterPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUpper: false,
    hasLower: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const validatePassword = (pass: string) => {
    setPasswordChecks({
      minLength: pass.length >= 8,
      hasNumber: /\d/.test(pass),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      hasUpper: /[A-Z]/.test(pass),
      hasLower: /[a-z]/.test(pass),
    });
  };

  const getPasswordStrength = () => {
    const checks = Object.values(passwordChecks);
    const trueCount = checks.filter(Boolean).length;
    if (trueCount === 5) return { strength: 'Strong', color: 'bg-green-500' };
    if (trueCount >= 3) return { strength: 'Medium', color: 'bg-yellow-500' };
    return { strength: 'Weak', color: 'bg-red-500' };
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { strength } = getPasswordStrength();
    if (strength === 'Weak') {
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
                  <div className="flex gap-1 items-center">
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="flex-1 h-1.5">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            Object.values(passwordChecks).filter(Boolean).length > index
                              ? getPasswordStrength().color
                              : isDark ? 'bg-gray-700' : 'bg-gray-200'
                          }`}
                        />
                      </div>
                    ))}
                    <span className="text-xs ml-2">{getPasswordStrength().strength}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      {passwordChecks.minLength ? 
                        <Check className="h-4 w-4 text-green-500" /> : 
                        <X className="h-4 w-4 text-red-500" />
                      }
                      At least 8 characters
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordChecks.hasNumber ? 
                        <Check className="h-4 w-4 text-green-500" /> : 
                        <X className="h-4 w-4 text-red-500" />
                      }
                      Contains number
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordChecks.hasSpecial ? 
                        <Check className="h-4 w-4 text-green-500" /> : 
                        <X className="h-4 w-4 text-red-500" />
                      }
                      Special character
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordChecks.hasUpper && passwordChecks.hasLower ? 
                        <Check className="h-4 w-4 text-green-500" /> : 
                        <X className="h-4 w-4 text-red-500" />
                      }
                      Upper & lowercase
                    </div>
                  </div>
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
      </motion.div>
    </div>
  );
};

export default RegisterPage;