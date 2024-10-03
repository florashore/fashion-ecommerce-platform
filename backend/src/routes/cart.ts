/**
 * Cart API Routes
 * Handles shopping cart operations
 */

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/cart/:cartId - Get cart by ID
router.get('/:cartId', async (req: Request, res: Response) => {
    try {
        const { cartId } = req.params;

        const cart = await prisma.cartItems.findUnique({
            where: { id: cartId },
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                error: 'Cart not found',
            });
        }

        // Calculate total
        const total = cart.items.reduce((sum: number, item: any) => {
            return sum + (Number(item.product.price) * item.quantity);
        }, 0);

        res.json({
            success: true,
            data: {
                ...cart,
                total,
                totalItems: cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
            },
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch cart',
        });
    }
});

// POST /api/cart - Create new cart
router.post('/', async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        const cart = await prisma.cartItems.create({
            data: {
                userId: userId || null,
            },
        });

        res.json({
            success: true,
            data: cart,
        });
    } catch (error) {
        console.error('Error creating cart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create cart',
        });
    }
});

// POST /api/cart/:cartId/items - Add item to cart
router.post('/:cartId/items', async (req: Request, res: Response) => {
    try {
        const { cartId } = req.params;
        const { productId, quantity, size, color } = req.body;

        // Check if item already exists in cart
        const existingItem = await prisma.cartItems.findFirst({
            where: { id: cartId },
        });

        if (existingItem) {
            // Update quantity
            const updated = await prisma.cartItems.update({
                where: { id: existingItem.id },
                data: {
                    quantity: existingItem.quantity + quantity,
                },
            });

            return res.json({
                success: true,
                data: updated,
            });
        }

        // Create new cart item
        const cartItem = await prisma.cartItems.create({
            data: {
                id: cartId,
                productId,
                quantity,
                size,
                color,
            },
        });

        res.json({
            success: true,
            data: cartItem,
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add item to cart',
        });
    }
});

// PUT /api/cart/items/:itemId - Update cart item quantity
router.put('/items/:itemId', async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            await prisma.cartItems.delete({
                where: { id: itemId },
            });

            return res.json({
                success: true,
                message: 'Item removed from cart',
            });
        }

        const updated = await prisma.cartItems.update({
            where: { id: itemId },
            data: { quantity },
        });

        res.json({
            success: true,
            data: updated,
        });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update cart item',
        });
    }
});

// DELETE /api/cart/items/:itemId - Remove item from cart
router.delete('/items/:itemId', async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;

        await prisma.cartItems.delete({
            where: { id: itemId },
        });

        res.json({
            success: true,
            message: 'Item removed from cart',
        });
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to remove cart item',
        });
    }
});

// DELETE /api/cart/:cartId - Clear cart
router.delete('/:cartId', async (req: Request, res: Response) => {
    try {
        const { cartId } = req.params;

        await prisma.cartItems.deleteMany({
            where: { id: cartId },
        });

        res.json({
            success: true,
            message: 'Cart cleared',
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to clear cart',
        });
    }
});

export default router;

