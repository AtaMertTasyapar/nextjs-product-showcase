"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from "next/link";
import { ShoppingCartIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon, ChevronDownIcon, UserCircleIcon, Cog6ToothIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useRouter } from 'next/navigation';

function NavbarClient() {
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const cartIconRef = useRef<HTMLAnchorElement>(null);
  const profileMenuRef = useRef<HTMLLIElement>(null);
  
  const totalItems = useCartStore((state) => state.getTotalItems());
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => { setIsClient(true); }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateCartIconRect = useCallback(() => {
    if (cartIconRef.current) {
      useCartStore.getState().setCartIconRect(cartIconRef.current.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      requestAnimationFrame(updateCartIconRect);
      window.addEventListener('resize', updateCartIconRect);
      return () => window.removeEventListener('resize', updateCartIconRect);
    }
  }, [isClient, isMenuOpen, isLoggedIn, updateCartIconRect]); 

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    router.push('/');
  };
  
  const NavLinks = () => (
    <>
      {isClient && isLoggedIn && user?.isAdmin && (
        <li>
          <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="block py-2 text-white hover:text-yellow-300 font-bold transition-colors">
            Admin Panel
          </Link>
        </li>
      )}
      <li>
        <Link href="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-white hover:text-blue-200 transition-colors duration-300 font-medium text-lg">
          Products
        </Link>
      </li>
      <li>
        <Link
          href="/checkout"
          onClick={() => setIsMenuOpen(false)}
          className="text-white hover:text-blue-200 transition-colors duration-300 font-medium text-lg flex items-center gap-1 relative"
          ref={cartIconRef}
        >
          <ShoppingCartIcon className="h-6 w-6 text-white" />
          Cart
          {isClient && totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-slow">
              {totalItems}
            </span>
          )}
        </Link>
      </li>
      {isClient && (isLoggedIn ? (
        <li className="relative" ref={profileMenuRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 text-white font-medium hover:text-blue-200 transition-colors"
          >
            <UserCircleIcon className="h-7 w-7"/>
            <span>Welcome, {user?.name}!</span>
            <ChevronDownIcon className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}/>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 animate-fade-in-down">
              {user?.isAdmin && (
                <Link 
                  href="/admin" 
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  <Cog6ToothIcon className="h-5 w-5"/>
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>
          )}
        </li>
      ) : (
        <li><Link href="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 text-white hover:text-blue-200">Login</Link></li>
      ))}
    </>
  );

   return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">Mobiversite Store</Link>
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex space-x-6 items-center"><NavLinks /></ul>
          <button onClick={toggleTheme} className="text-white p-2 rounded-full hover:bg-white/20 transition-colors" title="Toggle Theme">
            {isClient && (theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />)}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="text-white p-2 rounded-full hover:bg-white/20" title="Toggle Theme">
            {isClient && (theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />)}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XMarkIcon className="h-8 w-8 text-white" /> : <Bars3Icon className="h-8 w-8 text-white" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (<div className="md:hidden mt-4"><ul className="flex flex-col space-y-4 items-start"><NavLinks /></ul></div>)}
    </nav>
  );
}

export default NavbarClient;