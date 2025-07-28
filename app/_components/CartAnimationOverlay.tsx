"use client";

import { useRef, useEffect } from 'react';
import { useCartStore } from "../store/cartStore";
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function CartAnimationOverlay() {
  const showAnimation = useCartStore((state) => state.showAddedToCartAnimation);
  const cartIconRect = useCartStore((state) => state.cartIconRect);
  const animationDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = animationDivRef.current;
    if (!div) return;

    if (showAnimation && cartIconRect) {
      const targetX = cartIconRect.left + cartIconRect.height / 2;
      const targetY = cartIconRect.top + cartIconRect.height / 2;

      const startX = window.innerWidth / 2;
      const startY = window.innerHeight / 2;

      const deltaX = targetX - startX;
      const deltaY = targetY - startY;

      div.style.setProperty('--fly-end-x', `${deltaX}px`);
      div.style.setProperty('--fly-end-y', `${deltaY}px`);

      requestAnimationFrame(() => {
        if (div) {
          div.classList.add('animate-fly-to-cart-centered');
        }
      });

    } else {
      div.classList.remove('animate-fly-to-cart-centered');
    }
  }, [showAnimation, cartIconRect]);

  return (
    <>
      {showAnimation && (
        <div
          ref={animationDivRef}
          className="fixed top-1/2 left-1/2 pointer-events-none z-[9999] transform-gpu"
        >
          <div className="bg-green-600 text-white py-3 px-6 rounded-full shadow-xl flex items-center gap-3 text-lg font-semibold">
            <CheckCircleIcon className="h-7 w-7" />
            <span>Added to cart!</span>
          </div>
        </div>
      )}
    </>
  );
}