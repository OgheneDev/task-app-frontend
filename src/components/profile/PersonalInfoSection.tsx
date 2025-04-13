'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, AlignLeft, Loader2 } from 'lucide-react'
import { getMe } from '@/api/auth/requests'

const PersonalInfoSection = () => {
    const [username, setUsername] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({ email: '', bio: '' })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe()
                setUsername(data.username)
                setUserData({ email: data.email || '', bio: data.bio || '' })
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='space-y-8 p-8 mb-5 md:mb-10 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg shadow-xl border border-white/20'
        >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                    className="text-sm text-gray-600"
                >
                    Your profile information
                </motion.p>
            </div>

            <div className="space-y-6">
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-12 w-full p-4 rounded-xl border outline-none border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                    />
                </div>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={userData.email}
                        onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-12 w-full p-4 rounded-xl border outline-none border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                    />
                </div>
                <div className="relative group">
                    <AlignLeft className="absolute left-4 top-6 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                    <textarea 
                        placeholder="Bio" 
                        rows={4}
                        value={userData.bio}
                        onChange={(e) => setUserData(prev => ({ ...prev, bio: e.target.value }))}
                        className="pl-12 w-full p-4 rounded-xl border outline-none border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 resize-none"
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default PersonalInfoSection