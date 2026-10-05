'use client';

import { useEffect } from 'react';
import { FilterState, Category } from '@/types';
import ProductFilters from './ProductFilters';
import { Button } from '@/components/ui/button';

interface ProductSidebarProps {
  categories: Category[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalProducts: number;
  isDrawerOpen: boolean;
  onDrawerClose: () => void;
}

export default function ProductSidebar({
  categories,
  filters,
  onFilterChange,
  totalProducts,
  isDrawerOpen,
  onDrawerClose,
}: ProductSidebarProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const filtersContent = (
    <ProductFilters
      categories={categories}
      filters={filters}
      onFilterChange={onFilterChange}
      totalProducts={totalProducts}
    />
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 sticky top-24 self-start">
        <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
          {filtersContent}
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onDrawerClose}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Product filters"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onDrawerClose}
            className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-primary rounded-sm transition-colors"
            aria-label="Close filters"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {filtersContent}
        </div>

        {/* Drawer Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <Button
            onClick={onDrawerClose}
            className="w-full rounded-sm bg-primary hover:bg-primary-dark text-white text-sm"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
}
