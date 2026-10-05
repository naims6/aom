import { Suspense } from 'react';
import { products } from '@/data/products';
import CheckoutClient from './CheckoutClient';

interface Props {
  searchParams: Promise<{ buyNow?: string }>;
}

export default async function CheckoutPage({ searchParams }: Props) {
  const { buyNow } = await searchParams;

  // Buy-Now mode: find the specific product from the URL param.
  // The cart is NOT touched — this checkout is for this one product only.
  const buyNowProduct = buyNow
    ? (products.find((p) => p.slug === buyNow) ?? null)
    : null;

  return (
    <Suspense>
      <CheckoutClient buyNowProduct={buyNowProduct} />
    </Suspense>
  );
}
