'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "@/hooks/useTheme"
import { getMe } from "@/api/auth/requests"
import { useEffect, useState } from "react"

const Sidebar = () => {
    const pathname = usePathname();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getMe();
            setUsername(userData.username);
        };
        fetchUser();
    }, []);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Tasks', href: '/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
        { name: 'Analytics', href: '/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { name: 'Settings', href: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];

  return (
    <div className={`flex flex-col flex-grow pt-5 pb-4 overflow-y-auto ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-r`}>
      <div className="flex items-center flex-shrink-0 px-4">
        <div className={`h-8 w-8 rounded-full ${isDark ? 'bg-[#0284c7]' : 'bg-[#0ea5e9]'} flex items-center justify-center text-white`}>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <span className={`ml-2 text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>TaskMaster</span>
      </div>
      <div className="mt-5 flex-1 flex flex-col">
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? `${isDark ? 'bg-gray-800 text-[#38bdf8]' : 'bg-[#f0f9ff] text-[#0284c7]'}`
                    : `${isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <svg
                  className={`${
                    isActive
                      ? 'text-[#0ea5e9] dark:text-[#38bdf8]'
                      : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                  } mr-3 h-5 w-5`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className={`flex-shrink-0 flex border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} p-4`}>
        <Link href="/profile" className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6] flex items-center justify-center text-white">
                <span className="text-sm font-medium">{username?.slice(0, 2).toUpperCase()}</span>
              </div>
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>{username}</p>
              <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>View profile</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar