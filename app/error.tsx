"use client";

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in">
      <h1 className="text-5xl font-extrabold text-red-600 mb-4">
        Oops!
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Something went wrong.
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        An unexpected error has occurred. You can try to reload the page or go back to the homepage.
      </p>
      <button
        onClick={
          () => reset()
        }
        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
      >
        Try again
      </button>
    </div>
  );
}