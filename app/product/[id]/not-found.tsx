import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in">
      <h2 className="text-5xl font-extrabold text-red-600 mb-4 animate-bounce-slow">404</h2>
      <p className="text-2xl font-semibold text-gray-800 mb-6">Product Not Found</p>
      <p className="text-lg text-gray-600 mb-8">
        We couldn&apos;t find the product you&apos;re looking for. It might have been removed or the ID is incorrect.
      </p>
      <Link href="/" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
        Go to Products Page
      </Link>
    </div>
  );
}