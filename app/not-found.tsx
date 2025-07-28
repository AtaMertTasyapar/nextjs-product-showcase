import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in">
      <h1 className="text-7xl font-extrabold text-red-700 mb-4 animate-bounce-slow">404</h1>
      <p className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</p>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
        Go to Home Page
      </Link>
    </div>
  );
}