// app/loading.tsx
export default function RootLoading() {
  return (
    <div className="animate-fade-in">
      {/* Skeleton for Controls */}
      <div className="bg-white p-4 rounded-xl shadow-lg mb-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-auto p-2 h-10 rounded-lg bg-gray-200 animate-pulse basis-32"></div>
        <div className="relative w-full sm:flex-1 h-10 rounded-lg bg-gray-200 animate-pulse"></div>
        <div className="relative w-full sm:w-56 h-10 rounded-lg bg-gray-200 animate-pulse"></div>
      </div>
      
      {/* Skeleton for Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg border border-transparent overflow-hidden">
            <div className="relative h-60 w-full bg-gray-200 animate-pulse"></div>
            <div className="p-6">
              <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse mb-4"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <div className="h-8 w-1/3 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-10 w-1/3 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}