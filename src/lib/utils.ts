import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Product, Category, FilterState } from '@/types';

/**
 * Merges class names using clsx + tailwind-merge (shadcn/ui standard helper).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price number into the Bangladeshi Taka currency string.
 */
export function formatPrice(price: number): string {
  return `৳ ${price.toLocaleString('en-BD')}`;
}

/**
 * Filters and sorts a list of products based on the given FilterState.
 */
export function filterProducts(products: Product[], filters: FilterState): Product[] {
  let filtered = [...products];

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter((p) => p.categorySlug === filters.category);
  }

  // Filter by price range
  filtered = filtered.filter(
    (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
  );

  // Filter by stock
  if (filters.inStockOnly) {
    filtered = filtered.filter((p) => p.inStock);
  }

  // Sort
  switch (filters.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'default':
    default:
      // Keep original order
      break;
  }

  return filtered;
}

/**
 * Finds a category by its slug.
 */
export function getCategoryBySlug(
  categories: Category[],
  slug: string
): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/**
 * Returns all products belonging to a given category slug.
 */
export function getProductsByCategory(
  products: Product[],
  categorySlug: string
): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}
