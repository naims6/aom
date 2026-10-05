import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ShieldCheck, Truck, RefreshCcw, Leaf } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const BADGE_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  new: 'default',
  bestseller: 'secondary',
  sale: 'destructive',
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return {
    title: product ? `${product.name} — Amin Organic Mart` : 'Product Not Found',
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600 truncate">{product.name}</span>
        </nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-surface border border-gray-100 shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <Badge
                  variant={BADGE_VARIANT[product.badge] ?? 'default'}
                  className="text-xs uppercase tracking-wide rounded-sm px-2 py-1"
                >
                  {product.badge}
                </Badge>
              </div>
            )}
          </div>

          {/* Right — Details */}
          <div className="flex flex-col">
            {/* Category */}
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.comparePrice && (
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
              )}
              <span className="text-sm text-gray-400 ml-1">/ {product.unit}</span>
            </div>

            {/* Stock */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500">
                  <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-8 border-t border-gray-100 pt-6">
              {product.description}
            </p>

            {/* Add to Cart */}
            <button
              disabled={!product.inStock}
              className="w-full sm:w-auto btn-primary text-base px-10 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100">
              {[
                { icon: Leaf, label: '100% Organic' },
                { icon: ShieldCheck, label: 'Quality Guaranteed' },
                { icon: Truck, label: 'Fast Delivery' },
                { icon: RefreshCcw, label: 'Easy Returns' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-gray-500">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16 lg:mt-20">
            <h2 className="text-xl font-bold text-gray-900 mb-6">More from {product.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group block rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="relative aspect-square overflow-hidden bg-surface">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 45vw, 25vw"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
                      {rel.name}
                    </p>
                    <p className="text-sm font-bold text-primary mt-1">{formatPrice(rel.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
