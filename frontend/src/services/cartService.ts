/**
 * Cart Service
 * Business logic for shopping cart operations
 */

import {
  getDocument,
  setDocument,
  updateDocument,
  COLLECTIONS,
} from '@/lib/firebase/firestore';
import { Cart, CartItem, Product } from '@/types/product';

/**
 * Get user's cart
 */
export const getCart = async (userId: string): Promise<Cart | null> => {
  return await getDocument<Cart>(COLLECTIONS.CART, userId);
};

/**
 * Add item to cart
 */
export const addToCart = async (
  userId: string,
  product: Product,
  quantity: number,
  size: string,
  color: string
): Promise<void> => {
  const cart = await getCart(userId);
  
  const newItem: CartItem = {
    id: `${product.id}_${size}_${color}`,
    productId: product.id,
    product,
    quantity,
    size,
    color,
    price: product.discountPrice || product.price,
  };
  
  if (cart) {
    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      item => item.id === newItem.id
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push(newItem);
    }
    
    // Recalculate totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    
    await setDocument(COLLECTIONS.CART, userId, cart);
  } else {
    // Create new cart
    const newCart: Cart = {
      userId,
      items: [newItem],
      totalItems: quantity,
      totalPrice: newItem.price * quantity,
    };
    
    await setDocument(COLLECTIONS.CART, userId, newCart);
  }
};

/**
 * Update cart item quantity
 */
export const updateCartItemQuantity = async (
  userId: string,
  itemId: string,
  quantity: number
): Promise<void> => {
  const cart = await getCart(userId);
  
  if (cart) {
    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        // Remove item
        cart.items.splice(itemIndex, 1);
      } else {
        // Update quantity
        cart.items[itemIndex].quantity = quantity;
      }
      
      // Recalculate totals
      cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      cart.totalPrice = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      
      await setDocument(COLLECTIONS.CART, userId, cart);
    }
  }
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (
  userId: string,
  itemId: string
): Promise<void> => {
  await updateCartItemQuantity(userId, itemId, 0);
};

/**
 * Clear cart
 */
export const clearCart = async (userId: string): Promise<void> => {
  const emptyCart: Cart = {
    userId,
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
  
  await setDocument(COLLECTIONS.CART, userId, emptyCart);
};

/**
 * Get cart item count
 */
export const getCartItemCount = async (userId: string): Promise<number> => {
  const cart = await getCart(userId);
  return cart?.totalItems || 0;
};

