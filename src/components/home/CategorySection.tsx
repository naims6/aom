import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/categories';

export default function CategorySection() {
  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
            Explore our curated selection of organic products, each category packed with nature&apos;s best.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group block"
              aria-label={`Browse ${category.name}`}
            >
              <div className="rounded-lg overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Label */}
                <div className="px-3 py-3 lg:px-4 lg:py-4">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-primary transition-colors duration-200">
                    {category.name}
                  </h3>
                  {category.nameBn && (
                    <p className="text-xs text-gray-400 mt-0.5">{category.nameBn}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
