'use client'
import { useState, useEffect } from "react"
import { useTheme } from "@/hooks/useTheme";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type AppLayoutProps = {
    children: React.ReactNode;
};

const AppLayout = ({ children } : AppLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme } = useTheme();
    
    // Handle navigation events from sidebar
    const handleSidebarNavigate = () => {
      setSidebarOpen(false);
    };

    return (
      <div className={`h-screen flex overflow-hidden ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        {/* Sidebar for mobile */}
        <div className={`md:hidden fixed inset-0 z-40 flex transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className={`fixed inset-0 bg-black/40 bg-opacity-75 transition-opacity duration-300 ease-in-out ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out">
            <Sidebar onNavigate={handleSidebarNavigate} />
          </div>
        </div>
      
        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1">
              <Sidebar />
            </div>
          </div>
        </div>
      
        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    )
}

export default AppLayout