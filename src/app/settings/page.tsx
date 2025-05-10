'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from "@/hooks/useTheme"
import { Shield, Eye, EyeOff, Moon, Sun, Trash2, Save, AlertTriangle } from 'lucide-react'
import { updatePassword, deleteAccount } from '@/api/auth/requests'
import Swal from 'sweetalert2'

const SettingsPage = () => {
  const { toggleTheme, theme } = useTheme();
  const isDark = theme === 'dark';

  // Password update state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Delete account state
  const [deleteConfirmPassword, setDeleteConfirmPassword] = useState('');
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Types
  type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'question';

  // Notification function using SweetAlert2
  const showNotification = (type: NotificationType, message: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: isDark ? '#333' : '#fff',
      color: isDark ? '#fff' : '#333',
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: type,
      title: message
    })
  }

  // Handle password update
  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) {
      showNotification('error', 'Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification('error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      showNotification('error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setUpdating(true);
      await updatePassword({ currentPassword, newPassword });
      showNotification('success', 'Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      showNotification('error', 'Failed to update password');
      console.error('Password update failed:', error);
    } finally {
      setUpdating(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!deleteConfirmPassword) {
      showNotification('error', 'Please enter your password');
      return;
    }

    try {
      setDeleting(true);
      await deleteAccount({ password: deleteConfirmPassword });
      // Note: The API handles redirect to login page after successful deletion
    } catch (error) {
      showNotification('error', 'Failed to delete account');
      console.error('Account deletion failed:', error);
      setDeleting(false);
    }
  };

  return (
    <div className={`min-h-screen px-1 py-3 md:p-10 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className={`text-2xl md:text-3xl font-bold ${isDark 
          ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
          : 'bg-gradient-to-r from-blue-600 to-purple-600'} bg-clip-text text-transparent`}>
          Settings
        </h1>

        {/* Theme Toggle Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-2xl shadow-xl border ${isDark 
            ? 'bg-gradient-to-br from-gray-800/60 to-gray-800/30 backdrop-blur-lg border-gray-700/20' 
            : 'bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg border-white/20'}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                Appearance
              </h2>
              <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Switch between light and dark mode
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-4 rounded-xl flex items-center justify-center cursor-pointer shadow-lg ${isDark 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'}`}
            >
              {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Password Update Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          className={`p-8 rounded-2xl shadow-xl border ${isDark 
            ? 'bg-gradient-to-br from-gray-800/60 to-gray-800/30 backdrop-blur-lg border-gray-700/20' 
            : 'bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg border-white/20'}`}
        >
          <h2 className={`text-xl md:text-2xl font-bold ${isDark 
            ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600'} bg-clip-text text-transparent mb-6`}>
            Password Settings
          </h2>

          <div className="space-y-6">
            {/* Current Password */}
            <div className="relative group">
              <Shield className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'} transition-colors group-focus-within:text-blue-500`} />
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`pl-12 pr-12 w-full p-4 rounded-xl border outline-none ${isDark 
                  ? 'bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-800/70' 
                  : 'bg-white/50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white/70'}`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showCurrentPassword ? 
                  <EyeOff className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} /> : 
                  <Eye className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                }
              </button>
            </div>

            {/* New Password */}
            <div className="relative group">
              <Shield className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'} transition-colors group-focus-within:text-blue-500`} />
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`pl-12 pr-12 w-full p-4 rounded-xl border outline-none ${isDark 
                  ? 'bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-800/70' 
                  : 'bg-white/50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white/70'}`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showNewPassword ? 
                  <EyeOff className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} /> : 
                  <Eye className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                }
              </button>
            </div>

            {/* Confirm New Password */}
            <div className="relative group">
              <Shield className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'} transition-colors group-focus-within:text-blue-500`} />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`pl-12 w-full p-4 rounded-xl border outline-none ${isDark 
                  ? 'bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-800/70' 
                  : 'bg-white/50 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white/70'}`}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpdatePassword}
              disabled={updating}
              className="flex items-center justify-center cursor-pointer gap-2 w-full p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {updating ? (
                <>
                  <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Update Password</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Delete Account Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className={`p-8 rounded-2xl shadow-xl border ${isDark 
            ? 'bg-gradient-to-br from-gray-800/60 to-red-900/10 backdrop-blur-lg border-red-900/20' 
            : 'bg-gradient-to-br from-white/60 to-red-50 backdrop-blur-lg border-red-100'}`}
        >
          <h2 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-500'} mb-4`}>
            Danger Zone
          </h2>
          
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Once you delete your account, there is no going back. Please be certain.
          </p>

          {!confirmDelete ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setConfirmDelete(true)}
              className={`flex items-center justify-center gap-2 w-full p-4 rounded-xl ${isDark 
                ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                : 'bg-red-100 text-red-600 hover:bg-red-200'} font-medium shadow-lg transition-all duration-300`}
            >
              <Trash2 className="h-5 w-5" />
              <span>Delete Account</span>
            </motion.button>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg flex items-start gap-3 ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
                <AlertTriangle className={`h-5 w-5 mt-0.5 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  This action cannot be undone. This will permanently delete your account and remove all your data.
                </p>
              </div>
              
              <div className="relative group">
                <Shield className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type={showDeletePassword ? "text" : "password"}
                  placeholder="Enter your password to confirm"
                  value={deleteConfirmPassword}
                  onChange={(e) => setDeleteConfirmPassword(e.target.value)}
                  className={`pl-12 pr-12 w-full p-4 rounded-xl border outline-none ${isDark 
                    ? 'bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                    : 'bg-white/50 border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowDeletePassword(!showDeletePassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showDeletePassword ? 
                    <EyeOff className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} /> : 
                    <Eye className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  }
                </button>
              </div>
              
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setConfirmDelete(false)}
                  className={`flex-1 p-4 rounded-xl ${isDark 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} font-medium transition-all duration-300`}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="flex-1 cursor-pointer flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-lg hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {deleting ? (
                    <>
                      <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-5 w-5" />
                      <span>Confirm Delete</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default SettingsPage