import { useTheme } from "@/hooks/useTheme"

const TableSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark'

  return (
    <div className="mt-8 space-y-4">
      <div className="overflow-x-auto rounded-xl shadow-md">
        <div className={`min-w-full ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} px-4 py-3.5`}>
            <div className="grid grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`h-4 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
              ))}
            </div>
          </div>
          <div className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="px-4 py-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="space-y-2 col-span-2">
                      <div className={`h-4 w-3/4 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
                      <div className={`h-3 w-1/2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
                    </div>
                    <div className={`h-6 w-20 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
                    <div className={`h-6 w-20 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
                    <div className={`h-4 w-24 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
                    <div className="flex justify-center space-x-2">
                      <div className={`h-5 w-5 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
                      <div className={`h-5 w-5 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center py-4">
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-8 w-8 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-200'} animate-pulse`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableSkeleton
