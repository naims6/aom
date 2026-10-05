import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

export default function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link
            href="/shop"
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1 flex-shrink-0"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link href="/shop" className="btn-outline inline-block">
            Browse All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
