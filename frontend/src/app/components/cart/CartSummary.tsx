'use client';

/**
 * Cart Summary Component
 */

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function CartSummary() {
  const { cart } = useCart();

  if (!cart || cart.items.length === 0) {
    return null;
  }

  const subtotal = cart.totalPrice;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-8 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.45em] text-white/60">atelier summary</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Order projection</h2>
      </div>

      <div className="space-y-3 text-sm uppercase tracking-[0.3em] text-white/60">
        <div className="flex justify-between">
          <span>Subtotal • {cart.totalItems} pieces</span>
          <span className="text-white text-base">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-white text-base">{shipping === 0 ? 'complimentary' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (8%)</span>
          <span className="text-white text-base">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-semibold text-white">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {subtotal < 100 && (
        <p className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-xs uppercase tracking-[0.35em] text-white/60">
          Add ${(100 - subtotal).toFixed(2)} to unlock complimentary shipping
        </p>
      )}

      <Link href="/checkout" className="block">
        <button className="w-full rounded-full bg-white px-8 py-3 text-xs uppercase tracking-[0.4em] text-gray-900 hover:bg-white/90 transition-all">
          Proceed to checkout
        </button>
      </Link>

      <Link href="/products" className="block">
        <button className="w-full rounded-full border border-white/20 px-8 py-3 text-xs uppercase tracking-[0.4em] text-white/70 hover:text-white hover:border-white/40 transition-all">
          Continue curating
        </button>
      </Link>
    </div>
  );
}

