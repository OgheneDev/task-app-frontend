'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, AlignLeft, Save } from 'lucide-react'
import { getMe, updateDetails } from '@/api/auth/requests'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
import { UpdateDetailsCredentials } from '@/types/types'

interface PersonalInfoSectionProps {
  isDark: boolean;
}

const PersonalInfoSection = ({ isDark }: PersonalInfoSectionProps) => {
    const [username, setUsername] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [userData, setUserData] = useState({ email: '', bio: '' })
    const [initialData, setInitialData] = useState({ username: '', email: '', bio: '' })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe()
                setUsername(data.username || '')
                setUserData({ email: data.email || '', bio: data.bio || '' })
                setInitialData({ 
                    username: data.username || '', 
                    email: data.email || '', 
                    bio: data.bio || '' 
                })
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    const handleUpdateDetails = async () => {
        // Check if any data has changed
        if (username === initialData.username && userData.bio === initialData.bio) {
            toast('No changes to save', { icon: 'ℹ️' }) // Changed from toast.info to standard toast
            return
        }

        try {
            setUpdating(true)
            // Define updatedFields with proper type
            const updatedFields: UpdateDetailsCredentials = {}
            
            if (username !== initialData.username) {
                updatedFields.username = username
            }
            if (userData.bio !== initialData.bio) {
                updatedFields.bio = userData.bio
            }

            const updatedUser = await updateDetails(updatedFields)
            
            // Update initial data with new values
            setInitialData({ 
                username: updatedUser.username, 
                email: updatedUser.email, 
                bio: updatedUser.bio || '' 
            })
            
            Swal.fire({
                title: "Success!",
                text: "Profile updated successfully",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to update profile.",
                icon: "error"
            });
            console.error('Update failed:', error)
        } finally {
            setUpdating(false)
        }
    }

    // Loading skeleton component
    if (loading) {
        return (
            <div className={`space-y-8 p-8 mb-5 md:mb-10 rounded-2xl 
                ${isDark 
                    ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/30 backdrop-blur-lg shadow-xl border border-gray-700/20'
                    : 'bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg shadow-xl border border-white/20'
                }`}
            >
                <div className={`h-8 w-48 rounded-lg animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className="flex flex-col items-center gap-4">
                    <div className={`h-24 w-24 rounded-2xl animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className={`h-4 w-32 rounded animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                </div>
                <div className="space-y-6">
                    <div className={`h-14 w-full rounded-xl animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className={`h-14 w-full rounded-xl animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className={`h-32 w-full rounded-xl animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                </div>
            </div>
        )
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`space-y-8 p-8 mb-5 md:mb-10 rounded-2xl 
                ${isDark 
                    ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/30 backdrop-blur-lg shadow-xl border border-gray-700/20'
                    : 'bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg shadow-xl border border-white/20'
                }`}
        >
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Personal Information
            </h2>
            <div className="flex flex-col items-center gap-4">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-24 w-24 rounded-2xl bg-gradient-to-br cursor-pointer from-[#38bdf8] to-[#8b5cf6] flex items-center justify-center text-white shadow-lg transform transition-all duration-300 hover:shadow-blue-500/25"
                >
                    <span className="text-3xl font-bold">{username?.slice(0, 2).toUpperCase()}</span>
                </motion.div>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    Your profile information
                </motion.p>
            </div>

            <div className="space-y-6">
                <div className="relative group">
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'} transition-colors group-focus-within:text-blue-500`} />
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`pl-12 w-full p-4 rounded-xl border outline-none transition-all duration-300 
                            ${isDark 
                                ? 'bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500'
                                : 'bg-white/50 backdrop-blur-sm hover:bg-white/70 border-gray-200 focus:ring-2 text-gray-700 focus:ring-blue-500 focus:border-transparent'
                            }`}
                    />
                </div>
                <div className="relative group">
                    <Mail className={`absolute left-4 top-[36%] -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'} transition-colors group-focus-within:text-blue-500`} />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={userData.email}
                        disabled
                        className={`pl-12 w-full p-4 rounded-xl border outline-none cursor-not-allowed
                            ${isDark 
                                ? 'bg-gray-900 border-gray-700 text-gray-400'
                                : 'bg-gray-50 border-gray-200 text-gray-700'
                            }`}
                    />
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1 ml-4`}>Email cannot be changed</span>
                </div>
                <div className="relative group">
                    <AlignLeft className={`absolute left-4 top-5 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'} transition-colors group-focus-within:text-blue-500`} />
                    <textarea 
                        placeholder="Bio" 
                        rows={4}
                        value={userData.bio}
                        onChange={(e) => setUserData(prev => ({ ...prev, bio: e.target.value }))}
                        className={`pl-12 w-full p-4 rounded-xl border outline-none transition-all duration-300 resize-none
                            ${isDark 
                                ? 'bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500'
                                : 'bg-white/50 backdrop-blur-sm hover:bg-white/70 text-gray-700 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            }`}
                    />
                </div>
                
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpdateDetails}
                    disabled={updating}
                    className="flex items-center justify-center cursor-pointer gap-2 w-full p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {updating ? (
                        <>
                            <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                            <span>Updating...</span>
                        </>
                    ) : (
                        <>
                            <Save className="h-5 w-5" />
                            <span>Save Changes</span>
                        </>
                    )}
                </motion.button>
            </div>
        </motion.div>
    )
}

export default PersonalInfoSection