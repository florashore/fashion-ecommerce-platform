'use client';

/**
 * Categories Page
 * Browse all product categories
 */

import Header from '../components/layout/Header';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  subcategories?: string[];
}

export default function CategoriesPage() {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Men',
      slug: 'Men',
      description: 'Shop clothing and accessories for men',
      image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80',
      productCount: 4,
      subcategories: ['Shirts', 'Jeans', 'T-Shirts', 'Jackets'],
    },
    {
      id: '2',
      name: 'Women',
      slug: 'Women',
      description: 'Shop clothing and accessories for women',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
      productCount: 4,
      subcategories: ['Dresses', 'Tops', 'Jeans', 'Jackets'],
    },
    {
      id: '3',
      name: 'Shoes',
      slug: 'Shoes',
      description: 'Footwear for all occasions',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
      productCount: 3,
      subcategories: ['Sneakers', 'Boots', 'Running Shoes'],
    },
    {
      id: '4',
      name: 'Accessories',
      slug: 'Accessories',
      description: 'Bags, sunglasses, belts and more',
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80',
      productCount: 4,
      subcategories: ['Bags', 'Sunglasses', 'Belts', 'Hats'],
    },
    {
      id: '5',
      name: 'Kids',
      slug: 'Kids',
      description: 'Clothing for children',
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80',
      productCount: 2,
      subcategories: ['T-Shirts', 'Jeans', 'Outerwear'],
    },
    {
      id: '6',
      name: 'Sportswear',
      slug: 'Sportswear',
      description: 'Athletic wear and activewear',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      productCount: 2,
      subcategories: ['Leggings', 'Hoodies', 'Shorts'],
    },
    {
      id: '7',
      name: 'Formal',
      slug: 'Formal',
      description: 'Business and formal attire',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
      productCount: 2,
      subcategories: ['Suits', 'Shirts', 'Ties'],
    },
    {
      id: '8',
      name: 'Outerwear',
      slug: 'Outerwear',
      description: 'Jackets and coats',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      productCount: 3,
      subcategories: ['Jackets', 'Coats', 'Windbreakers'],
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(236,72,153,0.2),transparent_65%)]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
            <p className="text-xs uppercase tracking-[0.45em] text-white/60">collections</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Couture edits curated by atelier stylists
            </h1>
            <p className="text-white/60 max-w-2xl">
              Navigate through our director’s edits—from sculpted formalwear to chromatic street essentials—each category is a capsule ready to be discovered.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="relative py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.6),transparent_60%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_45px_85px_-55px_rgba(59,130,246,0.6)]"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
                    <span className="absolute top-5 left-5 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white">
                      {category.productCount} pieces
                    </span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
                      <p className="mt-2 text-sm text-white/60">{category.description}</p>
                    </div>
                    {category.subcategories && (
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.slice(0, 4).map((sub) => (
                          <span
                            key={sub}
                            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/60"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/60 group-hover:text-white">
                      Enter collection
                      <span aria-hidden>↗</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

