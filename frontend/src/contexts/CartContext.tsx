'use client';

/**
 * Cart Context
 * Provides shopping cart state throughout the app
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Cart, Product } from '@/types/product';
import { getCart, addToCart, updateCartItemQuantity, removeFromCart } from '@/services/cartService';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addItem: (product: Product, quantity: number, size: string, color: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  loading: true,
  addItem: async () => {},
  updateQuantity: async () => {},
  removeItem: async () => {},
  refreshCart: async () => {},
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const refreshCart = async () => {
    if (user) {
      try {
        const userCart = await getCart(user.uid);
        setCart(userCart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setCart(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addItem = async (
    product: Product,
    quantity: number,
    size: string,
    color: string
  ) => {
    if (!user) {
      throw new Error('User must be logged in to add items to cart');
    }
    
    await addToCart(user.uid, product, quantity, size, color);
    await refreshCart();
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user) return;
    
    await updateCartItemQuantity(user.uid, itemId, quantity);
    await refreshCart();
  };

  const removeItem = async (itemId: string) => {
    if (!user) return;
    
    await removeFromCart(user.uid, itemId);
    await refreshCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItem,
        updateQuantity,
        removeItem,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

