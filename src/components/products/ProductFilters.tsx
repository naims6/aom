'use client';

import { FilterState, Category, SortOption } from '@/types';
import { MAX_PRICE } from '@/lib/constants';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface ProductFiltersProps {
  categories: Category[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalProducts: number;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export default function ProductFilters({
  categories,
  filters,
  onFilterChange,
  totalProducts,
}: ProductFiltersProps) {
  const update = (partial: Partial<FilterState>) => {
    onFilterChange({ ...filters, ...partial });
  };

  const handleClearFilters = () => {
    onFilterChange({
      category: 'all',
      minPrice: 0,
      maxPrice: MAX_PRICE,
      inStockOnly: false,
      sortBy: 'default',
    });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.minPrice > 0 ||
    filters.maxPrice < MAX_PRICE ||
    filters.inStockOnly ||
    filters.sortBy !== 'default';

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-xs text-primary hover:text-primary-dark h-auto p-0"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500">
        Showing{' '}
        <span className="font-semibold text-gray-800">{totalProducts}</span> product
        {totalProducts !== 1 ? 's' : ''}
      </p>

      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
          Category
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => update({ category: 'all' })}
              className={`w-full text-left text-sm px-2 py-1.5 rounded-sm transition-colors ${
                filters.category === 'all'
                  ? 'text-primary font-semibold bg-surface'
                  : 'text-gray-600 hover:text-primary hover:bg-surface'
              }`}
            >
              All Products
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => update({ category: cat.slug })}
                className={`w-full text-left text-sm px-2 py-1.5 rounded-sm transition-colors flex items-center justify-between ${
                  filters.category === cat.slug
                    ? 'text-primary font-semibold bg-surface'
                    : 'text-gray-600 hover:text-primary hover:bg-surface'
                }`}
              >
                <span>{cat.name}</span>
                {cat.productCount !== undefined && (
                  <span className="text-xs text-gray-400">{cat.productCount}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
          Price Range
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Label className="text-xs text-gray-500 mb-1 block">Min (৳)</Label>
              <Input
                type="number"
                min={0}
                max={filters.maxPrice}
                value={filters.minPrice}
                onChange={(e) => update({ minPrice: Math.max(0, Number(e.target.value)) })}
                className="rounded-sm text-sm"
                placeholder="0"
              />
            </div>
            <span className="text-gray-400 text-sm mt-4">–</span>
            <div className="flex-1">
              <Label className="text-xs text-gray-500 mb-1 block">Max (৳)</Label>
              <Input
                type="number"
                min={filters.minPrice}
                max={MAX_PRICE}
                value={filters.maxPrice}
                onChange={(e) => update({ maxPrice: Math.min(MAX_PRICE, Number(e.target.value)) })}
                className="rounded-sm text-sm"
                placeholder={String(MAX_PRICE)}
              />
            </div>
          </div>
          <p className="text-xs text-gray-400">
            ৳{filters.minPrice} – ৳{filters.maxPrice}
          </p>
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
          Availability
        </h3>
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="in-stock"
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => update({ inStockOnly: Boolean(checked) })}
          />
          <Label
            htmlFor="in-stock"
            className="text-sm text-gray-700 cursor-pointer"
          >
            In Stock Only
          </Label>
        </div>
      </div>

      <Separator />

      {/* Sort By */}
      <div>
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
          Sort By
        </h3>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => update({ sortBy: value as SortOption })}
        >
          <SelectTrigger className="rounded-sm text-sm">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
