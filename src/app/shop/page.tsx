'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { filterProducts } from '@/lib/utils';
import { FilterState } from '@/types';
import { MAX_PRICE } from '@/lib/constants';
import ProductGrid from '@/components/products/ProductGrid';
import ProductSidebar from '@/components/products/ProductSidebar';

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  minPrice: 0,
  maxPrice: MAX_PRICE,
  inStockOnly: false,
  sortBy: 'default',
};

function ShopPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') ?? 'all';

  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    category: categoryParam,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync URL category param into filter state
  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: categoryParam }));
  }, [categoryParam]);

  const filteredProducts = filterProducts(products, filters);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-surface border-b border-gray-100 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-1.5 text-xs text-gray-500">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="font-medium text-gray-800">Shop</li>
            </ol>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Products</h1>
              <p className="text-sm text-gray-500 mt-1">
                Pure, natural, organic — straight from Bangladesh.
              </p>
            </div>

            {/* Mobile Filter Button */}
            <button
              className="lg:hidden flex items-center gap-2 text-sm font-medium text-primary border border-primary px-4 py-2 rounded-sm hover:bg-primary hover:text-white transition-colors self-start"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open filters"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filter &amp; Sort
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <ProductSidebar
            categories={categories}
            filters={filters}
            onFilterChange={setFilters}
            totalProducts={filteredProducts.length}
            isDrawerOpen={sidebarOpen}
            onDrawerClose={() => setSidebarOpen(false)}
          />

          {/* Products Area */}
          <div className="flex-1 min-w-0">
            {/* Active Filter Tags + Count (desktop) */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Showing{' '}
                <span className="font-semibold text-gray-800">{filteredProducts.length}</span>{' '}
                product{filteredProducts.length !== 1 ? 's' : ''}
                {filters.category !== 'all' && (
                  <span className="text-gray-400">
                    {' '}in{' '}
                    <span className="font-medium text-gray-700 capitalize">
                      {filters.category.replace(/-/g, ' ')}
                    </span>
                  </span>
                )}
              </p>
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}
