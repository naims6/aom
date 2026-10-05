'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/logo.jpg"
                alt="Amin Organic Mart"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-primary-dark text-base tracking-tight">Amin</span>
              <span className="text-primary text-xs font-medium tracking-wide -mt-0.5">Organic Mart</span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 text-gray-500 hover:text-primary rounded-sm transition-colors"
            aria-label="Close navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-surface rounded-sm transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                onClick={onClose}
                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-surface rounded-sm transition-colors"
              >
                Shop All
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-surface rounded-sm transition-colors"
              >
                About
              </Link>
            </li>
          </ul>

          {/* Categories */}
          <div className="mt-6">
            <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Categories
            </p>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-surface rounded-sm transition-colors"
                  >
                    <span>{cat.name}</span>
                    {cat.productCount !== undefined && cat.productCount > 0 && (
                      <span className="text-xs text-gray-400">{cat.productCount}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="px-5 py-4 border-t border-gray-100 bg-surface">
          <p className="text-xs text-gray-500 text-center">
            Cash on Delivery · Free delivery above ৳999
          </p>
        </div>
      </div>
    </>
  );
}
