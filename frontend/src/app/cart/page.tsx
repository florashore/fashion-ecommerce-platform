'use client';

/**
 * Cart Page
 */

import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Header from '../components/layout/Header';
import Link from 'next/link';

export default function CartPage() {
  const { cart, loading } = useCart();
  const { user } = useAuth();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(236,72,153,0.2),transparent_65%)]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-white/60">atelier tote</p>
                <h1 className="mt-4 text-4xl md:text-5xl font-bold">
                  {user ? 'Your curated wardrobe in motion' : 'Sign in to access your atelier tote'}
                </h1>
                <p className="mt-3 text-sm text-white/70 max-w-2xl">
                  {user
                    ? 'Finalize your ensemble choices, adjust silhouettes, and secure delivery destinations for a seamless runway-to-wardrobe experience.'
                    : 'Authenticate to synchronize selections across devices and access exclusive atelier recommendations.'}
                </p>
              </div>
              {user ? (
                <div className="rounded-full border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.4em] text-white/60">
                  {cart?.items.length || 0} pieces selected
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.4em] text-gray-900 hover:bg-white/90 transition-all"
                >
                  Sign in
                  <span aria-hidden>↗</span>
                </Link>
              )}
            </div>

            {!user ? (
              <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-12 text-center space-y-6">
                <p className="text-white/70">
                  Access to your atelier tote requires authentication. Sign in or create an account to continue curating.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.4em] text-gray-900 hover:bg-white/90 transition-all"
                  >
                    Sign in
                    <span aria-hidden>↗</span>
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.4em] text-white/70 hover:text-white hover:border-white/40 transition-all"
                  >
                    Join atelier
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ) : loading ? (
              <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-12 text-center">
                <div className="mx-auto h-10 w-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                <p className="mt-4 text-sm text-white/60">Synchronizing curated selections…</p>
              </div>
            ) : !cart || cart.items.length === 0 ? (
              <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-12 text-center space-y-6">
                <p className="text-lg font-semibold text-white">Your atelier tote is currently empty</p>
                <p className="text-sm text-white/60">
                  Explore our runway edits to begin assembling your bespoke wardrobe.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.4em] text-gray-900 hover:bg-white/90 transition-all"
                >
                  Explore catalogue
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
                <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 space-y-6">
                  {cart.items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                <CartSummary />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

