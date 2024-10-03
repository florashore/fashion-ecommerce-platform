/**
 * Product API Service
 * Handles all product-related API calls to the backend
 */

import { Product } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const productApi = {
  // Get all products
  async getAllProducts(options?: { category?: string; sort?: string; limit?: number }): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      if (options?.category) params.append('category', options.category);
      if (options?.sort) params.append('sort', options.sort);
      if (options?.limit) params.append('limit', options.limit.toString());

      const response = await fetch(`${API_BASE_URL}/api/products?${params}`);
      const data = await response.json();

      if (data.success) {
        return data.data.map((product: any) => ({
          ...product,
          price: parseFloat(product.price),
          stockQuantity: product.stockQuantity,
          createdAt: product.createdAt ? new Date(product.createdAt) : undefined,
        }));
      }

      throw new Error('Failed to fetch products');
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
      const data = await response.json();

      if (data.success) {
        return {
          ...data.data,
          price: parseFloat(data.data.price),
          stockQuantity: data.data.stockQuantity,
          createdAt: data.data.createdAt ? new Date(data.data.createdAt) : undefined,
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Get products by category
  async getProductsByCategory(category: string, sort?: string): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      if (sort) params.append('sort', sort);

      const response = await fetch(`${API_BASE_URL}/api/products/category/${category}?${params}`);
      const data = await response.json();

      if (data.success) {
        return data.data.map((product: any) => ({
          ...product,
          price: parseFloat(product.price),
          stockQuantity: product.stockQuantity,
          createdAt: product.createdAt ? new Date(product.createdAt) : undefined,
        }));
      }

      throw new Error('Failed to fetch products');
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  // Get featured products
  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/featured/${limit}`);
      const data = await response.json();

      if (data.success) {
        return data.data.map((product: any) => ({
          ...product,
          price: parseFloat(product.price),
          stockQuantity: product.stockQuantity,
          createdAt: product.createdAt ? new Date(product.createdAt) : undefined,
        }));
      }

      throw new Error('Failed to fetch featured products');
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  },
};

