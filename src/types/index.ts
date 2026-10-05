export interface Product {
  id: string;
  slug: string;
  name: string;
  nameBn?: string;
  price: number;
  comparePrice?: number;
  unit: string;
  category: string;
  categorySlug: string;
  image: string;
  images?: string[];
  shortDescription: string;
  description?: string;
  inStock: boolean;
  featured: boolean;
  badge?: string; // e.g. 'new', 'bestseller', 'sale'
  tags?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameBn?: string;
  description: string;
  image: string;
  productCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: SortOption;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
