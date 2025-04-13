'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getMe } from '@/api/auth/requests'
import { useTheme } from '@/hooks/useTheme'
import { logout } from '@/api/auth/requests'

type NavbarProps = { 
    onMenuClick: () => void;
};

const Navbar = ({ onMenuClick }: NavbarProps) => {
    const { theme, toggleTheme } = useTheme();
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [username, setUsername] = useState<string>('');
    const isDark = theme === 'dark';
    
    useEffect(() => {
      const fetchUser = async () => {
          const userData = await getMe();
          setUsername(userData.username);
      };
      fetchUser();
    }, []);

    const handleLogout = () => {
      logout();
    }

  return (
    <nav className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex"> 
            <div className="flex-shrink-0 flex items-center md:hidden">
              <button
                onClick={onMenuClick}
                className={`p-2 rounded-md ${isDark ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' : 'text-gray-500 hover:text-gray-600 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0ea5e9]`}
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-[#0284c7] dark:text-[#38bdf8]">TaskMaster</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-md cursor-pointer ${isDark ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' : 'text-gray-500 hover:text-gray-600 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0ea5e9]`}
              >
                {theme === 'dark' ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="ml-3 relative">
              {/*<div>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className={`p-2 rounded-md ${isDark ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' : 'text-gray-500 hover:text-gray-600 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0ea5e9]`}
                >
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>*/}
              {notificationsOpen && (
                <div className={`origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 ${isDark ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
                  <div className={`px-4 py-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Notifications</p>
                  </div>
                  <div className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    <div className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <div className="h-10 w-10 rounded-full bg-[#0ea5e9] flex items-center justify-center text-white">
                            <span className="text-sm font-medium">TS</span>
                          </div>
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Task reminder</p>
                          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            "Finalize project proposal" is due today
                          </p>
                          <div className="mt-2 text-xs text-gray-400">2 hours ago</div>
                        </div>
                      </div>
                    </div>
                    <div className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <div className="h-10 w-10 rounded-full bg-success-500 flex items-center justify-center text-white">
                            <span className="text-sm font-medium">TD</span>
                          </div>
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Task completed</p>
                          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            You completed "Research competitors"
                          </p>
                          <div className="mt-2 text-xs text-gray-400">1 day ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`px-4 py-2 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <Link href="/notifications" className={`text-sm font-medium ${isDark ? 'text-[#38bdf8] hover:text-primary-300' : 'text-[#0284c7] hover:text-primary-800'}`}>
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`max-w-xs cursor-pointer ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0ea5e9]`}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6] flex items-center justify-center text-white">
                    <span className="text-sm font-medium">{username?.slice(0, 2).toUpperCase()}</span>
                  </div>
                </button>
              </div>
              {profileOpen && (
                <div className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${isDark ? 'bg-gray-900' : 'bg-white'} ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
                  <Link href="/profile" className={`block px-4 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Your Profile
                  </Link>
                  <Link href="/settings" className={`block px-4 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Settings
                  </Link>
                  <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}></div>
                  <button onClick={handleLogout} className={`block px-4 py-2 text-start cursor-pointer text-sm w-full ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar