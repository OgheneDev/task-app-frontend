export const LoadingState = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`p-8 ${isDark ? 'bg-gray-900 text-white' : 'bg-slate-50'}`}>
      <div className="animate-pulse space-y-6 max-w-7xl mx-auto">
        <div className="h-10 w-56 bg-gray-300/50 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-gray-300/50 rounded-xl"></div>
          ))}
        </div>
        <div className="w-full rounded-xl shadow-lg h-[300px] bg-gray-300/50"></div>
      </div>
    </div>
  );
};
