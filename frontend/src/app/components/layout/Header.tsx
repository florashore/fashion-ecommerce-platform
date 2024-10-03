'use client';

/**
 * Header Component with Navigation
 */

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { signOut } from '@/lib/firebase/auth';

const runwayCollections = [
  {
    title: 'Midnight Atelier',
    description: 'Tailored silhouettes in obsidian satin and dusk velvet.',
    href: '/products?category=Formal',
  },
  {
    title: 'Chromatic Street',
    description: 'Reflective outerwear and iridescent denim layers.',
    href: '/products?category=Outerwear',
  },
  {
    title: 'Atelier Archive',
    description: 'Hand-finished accessories curated by our stylists.',
    href: '/products?category=Accessories',
  },
  {
    title: 'Luminous Sport',
    description: 'Aerodynamic athleisure with prism detailing.',
    href: '/products?category=Sportswear',
  },
];

export default function Header() {
  const { user } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const cartItemCount = cart?.totalItems || 0;

  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 opacity-95 backdrop-blur" />
        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white select-none">
                Fashion<span className="bg-gradient-to-r from-pink-400 via-indigo-300 to-yellow-300 text-transparent bg-clip-text">Shop</span>
              </span>
            </Link>

            {/* Navigation */}
            <div className="hidden lg:flex items-center gap-10 text-xs uppercase tracking-[0.35em] text-white/70">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <button className="inline-flex items-center gap-2 hover:text-white transition-colors">
                  Products
                  <span className={`transition-transform ${isProductsOpen ? 'rotate-45' : ''}`}>+</span>
                </button>

                {isProductsOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-6 w-[720px] rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-8 shadow-[0_45px_85px_-45px_rgba(59,130,246,0.5)]">
                    <div className="grid grid-cols-2 gap-6">
                      {runwayCollections.map((collection) => (
                        <Link
                          key={collection.title}
                          href={collection.href}
                          className="group rounded-3xl border border-white/5 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10"
                        >
                          <p className="text-[10px] uppercase tracking-[0.45em] text-white/40">editorial</p>
                          <h3 className="mt-3 text-lg font-semibold text-white">{collection.title}</h3>
                          <p className="mt-2 text-sm text-white/60">{collection.description}</p>
                          <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/60 group-hover:text-white">
                            open edit
                            <span aria-hidden>↗</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/categories" className="hover:text-white transition-colors">
                Categories
              </Link>

              {user && (
                <Link href="/orders" className="hover:text-white transition-colors">
                  Orders
                </Link>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5">
              <Link href="/cart" className="relative inline-flex">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:border-white/40 transition-all">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-400 to-pink-500 text-[10px] font-semibold text-white shadow-lg">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs uppercase tracking-[0.4em] text-white/70 hover:border-white/40 transition-all"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'Profile'}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      (user.displayName || user.email || 'U')[0].toUpperCase()
                    )}
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-white/10 backdrop-blur shadow-[0_35px_55px_-35px_rgba(15,23,42,0.6)]">
                      <Link
                        href="/profile"
                        className="block px-5 py-4 text-xs uppercase tracking-[0.4em] text-purple-500 hover:text-white hover:bg-white/10 transition-all"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          handleSignOut();
                        }}
                        className="block w-full px-5 py-4 text-left text-xs uppercase tracking-[0.4em] text-purple-500 hover:text-white hover:bg-white/10 transition-all"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/auth/signin"
                    className="text-xs uppercase tracking-[0.4em] text-purple-500 hover:text-white transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="rounded-full bg-purple-500 px-6 py-3 text-xs uppercase tracking-[0.4em] text-white hover:bg-purple-600 transition-all"
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

