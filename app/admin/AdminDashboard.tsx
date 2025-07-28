"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { PlusIcon, MagnifyingGlassIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export type ProductWithSales = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  sales: number;
  status: 'Active' | 'Disabled';
};

type SortableKeys = keyof ProductWithSales;

export default function AdminDashboard({ products }: { products: ProductWithSales[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>({ key: 'sales', direction: 'descending' });

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = [...products];
    if (searchTerm) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filtered;
  }, [products, searchTerm, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const SortIndicator = ({ columnKey }: { columnKey: SortableKeys }) => {
    if (!sortConfig || sortConfig.key !== columnKey) return null;
    if (sortConfig.direction === 'ascending') return <ChevronUpIcon className="h-4 w-4 ml-1" />;
    return <ChevronDownIcon className="h-4 w-4 ml-1" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 animate-fade-in-up">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 md:mb-0">
          Admin Panel - Products
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search in products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
            <PlusIcon className="h-5 w-5" />
            Add Product
          </button>
        </div>
      </header>
      <div className="overflow-x-auto">
        <div className="min-w-[720px] align-middle">
          <div className="grid grid-cols-10 gap-4 p-2 font-bold text-xs text-gray-500 uppercase bg-gray-50 rounded-t-lg">
             <button onClick={() => requestSort('title')} className="col-span-3 flex items-center">Item <SortIndicator columnKey="title" /></button>
            <button onClick={() => requestSort('category')} className="col-span-2 flex items-center">Category <SortIndicator columnKey="category" /></button>
            <button onClick={() => requestSort('status')} className="col-span-2 flex items-center justify-center">Status <SortIndicator columnKey="status" /></button>
            <button onClick={() => requestSort('stock')} className="col-span-1 flex items-center justify-center">Stock <SortIndicator columnKey="stock" /></button>
            <button onClick={() => requestSort('sales')} className="col-span-1 flex items-center justify-center">Sales <SortIndicator columnKey="sales" /></button>
            <button onClick={() => requestSort('price')} className="col-span-1 flex items-center justify-end">Price <SortIndicator columnKey="price" /></button>
          </div>
          <div className="divide-y divide-gray-100">
             {sortedAndFilteredProducts.map(product => (
              <div key={product.id} className="grid grid-cols-10 gap-4 p-3 items-center hover:bg-gray-50 transition-colors text-sm">
                <div className="col-span-3 flex items-center gap-3">
                  <Image src={product.image} alt={product.title} width={40} height={40} className="rounded-md object-contain bg-white p-1 flex-shrink-0"/>
                  <span className="font-semibold text-gray-800 truncate">{product.title}</span>
                </div>
                <div className="col-span-2 text-gray-600 capitalize truncate">{product.category}</div>
                <div className="col-span-2 text-center">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                    {product.status}
                  </span>
                </div>
                <div className="col-span-1 text-center text-gray-700">{product.stock}</div>
                <div className="col-span-1 text-center text-gray-700">{product.sales}</div>
                <div className="col-span-1 text-right font-bold text-gray-800">${product.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}