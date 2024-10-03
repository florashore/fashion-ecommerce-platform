/**
 * Product API Routes
 * Handles all product-related endpoints
 */

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/products - Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, sort, limit } = req.query;

    let orderBy: any = { createdAt: 'desc' };
    
    if (sort === 'price-low') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price-high') {
      orderBy = { price: 'desc' };
    } else if (sort === 'name') {
      orderBy = { name: 'asc' };
    }

    const where: any = {};
    if (category && category !== '') {
      where.category = category as string;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      take: limit ? parseInt(limit as string) : undefined,
    });

    res.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
    });
  }
});

// GET /api/products/:id - Get product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product',
    });
  }
});

// GET /api/products/category/:category - Get products by category
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { sort } = req.query;

    let orderBy: any = { createdAt: 'desc' };
    
    if (sort === 'price-low') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price-high') {
      orderBy = { price: 'desc' };
    } else if (sort === 'name') {
      orderBy = { name: 'asc' };
    }

    const products = await prisma.product.findMany({
      where: {
        category: {
          equals: category,
          mode: 'insensitive',
        },
      },
      orderBy,
    });

    res.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
    });
  }
});

// GET /api/products/featured/:limit - Get featured products
router.get('/featured/:limit', async (req: Request, res: Response) => {
  try {
    const { limit } = req.params;

    const products = await prisma.product.findMany({
      where: {
        inStock: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: parseInt(limit),
    });

    res.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured products',
    });
  }
});

export default router;

