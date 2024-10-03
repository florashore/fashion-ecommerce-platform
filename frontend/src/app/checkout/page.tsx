'use client';

/**
 * Checkout Page
 */

import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import Header from '../components/layout/Header';
import Link from 'next/link';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart } = useCart();

  if (!user) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Please sign in to checkout
            </h2>
            <Link
              href="/auth/signin"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          <div className="lg:col-span-1">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              {cart && cart.items.length > 0 ? (
                <>
                  <div className="space-y-2">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.product.name} x{item.quantity}
                        </span>
                        <span className="text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${cart.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">No items in cart</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

