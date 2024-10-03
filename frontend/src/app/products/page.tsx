'use client';

/**
 * Products Page
 * Displays all products with category filtering
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types/product';
import { productApi } from '@/services/api/productApi';
import ProductGrid from '../components/products/ProductGrid';
import CategoryFilter from '../components/categories/CategoryFilter';
import Header from '../components/layout/Header';

const sortOptions = [
  {
    value: 'newest',
    label: 'Newest arrivals',
    description: 'Fresh from the atelier floor',
    accent: 'from-pink-400 via-purple-400 to-indigo-500',
    icon: (
      <svg
        className="h-5 w-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 7l4-4 4 4M8 3v14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 13l4 4-4 4M20 17H10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    value: 'price-low',
    label: 'Price • Low to High',
    description: 'Discover entry couture pieces',
    accent: 'from-emerald-300 via-teal-400 to-cyan-400',
    icon: (
      <svg
        className="h-5 w-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 6c-1.778 0-3.222 1.343-3.222 3 0 1.657 1.444 3 3.222 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 12c1.778 0 3.222 1.343 3.222 3 0 1.657-1.444 3-3.222 3M12 3v18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 18l-2.5 3L2 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    value: 'price-high',
    label: 'Price • High to Low',
    description: 'Spot statement investments',
    accent: 'from-amber-300 via-orange-400 to-rose-400',
    icon: (
      <svg
        className="h-5 w-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 6c-1.778 0-3.222 1.343-3.222 3 0 1.657 1.444 3 3.222 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 12c1.778 0 3.222 1.343 3.222 3 0 1.657-1.444 3-3.222 3M12 3v18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17 6l2.5-3L22 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    value: 'name',
    label: 'Alphabetical',
    description: 'A–Z atelier index',
    accent: 'from-sky-300 via-indigo-300 to-violet-400',
    icon: (
      <svg
        className="h-5 w-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 17l3.5-10 3.5 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.25 13.5h3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18 7l-3 3 3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 7h3a3 3 0 010 6h-3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('newest');
  const activeSort = sortOptions.find((option) => option.value === sortBy) || sortOptions[0];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await productApi.getAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Update category from URL params
  useEffect(() => {
    setCurrentCategory(categoryParam);
  }, [categoryParam]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (currentCategory) {
      filtered = filtered.filter(
        (product) => product.category?.toLowerCase() === currentCategory.toLowerCase()
      );
    }

    // Sort products
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, currentCategory, sortBy]);

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    // Update URL without page reload
    const url = new URL(window.location.href);
    if (category) {
      url.searchParams.set('category', category);
    } else {
      url.searchParams.delete('category');
    }
    window.history.pushState({}, '', url);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.25),transparent_65%)]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.45em] text-white/50">
                  {currentCategory ? `${currentCategory} edit` : 'All products'}
                </p>
                <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
                  {currentCategory ? `${currentCategory} Gallery` : 'Couture Catalogue'}
                </h1>
                <p className="mt-5 text-base md:text-lg text-white/70 max-w-2xl">
                  Explore runway-inspired silhouettes, sculptural tailoring, and hand-finished accessories curated by our atelier stylists.
                </p>
              </div>
              <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 text-xs uppercase tracking-[0.35em] text-white/60">
                <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'} available</span>
                <span>{activeSort.label} • {currentCategory || 'all edits'}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
                <CategoryFilter
                  currentCategory={currentCategory}
                  onFilterChange={handleCategoryChange}
                />
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
                  <span>Sort curation</span>
                  {currentCategory && (
                    <button
                      onClick={() => handleCategoryChange('')}
                      className="text-[10px] uppercase tracking-[0.35em] text-white/50 hover:text-white transition-colors"
                    >
                      reset
                    </button>
                  )}
                </div>
                <div className="grid gap-3">
                  {sortOptions.map((option) => {
                    const isActive = option.value === sortBy;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`group relative overflow-hidden rounded-[24px] border px-5 py-4 text-left transition-all ${isActive
                            ? 'border-white/60 bg-white/15 shadow-[0_25px_45px_-25px_rgba(129,140,248,0.6)]'
                            : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                          }`}
                        type="button"
                      >
                        <div
                          className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40 ${isActive ? 'opacity-60' : ''
                            } bg-gradient-to-r ${option.accent}`}
                        />
                        <div className="relative flex items-center gap-4">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80">
                            {option.icon}
                          </span>
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
                              {option.label}
                            </p>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-white/60">
                              {option.description}
                            </p>
                          </div>
                          {isActive && (
                            <span className="ml-auto text-[10px] uppercase tracking-[0.35em] text-white/80">
                              curated
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[11px] uppercase tracking-[0.3em] text-white/50">
                  Refine your edit by tailoring, occasion, or seasonal palette to uncover limited-release atelier pieces.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <ProductGrid products={filteredProducts} loading={loading} />

          {!loading && filteredProducts.length === 0 && (
            <div className="mt-12 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-16 text-center">
              <h3 className="text-2xl font-semibold text-white mb-3">
                No couture pieces discovered
              </h3>
              <p className="text-white/60 mb-6">
                {currentCategory
                  ? `We couldn’t find any pieces in the ${currentCategory} edit.`
                  : 'Currently no products are available.'}
              </p>
              {currentCategory && (
                <button
                  onClick={() => handleCategoryChange('')}
                  className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.4em] text-gray-900 hover:bg-white/90 transition-all"
                >
                  View all edits
                  <span aria-hidden>↗</span>
                </button>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
