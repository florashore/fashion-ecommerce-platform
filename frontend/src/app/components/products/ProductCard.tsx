'use client';

/**
 * Product Card Component - Modern Design
 * Displays a single product in a grid with beautiful imagery
 */

import { Product } from '@/types/product';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <article className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_35px_65px_-35px_rgba(15,23,42,0.7)]">
        <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
          <div className="absolute inset-0 blur-3xl bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.35),transparent_60%)]" />
          <div className="absolute inset-0 blur-3xl bg-[radial-gradient(circle_at_bottom,rgba(79,70,229,0.35),transparent_65%)]" />
        </div>

        <div className="relative p-6 flex flex-col gap-6">
          <div className="relative rounded-[22px] overflow-hidden aspect-[4/5] bg-white/5 border border-white/10">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-white/40">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-3">
              {product.category && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1 text-[10px] uppercase tracking-[0.4em]">
                  {product.category}
                </span>
              )}
              {product.featured && (
                <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/80 px-4 py-1 text-[10px] uppercase tracking-[0.4em]">
                  spotlight
                </span>
              )}
              {hasDiscount && (
                <span className="inline-flex items-center gap-2 rounded-full bg-pink-500/80 px-4 py-1 text-[10px] uppercase tracking-[0.4em]">
                  -{discountPercentage}%
                </span>
              )}
              {!product.inStock && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-[10px] uppercase tracking-[0.4em] text-white/60">
                  waitlist
                </span>
              )}
            </div>

            {/* Quick View */}
            <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="flex items-center justify-between rounded-full bg-white/90 px-5 py-3 text-xs uppercase tracking-[0.3em] text-gray-900">
                <span>View details</span>
                <span aria-hidden>↗</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold leading-tight group-hover:text-white">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-white/60 line-clamp-2">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-transparent bg-clip-text">
                ${displayPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs uppercase tracking-[0.3em] text-white/40 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-2">
                {product.colors.slice(0, 4).map((color) => (
                  <span
                    key={color}
                    className="h-4 w-4 rounded-full border border-white/30"
                    title={color}
                    style={{
                      background:
                        color.toLowerCase() === 'white'
                          ? '#f8fafc'
                          : color.toLowerCase() === 'black'
                            ? '#020617'
                            : color,
                    }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            )}

            {product.inStock && product.stockQuantity !== undefined && product.stockQuantity < 8 && (
              <p className="text-[11px] uppercase tracking-[0.35em] text-amber-300/80">
                Limited · {product.stockQuantity} remaining
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
