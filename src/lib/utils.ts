export { cn } from "cn";

export function formatPrice(price: number): string {
  return `৳${price.toLocaleString("en-BD")}`;
}

import { FilterState } from "@/types";
import { Product } from "@/types";

export function filterProducts(
  products: Product[],
  filters: FilterState,
): Product[] {
  let result = [...products];

  if (filters.category !== "all") {
    result = result.filter((p) => p.categorySlug === filters.category);
  }

  result = result.filter(
    (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice,
  );

  if (filters.inStockOnly) {
    result = result.filter((p) => p.inStock);
  }

  switch (filters.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return result;
}
