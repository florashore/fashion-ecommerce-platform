/**
 * Product Service
 * Business logic for product operations
 */

import {
  getDocument,
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  COLLECTIONS,
  where,
  orderBy,
  limit,
} from '@/lib/firebase/firestore';
import { Product } from '@/types/product';

/**
 * Get all products
 */
export const getAllProducts = async (): Promise<Product[]> => {
  return await getDocuments<Product>(COLLECTIONS.PRODUCTS, orderBy('createdAt', 'desc'));
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async (limitCount: number = 8): Promise<Product[]> => {
  return await getDocuments<Product>(
    COLLECTIONS.PRODUCTS,
    where('featured', '==', true),
    limit(limitCount)
  );
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return await getDocuments<Product>(
    COLLECTIONS.PRODUCTS,
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  );
};

/**
 * Get a single product by ID
 */
export const getProductById = async (productId: string): Promise<Product | null> => {
  return await getDocument<Product>(COLLECTIONS.PRODUCTS, productId);
};

/**
 * Search products by name
 */
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  const allProducts = await getAllProducts();
  const lowercaseSearch = searchTerm.toLowerCase();
  
  return allProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseSearch) ||
    product.description.toLowerCase().includes(lowercaseSearch) ||
    product.category.toLowerCase().includes(lowercaseSearch)
  );
};

/**
 * Create a new product
 */
export const createProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  return await addDocument(COLLECTIONS.PRODUCTS, product);
};

/**
 * Update a product
 */
export const updateProduct = async (
  productId: string,
  updates: Partial<Product>
): Promise<void> => {
  await updateDocument(COLLECTIONS.PRODUCTS, productId, updates);
};

/**
 * Delete a product
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  await deleteDocument(COLLECTIONS.PRODUCTS, productId);
};

/**
 * Get products with filters
 */
export const getFilteredProducts = async (filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}): Promise<Product[]> => {
  let products = await getAllProducts();
  
  if (filters.category) {
    products = products.filter(p => p.category === filters.category);
  }
  
  if (filters.minPrice !== undefined) {
    products = products.filter(p => p.price >= filters.minPrice!);
  }
  
  if (filters.maxPrice !== undefined) {
    products = products.filter(p => p.price <= filters.maxPrice!);
  }
  
  if (filters.inStock !== undefined) {
    products = products.filter(p => p.inStock === filters.inStock);
  }
  
  return products;
};

