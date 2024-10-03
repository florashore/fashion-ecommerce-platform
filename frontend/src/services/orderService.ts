/**
 * Order Service
 * Business logic for order management
 */

import {
  getDocument,
  getDocuments,
  addDocument,
  updateDocument,
  COLLECTIONS,
  where,
  orderBy,
} from '@/lib/firebase/firestore';
import { Order, Cart, ShippingAddress } from '@/types/product';
import { clearCart } from './cartService';

/**
 * Generate order number
 */
const generateOrderNumber = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ORD-${timestamp}-${random}`;
};

/**
 * Create a new order
 */
export const createOrder = async (
  userId: string,
  userEmail: string,
  cart: Cart,
  shippingAddress: ShippingAddress,
  paymentMethod: string
): Promise<string> => {
  const order: Omit<Order, 'id'> = {
    userId,
    userEmail,
    items: cart.items,
    totalAmount: cart.totalPrice,
    status: 'pending',
    shippingAddress,
    paymentMethod,
    paymentStatus: 'pending',
    orderNumber: generateOrderNumber(),
  };
  
  const orderId = await addDocument(COLLECTIONS.ORDERS, order);
  
  // Clear the cart after successful order
  await clearCart(userId);
  
  return orderId;
};

/**
 * Get user's orders
 */
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  return await getDocuments<Order>(
    COLLECTIONS.ORDERS,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  return await getDocument<Order>(COLLECTIONS.ORDERS, orderId);
};

/**
 * Update order status
 */
export const updateOrderStatus = async (
  orderId: string,
  status: Order['status']
): Promise<void> => {
  await updateDocument(COLLECTIONS.ORDERS, orderId, { status });
};

/**
 * Update payment status
 */
export const updatePaymentStatus = async (
  orderId: string,
  paymentStatus: Order['paymentStatus']
): Promise<void> => {
  await updateDocument(COLLECTIONS.ORDERS, orderId, { paymentStatus });
};

/**
 * Get all orders (admin)
 */
export const getAllOrders = async (): Promise<Order[]> => {
  return await getDocuments<Order>(
    COLLECTIONS.ORDERS,
    orderBy('createdAt', 'desc')
  );
};

/**
 * Cancel order
 */
export const cancelOrder = async (orderId: string): Promise<void> => {
  await updateOrderStatus(orderId, 'cancelled');
};

