'use client';

/**
 * Category Filter Component
 * Filter products by category with modern UI
 */

import { useState } from 'react';
import Link from 'next/link';

interface CategoryFilterProps {
  currentCategory?: string;
  onFilterChange?: (category: string) => void;
}

export default function CategoryFilter({ currentCategory, onFilterChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    {
      name: 'All',
      value: '',
      gradient: 'from-slate-800 via-slate-700 to-slate-600',
    },
    {
      name: 'Men',
      value: 'Men',
      gradient: 'from-slate-800 via-indigo-900 to-indigo-700',
    },
    {
      name: 'Women',
      value: 'Women',
      gradient: 'from-rose-900 via-rose-700 to-rose-500',
    },
    {
      name: 'Shoes',
      value: 'Shoes',
      gradient: 'from-amber-900 via-amber-700 to-amber-500',
    },
    {
      name: 'Accessories',
      value: 'Accessories',
      gradient: 'from-fuchsia-900 via-fuchsia-700 to-fuchsia-500',
    },
    {
      name: 'Kids',
      value: 'Kids',
      gradient: 'from-cyan-900 via-cyan-700 to-cyan-500',
    },
    {
      name: 'Sportswear',
      value: 'Sportswear',
      gradient: 'from-indigo-900 via-indigo-700 to-indigo-500',
    },
    {
      name: 'Formal',
      value: 'Formal',
      gradient: 'from-zinc-900 via-zinc-700 to-zinc-500',
    },
    {
      name: 'Outerwear',
      value: 'Outerwear',
      gradient: 'from-teal-900 via-teal-700 to-teal-500',
    },
  ];

  const handleCategoryClick = (value: string) => {
    if (onFilterChange) {
      onFilterChange(value);
    }
    setIsOpen(false);
  };

  const currentCategoryData = categories.find(
    (cat) => cat.value === currentCategory
  ) || categories[0];

  return (
    <div className="relative">
      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white"
        >
          <span className="font-medium">
            Category: {currentCategoryData.name}
          </span>
          <svg
            className={`w-5 h-5 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''
              }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur z-50 overflow-hidden">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryClick(category.value)}
                className={`w-full text-left px-4 py-3 text-sm uppercase tracking-[0.3em] transition-colors ${currentCategory === category.value
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-white/60 hover:bg-white/5'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Horizontal Pills */}
      <div className="hidden md:flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategoryClick(category.value)}
            className={`relative overflow-hidden px-6 py-3 rounded-full text-xs uppercase tracking-[0.35em] transition-all duration-300 ${currentCategory === category.value
                ? 'shadow-[0_18px_35px_-20px_rgba(59,130,246,0.8)]'
                : 'opacity-70 hover:opacity-100'
              }`}
          >
            <span
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.gradient} opacity-90`}
            />
            <span className="relative z-10 text-white">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

