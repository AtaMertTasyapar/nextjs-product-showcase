"use client";

import { useCartStore } from "../store/cartStore";
import { CartItem } from "../store/cartStore";
import { PlusCircleIcon } from '@heroicons/react/24/outline';

type ProductForCart = Omit<CartItem, 'quantity'>;

export default function AddToCartButton({ product }: { product: ProductForCart }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="group flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
    >
      <PlusCircleIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
      Add to Cart
    </button>
  );
}