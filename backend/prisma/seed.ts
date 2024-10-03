/**
 * Database Seed Script
 * Populates the database with sample fashion products
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  // Men's Clothing
  {
    id: '1',
    name: 'Classic White Oxford Shirt',
    description: 'Timeless white cotton oxford shirt with button-down collar. Perfect for office or casual wear.',
    price: 49.99,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80'],
    inStock: true,
    stockQuantity: 45,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue'],
  },
  {
    id: '2',
    name: 'Slim Fit Dark Jeans',
    description: 'Premium denim jeans with slim fit cut. Comfortable stretch fabric with classic five-pocket design.',
    price: 79.99,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80'],
    inStock: true,
    stockQuantity: 32,
    sizes: ['30', '32', '34', '36'],
    colors: ['Dark Blue', 'Black'],
  },
  {
    id: '3',
    name: 'Leather Jacket',
    description: 'Genuine leather jacket with quilted shoulders. Classic biker style with multiple pockets.',
    price: 249.99,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80'],
    inStock: true,
    stockQuantity: 15,
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
  },
  {
    id: '4',
    name: 'Cotton Crew Neck T-Shirt',
    description: 'Soft cotton t-shirt with comfortable fit. Basic wardrobe essential in multiple colors.',
    price: 24.99,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80'],
    inStock: true,
    stockQuantity: 120,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
  },

  // Women's Clothing
  {
    id: '5',
    name: 'Floral Summer Dress',
    description: 'Light and breezy summer dress with floral print. Perfect for warm weather occasions.',
    price: 69.99,
    category: 'Women',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80'],
    inStock: true,
    stockQuantity: 28,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral Blue', 'Floral Pink'],
  },
  {
    id: '6',
    name: 'High-Waisted Black Trousers',
    description: 'Elegant high-waisted trousers with tailored fit. Professional and versatile.',
    price: 59.99,
    category: 'Women',
    images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80'],
    inStock: true,
    stockQuantity: 42,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Gray'],
  },
  {
    id: '7',
    name: 'Cashmere Sweater',
    description: 'Luxuriously soft cashmere sweater. Lightweight warmth with timeless style.',
    price: 129.99,
    category: 'Women',
    images: ['https://images.unsplash.com/photo-1622519407650-3df9883f76c5?w=800&q=80'],
    inStock: true,
    stockQuantity: 18,
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Gray', 'Burgundy'],
  },
  {
    id: '8',
    name: 'Denim Jacket',
    description: 'Classic denim jacket with vintage wash. Essential layering piece for any wardrobe.',
    price: 89.99,
    category: 'Women',
    images: ['https://images.unsplash.com/photo-1543076659-9380cdf10613?w=800&q=80'],
    inStock: true,
    stockQuantity: 35,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Light Wash', 'Dark Wash'],
  },

  // Shoes
  {
    id: '9',
    name: 'White Leather Sneakers',
    description: 'Clean white leather sneakers with minimalist design. Comfortable for all-day wear.',
    price: 89.99,
    category: 'Shoes',
    images: ['https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80'],
    inStock: true,
    stockQuantity: 55,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'White/Black'],
  },
  {
    id: '10',
    name: 'Chelsea Boots',
    description: 'Premium suede Chelsea boots with elastic side panels. Smart-casual essential.',
    price: 149.99,
    category: 'Shoes',
    images: ['https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80'],
    inStock: true,
    stockQuantity: 22,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Tan', 'Black', 'Navy'],
  },
  {
    id: '11',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning. Perfect for training and daily runs.',
    price: 119.99,
    category: 'Shoes',
    images: ['https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&q=80'],
    inStock: true,
    stockQuantity: 48,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black/Red', 'Gray/Blue'],
  },

  // Accessories
  {
    id: '12',
    name: 'Leather Crossbody Bag',
    description: 'Compact leather crossbody bag with adjustable strap. Perfect size for essentials.',
    price: 79.99,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80'],
    inStock: true,
    stockQuantity: 30,
    sizes: ['One Size'],
    colors: ['Brown', 'Black', 'Tan'],
  },
  {
    id: '13',
    name: 'Classic Aviator Sunglasses',
    description: 'Timeless aviator style sunglasses with UV protection. Metal frame with gradient lenses.',
    price: 149.99,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80'],
    inStock: true,
    stockQuantity: 65,
    sizes: ['One Size'],
    colors: ['Gold/Brown', 'Silver/Gray'],
  },
  {
    id: '14',
    name: 'Leather Belt',
    description: 'Full-grain leather belt with brass buckle. Reversible design with black and brown sides.',
    price: 45.99,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'],
    inStock: true,
    stockQuantity: 75,
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Brown/Black'],
  },
  {
    id: '15',
    name: 'Wool Beanie',
    description: 'Soft merino wool beanie. Warm and comfortable for cold weather.',
    price: 29.99,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80'],
    inStock: true,
    stockQuantity: 90,
    sizes: ['One Size'],
    colors: ['Navy', 'Gray', 'Black', 'Burgundy'],
  },

  // Kids
  {
    id: '16',
    name: "Kids' Graphic T-Shirt",
    description: 'Fun graphic print t-shirt in soft cotton. Machine washable and durable.',
    price: 19.99,
    category: 'Kids',
    images: ['https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80'],
    inStock: true,
    stockQuantity: 80,
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y'],
    colors: ['Blue', 'Red', 'Yellow'],
  },
  {
    id: '17',
    name: "Kids' Denim Overalls",
    description: 'Classic denim overalls with adjustable straps. Comfortable for play and school.',
    price: 39.99,
    category: 'Kids',
    images: ['https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80'],
    inStock: true,
    stockQuantity: 45,
    sizes: ['4Y', '6Y', '8Y', '10Y'],
    colors: ['Blue Denim', 'Black Denim'],
  },

  // Sportswear
  {
    id: '18',
    name: 'Performance Leggings',
    description: 'High-performance leggings with moisture-wicking fabric. Perfect for yoga and gym.',
    price: 54.99,
    category: 'Sportswear',
    images: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80'],
    inStock: true,
    stockQuantity: 60,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Charcoal'],
  },
  {
    id: '19',
    name: 'Athletic Zip Hoodie',
    description: 'Comfortable zip-up hoodie in breathable fabric. Great for warm-ups and casual wear.',
    price: 64.99,
    category: 'Sportswear',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'],
    inStock: true,
    stockQuantity: 52,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Navy', 'Black'],
  },

  // Formal
  {
    id: '20',
    name: 'Navy Wool Suit',
    description: 'Classic two-piece suit in fine wool. Tailored fit with modern cut.',
    price: 399.99,
    category: 'Formal',
    images: ['https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=800&q=80'],
    inStock: true,
    stockQuantity: 12,
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Navy', 'Charcoal'],
  },
  {
    id: '21',
    name: 'Silk Tie',
    description: 'Pure silk tie with subtle pattern. Completes any formal outfit.',
    price: 49.99,
    category: 'Formal',
    images: ['https://images.unsplash.com/photo-1589756823695-278bc8881e58?w=800&q=80'],
    inStock: true,
    stockQuantity: 100,
    sizes: ['One Size'],
    colors: ['Navy', 'Burgundy', 'Gray', 'Black'],
  },

  // Outerwear
  {
    id: '22',
    name: 'Quilted Puffer Jacket',
    description: 'Warm quilted jacket with down insulation. Water-resistant outer shell.',
    price: 159.99,
    category: 'Outerwear',
    images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80'],
    inStock: true,
    stockQuantity: 25,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Olive'],
  },
  {
    id: '23',
    name: 'Wool Trench Coat',
    description: 'Classic trench coat in wool blend. Timeless style with belt detail.',
    price: 199.99,
    category: 'Outerwear',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'],
    inStock: true,
    stockQuantity: 18,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Navy', 'Black'],
  },
  {
    id: '24',
    name: 'Windbreaker',
    description: 'Lightweight windbreaker jacket. Packable design perfect for travel.',
    price: 79.99,
    category: 'Outerwear',
    images: ['https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&q=80'],
    inStock: true,
    stockQuantity: 40,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Black', 'Gray'],
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing products
  await prisma.product.deleteMany({});
  console.log('✅ Cleared existing products');

  // Insert products
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`✅ Seeded ${products.length} products`);
  console.log('🎉 Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

