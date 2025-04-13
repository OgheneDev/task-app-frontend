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
            className='space-y-6'
        >
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <div className="grid gap-6">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="h-16 w-16 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6] flex items-center justify-center text-white"
                >
                    <span className="text-xl font-medium">{username?.slice(0, 2).toUpperCase()}</span>
                </motion.div>
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={userData.email}
                        onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="relative">
                    <AlignLeft className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea 
                        placeholder="Bio" 
                        rows={3}
                        value={userData.bio}
                        onChange={(e) => setUserData(prev => ({ ...prev, bio: e.target.value }))}
                        className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default PersonalInfoSection