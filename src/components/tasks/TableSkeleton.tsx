import { useTheme } from "@/hooks/useTheme"

const TableSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark'

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow rounded-lg">
            <div className="min-w-full divide-y divide-gray-300">
              <div className="bg-gray-50 px-3 py-3.5 flex items-center justify-between">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                ))}
              </div>
              <div className={`divide-y divide-gray-200 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                {[1, 2, 3, 4, 5].map((row) => (
                  <div key={row} className="px-3 py-4 flex justify-between items-center">
                    {[1, 2, 3, 4, 5, 6].map((col) => (
                      <div key={col} className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableSkeleton
