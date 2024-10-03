'use client';

/**
 * Product Detail Page
 * Luxury fashion aesthetic with immersive imagery
 */

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { productApi } from '@/services/api/productApi';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/app/components/layout/Header';
import ProductGrid from '@/app/components/products/ProductGrid';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addItem } = useCart();
    const { user } = useAuth();

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showAddedMessage, setShowAddedMessage] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            const foundProduct = await productApi.getProductById(params.id as string);
            if (!foundProduct) {
                setProduct(null);
                return;
            }

            setProduct(foundProduct);
            if (foundProduct.sizes?.length) {
                setSelectedSize(foundProduct.sizes[0]);
            }
            if (foundProduct.colors?.length) {
                setSelectedColor(foundProduct.colors[0]);
            }

            if (foundProduct.category) {
                const related = await productApi.getProductsByCategory(foundProduct.category);
                setRelatedProducts(related.filter((p) => p.id !== foundProduct.id).slice(0, 6));
            }
        };

        fetchProduct();
    }, [params.id]);

    const handleAddToCart = async () => {
        if (!product) return;

        if (product.sizes?.length && !selectedSize) {
            alert('Please select a size');
            return;
        }

        try {
            await addItem(product, quantity, selectedSize, selectedColor);
            setShowAddedMessage(true);
            setTimeout(() => setShowAddedMessage(false), 3000);
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Please sign in to add items to cart');
        }
    };

    if (!product) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-semibold">Product unavailable</h2>
                        <p className="text-white/60">
                            The item you’re looking for has been archived or is not accessible.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.4em] text-gray-900 hover:bg-white/90 transition-all"
                        >
                            Back to catalogue
                            <span aria-hidden>↗</span>
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    const images = product.images && product.images.length > 0 ? product.images : ['/placeholder.jpg'];
    const stock = product.stockQuantity || 0;
    const inStock = product.inStock !== false && stock > 0;

    return (
        <>
            <Header />
            <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen overflow-hidden">
                <section className="relative">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.2),transparent_60%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(236,72,153,0.18),transparent_65%)]" />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                        {/* Breadcrumb */}
                        <nav className="mb-10 text-xs uppercase tracking-[0.35em] text-white/50">
                            <div className="flex flex-wrap items-center gap-3">
                                <Link href="/" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                                <span aria-hidden>•</span>
                                <Link href="/products" className="hover:text-white transition-colors">
                                    Catalogue
                                </Link>
                                {product.category && (
                                    <>
                                        <span aria-hidden>•</span>
                                        <Link
                                            href={`/products?category=${product.category}`}
                                            className="hover:text-white transition-colors"
                                        >
                                            {product.category}
                                        </Link>
                                    </>
                                )}
                                <span aria-hidden>•</span>
                                <span className="text-white">{product.name}</span>
                            </div>
                        </nav>

                        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
                            {/* Media Gallery */}
                            <div className="space-y-6">
                                <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur">
                                    <img
                                        src={images[selectedImage]}
                                        alt={`${product.name} hero`}
                                        className="w-full h-full object-cover max-h-[640px] transition-transform duration-[1200ms]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/35" />
                                    <div className="absolute top-6 left-6 flex gap-3">
                                        {product.category && (
                                            <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur px-4 py-2 text-[10px] uppercase tracking-[0.35em]">
                                                {product.category}
                                            </span>
                                        )}
                                        {product.featured && (
                                            <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/80 px-4 py-2 text-[10px] uppercase tracking-[0.35em]">
                                                Spotlight
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {images.length > 1 && (
                                    <div className="grid grid-cols-4 gap-4">
                                        {images.map((image, index) => (
                                            <button
                                                key={image}
                                                onClick={() => setSelectedImage(index)}
                                                className={`relative overflow-hidden rounded-2xl border ${selectedImage === index ? 'border-white/60' : 'border-white/10'
                                                    } bg-white/5 backdrop-blur transition-all duration-300 hover:border-white/40`}
                                            >
                                                <img src={image} alt={`${product.name} view ${index + 1}`} className="h-28 w-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Meta */}
                            <div className="space-y-8">
                                <header className="space-y-4">
                                    <p className="text-xs uppercase tracking-[0.45em] text-white/50">
                                        atelier reference • {product.id.slice(0, 8)}
                                    </p>
                                    <h1 className="text-4xl md:text-5xl font-bold">{product.name}</h1>
                                    <p className="text-white/70 leading-relaxed">{product.description}</p>
                                </header>

                                <div className="flex flex-wrap items-baseline gap-4 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur px-6 py-5">
                                    <span className="text-3xl font-semibold bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-transparent bg-clip-text">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    {product.discountPrice && (
                                        <span className="text-sm uppercase tracking-[0.25em] text-white/40 line-through">
                                            ${product.discountPrice.toFixed(2)}
                                        </span>
                                    )}
                                    <span className="text-xs uppercase tracking-[0.35em] text-white/60">
                                        {inStock ? 'available for immediate dispatch' : 'temporarily waitlisted'}
                                    </span>
                                </div>

                                {/* Color Selection */}
                                {product.colors?.length ? (
                                    <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Colorway</p>
                                            <span className="text-[11px] uppercase tracking-[0.35em] text-white/40">{selectedColor}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {product.colors.map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`relative h-11 w-11 rounded-full border-2 transition-all duration-300 ${selectedColor === color ? 'border-white/80 scale-110' : 'border-white/10 hover:border-white/40'
                                                        }`}
                                                    title={color}
                                                >
                                                    <span
                                                        className="absolute inset-[6px] rounded-full"
                                                        style={{
                                                            background:
                                                                color.toLowerCase() === 'white'
                                                                    ? '#f8fafc'
                                                                    : color.toLowerCase() === 'black'
                                                                        ? '#020617'
                                                                        : color,
                                                        }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}

                                {/* Size Selection */}
                                {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
                                    <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Sizing</p>
                                            <span className="text-[11px] uppercase tracking-[0.35em] text-white/40">{selectedSize}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {product.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.35em] transition-all duration-300 ${selectedSize === size
                                                        ? 'bg-white text-gray-900'
                                                        : 'border border-white/15 bg-transparent text-white/70 hover:border-white/40'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity */}
                                <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur p-6 space-y-4">
                                    <p className="text-xs uppercase tracking-[0.35em] text-white/60">Quantity</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center rounded-full border border-white/15 bg-white/10">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-4 py-3 text-white/70 hover:text-white"
                                                disabled={!inStock}
                                            >
                                                -
                                            </button>
                                            <span className="min-w-[64px] text-center font-semibold">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                                                className="px-4 py-3 text-white/70 hover:text-white"
                                                disabled={!inStock}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                                            Max {stock}
                                        </span>
                                    </div>
                                </div>

                                {/* CTAs */}
                                <div className="space-y-4">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={!inStock}
                                        className={`w-full rounded-full px-8 py-4 text-xs uppercase tracking-[0.4em] transition-all ${inStock
                                            ? 'bg-white text-gray-900 hover:bg-white/90'
                                            : 'bg-white/20 text-white/50 cursor-not-allowed'
                                            }`}
                                    >
                                        {inStock ? 'Add to atelier tote' : 'Join waitlist'}
                                    </button>
                                    <button
                                        onClick={() => router.push('/cart')}
                                        className="w-full rounded-full border border-white/20 px-8 py-4 text-xs uppercase tracking-[0.4em] text-white/70 hover:text-white hover:border-white/40 transition-all"
                                    >
                                        View cart
                                    </button>

                                    {showAddedMessage && (
                                        <div className="rounded-2xl border border-white/10 bg-emerald-500/10 px-6 py-4 text-sm text-emerald-200">
                                            Added to your atelier tote. Continue curating or view the full ensemble.
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur p-6 space-y-4 text-sm text-white/70">
                                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">composition & care</p>
                                    <p>
                                        Crafted with precision finishing and hand-pressed seams. Dry clean only to preserve garment
                                        architecture.
                                    </p>
                                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs uppercase tracking-[0.3em] text-white/40">
                                        <div className="space-y-2">
                                            <dt>Category</dt>
                                            <dd className="text-white/70">{product.category || '—'}</dd>
                                        </div>
                                        <div className="space-y-2">
                                            <dt>Product ID</dt>
                                            <dd className="text-white/70">{product.id}</dd>
                                        </div>
                                        {product.sizes?.length ? (
                                            <div className="space-y-2">
                                                <dt>Sizes</dt>
                                                <dd className="text-white/70">{product.sizes.join(', ')}</dd>
                                            </div>
                                        ) : null}
                                        {product.colors?.length ? (
                                            <div className="space-y-2">
                                                <dt>Colorways</dt>
                                                <dd className="text-white/70">{product.colors.length}</dd>
                                            </div>
                                        ) : null}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {relatedProducts.length > 0 && (
                    <section className="relative border-t border-white/10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_60%)]" />
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.45em] text-white/50">curated for you</p>
                                    <h2 className="mt-3 text-3xl font-semibold text-white">Complementary silhouettes</h2>
                                </div>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.4em] text-white/70 hover:text-white transition-colors"
                                >
                                    View full edit
                                    <span aria-hidden>→</span>
                                </Link>
                            </div>
                            <ProductGrid products={relatedProducts} loading={false} />
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}