'use client';

/**
 * Cart Item Component
 */

import { CartItem as CartItemType } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity > 0) {
      await updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = async () => {
    await removeItem(item.id);
  };

  return (
    <div className="grid gap-6 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur p-6 transition-all duration-300 hover:border-white/25">
      <div className="flex gap-6">
        <div className="relative h-28 w-28 overflow-hidden rounded-[18px] border border-white/10 bg-white/10">
          {item.product.images && item.product.images.length > 0 ? (
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.35em] text-white/40">
              no image
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{item.product.name}</h3>
            <button
              onClick={handleRemove}
              className="text-[10px] uppercase tracking-[0.35em] text-white/50 hover:text-white transition-colors"
            >
              Remove
            </button>
          </div>
          <p className="text-sm text-white/60">
            {item.size && <span className="mr-2">Size: {item.size}</span>}
            {item.color && <span>Color: {item.color}</span>}
          </p>
          <p className="text-sm uppercase tracking-[0.35em] text-white/40">
            Unit price ${item.price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center rounded-full border border-white/15 bg-white/10">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-4 py-2 text-white/60 hover:text-white"
          >
            −
          </button>
          <span className="px-5 py-2 text-sm font-semibold">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-4 py-2 text-white/60 hover:text-white"
          >
            +
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Subtotal</p>
          <p className="text-xl font-semibold bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-transparent bg-clip-text">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

