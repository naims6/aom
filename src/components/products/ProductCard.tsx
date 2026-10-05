'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

const BADGE_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  new: 'default',
  bestseller: 'secondary',
  sale: 'destructive',
};

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Add to cart:', product.id, product.name);
    // Cart functionality to be implemented
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="flex flex-col overflow-hidden rounded-sm border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-0 gap-0 h-full">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-surface">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          />
          {product.badge && (
            <div className="absolute top-2 left-2">
              <Badge
                variant={BADGE_VARIANT[product.badge] ?? 'default'}
                className="text-xs uppercase tracking-wide rounded-sm"
              >
                {product.badge}
              </Badge>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-white px-3 py-1 border border-gray-200 rounded-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="flex flex-col flex-1 p-3 sm:p-4">
          {/* Category */}
          <span className="text-xs font-medium text-primary-light uppercase tracking-widest mb-1">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="font-medium text-gray-900 text-sm sm:text-base leading-snug mb-3 flex-1">
            {product.name}
          </h3>

          {/* Price Row */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
            <span className="text-xs text-gray-400 ml-auto">/{product.unit}</span>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full rounded-sm bg-primary hover:bg-primary-dark text-white text-sm font-medium"
            aria-label={`Add ${product.name} to cart`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
