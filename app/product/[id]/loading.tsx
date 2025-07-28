export default function ProductDetailLoading() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="w-full aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
        
        <div className="flex flex-col gap-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-6 w-1/4 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse mt-2"></div>
          <div className="h-24 w-full bg-gray-200 rounded-md animate-pulse mt-4"></div>
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
            <div className="h-12 w-1/3 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-12 w-1/3 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}