"use client";

import { useCartStore } from "../store/cartStore";
import { CartItem } from "../store/cartStore";
import { PlusCircleIcon } from '@heroicons/react/24/outline';

interface ProductForCart extends Omit<CartItem, 'quantity'> {}

export default function AddToCartButton({ product }: { product: ProductForCart }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="group flex items-center gap-2 px-5 py-2 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
    >
      <PlusCircleIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" /> {/* İkon animasyonu */}
      Add to Cart
    </button>
  );
}