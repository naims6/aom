'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, CheckCircle, Zap } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product);
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  // Buy Now goes straight to checkout for THIS product only —
  // does NOT add to cart, does NOT include existing cart items.
  const handleBuyNow = () => {
    if (!product.inStock) return;
    router.push(`/checkout?buyNow=${product.slug}`);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Add to Cart — amber */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className={`inline-flex items-center justify-center gap-2 py-3.5 px-3 font-medium text-sm rounded-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          added
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-amber-500 hover:bg-amber-600'
        }`}
      >
        {added ? (
          <>
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">Added!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </span>
          </>
        )}
      </button>

      {/* Buy Now — primary green */}
      <button
        onClick={handleBuyNow}
        disabled={!product.inStock}
        className="inline-flex items-center justify-center gap-2 py-3.5 px-3 font-medium text-sm rounded-sm bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Zap className="w-4 h-4 shrink-0" />
        <span className="truncate">Buy Now</span>
      </button>
    </div>
  );
}
