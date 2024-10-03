/**
 * Landing Page Content
 * Provides curated content for the fashion landing page
 */

const landingContent = {
    hero: {
        eyebrow: '2025 • runway capsule',
        titlePrimary: 'Stories from the',
        titleHighlight: 'midnight atelier',
        description:
            'A curated crescendo of nocturnal tailoring, reflective silks, and luminous outerwear designed for electric evenings and twilight runways.',
        backgroundImage: 'https://images.unsplash.com/photo-1520975867597-0af37a22e31f?w=1920&q=80',
        collageImage: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80',
        collageCaption: 'Obsidian Light AW25',
        gallery: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1600&q=80',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1600&q=80',
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80',
            'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1600&q=80',
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1600&q=80',
            'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1600&q=80',
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1600&q=80',
            'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=1600&q=80',
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1600&q=80',
            'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1600&q=80'
        ],
        palette: ['#0f172a', '#312e81', '#e11d48', '#fcd34d'],
        paletteLabels: ['midnight', 'nocturne', 'neon rouge', 'liquid gold'],
        primaryCta: {
            label: 'Explore Runway Edit',
            href: '/products',
        },
        secondaryCta: {
            label: 'Accessory Vault',
            href: '/products?category=Accessories',
        },
        stats: [
            {
                label: 'featured artisans',
                value: '32',
                description: 'hand-finished ateliers',
            },
            {
                label: 'exclusive fabrics',
                value: '118',
                description: 'archival textiles sourced',
            },
            {
                label: 'global editors',
                value: '+54',
                description: 'fashion publications featured',
            },
        ],
    },
    marqueeLabels: [
        'atelier archives',
        'couture dreams',
        'runway edit',
        'london fashion week',
        'midnight collection',
        'sculpted tailoring',
        'editorial capsule',
    ],
    highlightCollections: [
        {
            title: 'Midnight Reverie',
            description: 'Velvet tailoring with sculptural silhouettes in deep sapphire hues.',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80',
            href: '/products?category=Formal',
            badge: 'New drop',
        },
        {
            title: 'Chromatic Street',
            description: 'City-ready essentials with iridescent finishes and tactile layering.',
            image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80',
            href: '/products?category=Outerwear',
            badge: 'Limited',
        },
        {
            title: 'Atelier 1998',
            description: 'Hand-finished details inspired by archival runway couture.',
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=80',
            href: '/products?category=Accessories',
            badge: 'Signature',
        },
    ],
    editorialStories: [
        {
            title: 'The Texture Issue',
            excerpt: 'Sculpted leather, powder-soft cashmere, and glass-like sheen fabrics for AW25.',
            image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1200&q=80',
            tag: 'Runway Journal',
        },
        {
            title: 'Architecture of Night',
            excerpt: 'Sharp shoulders, liquid drape gowns, and luminescent beadwork after dusk.',
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
            tag: 'Lookbook',
        },
        {
            title: 'Chromatic Pulse',
            excerpt: 'A chroma story in obsidian, opaline lilac, and molten bronze accents.',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80',
            tag: 'Editors’ Pick',
        },
    ],
    newsletter: {
        eyebrow: 'private invitation',
        title: 'Join the atelier circle',
        description:
            'Receive first access to capsule releases, atelier fittings, and private runway screenings curated by our creative directors.',
        placeholder: 'Email for invitations',
        ctaLabel: 'Request access',
    },
};

export default landingContent;

