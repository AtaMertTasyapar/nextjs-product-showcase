"use client";

import { useCartStore } from "../store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { TrashIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';

export default function CheckoutPage() {
  const { items, removeItem, getTotalPrice, clearCart, increaseQuantity, decreaseQuantity } = useCartStore();

  const handleRemoveItem = (productId: number) => {
    removeItem(productId);
  };

  const handleCheckout = () => {
    alert('Proceeding to payment! (Simulated)');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-lg text-gray-600 mb-8">
          Looks like you haven&apos;t added any items to your cart yet.
        </p>
        <Link href="/" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in-up">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Your Shopping Cart</h1>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 relative">
                      <Image
                        className="rounded-lg object-contain"
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="64px"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-900 line-clamp-2">{item.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="text-gray-500 hover:text-red-600 transition-colors duration-200 p-1 rounded-full"
                      title="Decrease quantity"
                    >
                      <MinusCircleIcon className="h-7 w-7" />
                    </button>
                    <span className="text-xl font-bold text-gray-900 w-8 text-center select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="text-gray-500 hover:text-green-600 transition-colors duration-200 p-1 rounded-full"
                      title="Increase quantity"
                    >
                      <PlusCircleIcon className="h-7 w-7" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900 font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-900 transition-colors duration-200 transform hover:scale-110 p-1 rounded-full"
                    title="Remove item"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center border-t border-gray-200 pt-6">
        <div className="text-2xl font-bold text-gray-900 mr-4">Total:</div>
        <div className="text-4xl font-extrabold text-blue-700 animate-pulse-once">${getTotalPrice().toFixed(2)}</div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleCheckout}
          className="px-10 py-4 bg-green-600 text-white font-bold text-xl rounded-lg shadow-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 animate-button-pop"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
