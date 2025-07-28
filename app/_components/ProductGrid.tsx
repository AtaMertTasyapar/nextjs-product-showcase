"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon, BarsArrowDownIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import AddToCartButton from './AddToCartButton';
import FilterSidebar from './FilterSidebar';
import { useFilterStore } from '../store/filterStore';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const {
    searchTerm, setSearchTerm,
    sortOrder, setSortOrder,
    selectedCategories, setSelectedCategories,
    priceRange, setPriceRange,
    resetFilters
  } = useFilterStore();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allCategories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };
  
  const handleResetAndClose = () => {
    resetFilters();
    setIsFilterOpen(false);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];
    if (searchTerm) { filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())); }
    if (selectedCategories.length > 0) { filtered = filtered.filter(p => selectedCategories.includes(p.category)); }
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortOrder) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating-desc': filtered.sort((a, b) => b.rating.rate - a.rating.rate); break;
      default: break;
    }
    return filtered;
  }, [products, searchTerm, sortOrder, selectedCategories, priceRange]);

  return (
    <div>
      <div className="bg-white p-4 rounded-xl shadow-lg mb-6 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 transition-colors"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
          <span className="font-semibold text-gray-700">Filters</span>
        </button>
        <div className="relative w-full sm:flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="relative w-full sm:w-auto flex items-center">
          <BarsArrowDownIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="w-full sm:w-56 pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Top Rated</option>
          </select>
        </div>
      </div>
      
      {isFilterOpen && (
        <FilterSidebar
          allCategories={allCategories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          onResetFilters={handleResetAndClose}
        />
      )}

      {/* Ürün Grid'i */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredAndSortedProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-200 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
          >
            <Link href={`/product/${product.id}`} className="block relative h-60 overflow-hidden bg-white rounded-t-xl">
              <Image 
                src={product.image} 
                alt={product.title} 
                fill 
                style={{ objectFit: "contain" }} 
                className="p-4 transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
              />
            </Link>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[56px]">
                <Link href={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">{product.title}</Link>
              </h2>
              <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1 mb-3">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="font-bold text-gray-800">{product.rating.rate}</span>
                <span>({product.rating.count} reviews)</span>
              </div>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                <span className="text-2xl font-bold text-blue-700">${product.price.toFixed(2)}</span>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}