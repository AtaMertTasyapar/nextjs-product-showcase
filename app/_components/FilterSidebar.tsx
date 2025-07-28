"use client";

import { XMarkIcon } from '@heroicons/react/24/outline';

interface FilterSidebarProps {
  allCategories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (newRange: [number, number]) => void;
  onResetFilters: () => void;
}

export default function FilterSidebar({
  allCategories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  onResetFilters
}: FilterSidebarProps) {
  return (
    <aside className="bg-white p-6 rounded-xl shadow-lg mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={onResetFilters}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
        >
          <XMarkIcon className="h-4 w-4" />
          Reset
        </button>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Category</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {allCategories.map((category) => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 capitalize text-md">{category}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Price Range</h3>
        <div className="flex items-center justify-between text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
        />
      </div>
    </aside>
  );
}