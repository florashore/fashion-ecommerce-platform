'use client';

/**
 * Orders Page - User Order History
 */

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserOrders } from '@/services/orderService';
import { Order } from '@/types/product';
import Header from '../components/layout/Header';
import Link from 'next/link';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const userOrders = await getUserOrders(user.uid);
          setOrders(userOrders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-12 text-center space-y-6">
            <p className="text-lg font-semibold text-white">Authenticate to access your order archive</p>
            <p className="text-sm text-white/60">
              Sign in to view atelier dispatches, track deliveries, and download couture receipts.
            </p>
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.4em] text-gray-900 hover:bg-white/90 transition-all"
            >
              Sign in
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const getStatusClasses = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'border border-emerald-400/40 bg-emerald-500/10 text-emerald-200';
      case 'processing':
        return 'border border-indigo-400/40 bg-indigo-500/10 text-indigo-200';
      case 'shipped':
        return 'border border-purple-400/40 bg-purple-500/10 text-purple-200';
      case 'cancelled':
        return 'border border-rose-400/40 bg-rose-500/10 text-rose-200';
      default:
        return 'border border-amber-400/40 bg-amber-500/10 text-amber-200';
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(236,72,153,0.2),transparent_65%)]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-white/60">dispatch archive</p>
                <h1 className="mt-4 text-4xl md:text-5xl font-bold">
                  {orders.length ? 'Chronicle of your couture deliveries' : 'Awaiting your first atelier dispatch'}
                </h1>
                <p className="mt-3 text-sm text-white/70 max-w-2xl">
                  Review runway pieces in transit, check statuses, and download receipts for your curated wardrobe.
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.4em] text-white/70 hover:text-white hover:border-white/40 transition-all"
              >
                Explore new edits
                <span aria-hidden>→</span>
              </Link>
            </div>

            {loading ? (
              <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-12 text-center space-y-4">
                <div className="mx-auto h-10 w-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                <p className="text-sm text-white/60">Assembling your dispatch records…</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-12 text-center space-y-6">
                <p className="text-lg font-semibold text-white">
                  Your atelier archive is ready for its first entry
                </p>
                <p className="text-sm text-white/60">
                  Discover the latest edits and be the first to curate from our atelier collections.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.4em] text-gray-900 hover:bg-white/90 transition-all"
                >
                  Browse catalogue
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur p-6 space-y-6 transition-all duration-300 hover:border-white/25"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Order</p>
                        <h3 className="text-xl font-semibold text-white">#{order.orderNumber}</h3>
                        <p className="text-sm text-white/60">
                          {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleString() : 'Date unavailable'}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.35em] ${getStatusClasses(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="grid gap-4 text-xs uppercase tracking-[0.35em] text-white/50 md:grid-cols-4">
                      <div>
                        <p>Total</p>
                        <p className="mt-2 text-sm text-white">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p>Pieces</p>
                        <p className="mt-2 text-sm text-white">{order.items.length}</p>
                      </div>
                      <div>
                        <p>Payment</p>
                        <p className="mt-2 text-sm text-white/80">{order.paymentMethod}</p>
                      </div>
                      <div>
                        <p>Shipping</p>
                        <p className="mt-2 text-sm text-white/80">
                          {order.shippingAddress.city}, {order.shippingAddress.country}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                      <div className="space-y-2 text-sm text-white/70">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <span>{item.product.name} ×{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-white/60">
                      <p>
                        <span className="text-white/50">Dispatched to:</span> {order.shippingAddress.fullName}
                      </p>
                      <p>
                        {order.shippingAddress.addressLine1}, {order.shippingAddress.city},{' '}
                        {order.shippingAddress.state} {order.shippingAddress.zipCode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

