import { useTheme } from "@/hooks/useTheme";

export const StatCardSkeleton = () => {
    const {theme} = useTheme();
    
      const isDark = theme === 'dark'
  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm animate-pulse`}>
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
