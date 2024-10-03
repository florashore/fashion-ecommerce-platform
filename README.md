# 🛍️ Fashion Ecommerce Platform

A modern, full-stack ecommerce platform built with **Next.js 13**, **Firebase**, and **TypeScript**. Features include user authentication, product management, shopping cart, checkout, and order tracking.

## 🌟 Features

### Customer Features
- 🔐 User Authentication (Email/Password & Google Sign-In)
- 🛒 Shopping Cart Management
- 📦 Product Browsing & Search
- 💳 Secure Checkout Process
- 📱 Responsive Design (Mobile, Tablet, Desktop)
- 📊 Order History & Tracking
- ⭐ Product Reviews & Ratings

### Admin Features
- 📝 Product Management (Create, Read, Update, Delete)
- 📸 Image Upload Support
- 📊 Dashboard with Statistics
- 🔄 Order Management
- 📦 Inventory Tracking

## 🚀 Tech Stack

### Frontend
- **Next.js 13** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase SDK** - Authentication, Firestore, Storage

### Backend Options
- **Firebase** - Primary backend (Firestore, Auth, Storage)
- **Express.js** - Additional REST API (optional)
- **PostgreSQL** - Secondary database with Prisma ORM

## 📁 Project Structure

```
fashion-ecommerce-platform/
├── frontend/                    # Next.js Frontend Application
│   ├── src/
│   │   ├── app/                # Next.js 13 App Router
│   │   │   ├── components/     # React Components
│   │   │   ├── admin/          # Admin Dashboard
│   │   │   ├── products/       # Product Pages
│   │   │   ├── cart/           # Shopping Cart
│   │   │   ├── checkout/       # Checkout Flow
│   │   │   └── auth/           # Authentication Pages
│   │   ├── contexts/           # React Context (Auth, Cart)
│   │   ├── lib/                # Firebase Configuration
│   │   ├── services/           # Business Logic
│   │   └── types/              # TypeScript Definitions
│   └── package.json
│
├── backend/                     # Express.js Backend (Optional)
│   ├── src/
│   │   ├── routes/             # API Routes
│   │   ├── repos/              # Database Repositories
│   │   └── server.ts           # Express Server
│   ├── prisma/                 # Prisma Schema
│   └── package.json
│
├── FIREBASE_SETUP.md           # Detailed Firebase Setup Guide
├── API_CONFIG.md               # API Configuration Guide
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Firebase account (free tier works)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd fashion-ecommerce-platform
   ```

2. **Set up Firebase:**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password & Google)
   - Create a Firestore database
   - Enable Storage
   - Copy your Firebase configuration

3. **Configure Frontend:**
   ```bash
   cd frontend
   npm install
   
   # Create .env.local file
   cp .env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔥 Firebase Setup

For detailed Firebase setup instructions, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🗄️ Database Structure

### Firestore Collections

- **products** - Product catalog with details, pricing, and inventory
- **cart** - User shopping carts
- **orders** - Order history and tracking
- **users** - User profiles and preferences
- **categories** - Product categories
- **reviews** - Product reviews and ratings

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for complete schema details.

## 📖 Usage

### Customer Flow
1. Sign up or sign in
2. Browse products by category
3. Add products to cart
4. Proceed to checkout
5. Enter shipping information
6. Place order
7. Track order status

### Admin Flow
1. Sign in with admin account
2. Navigate to `/admin`
3. Add/edit/delete products
4. Manage orders
5. Upload product images

## 🔐 Authentication

The platform supports multiple authentication methods:
- Email & Password
- Google Sign-In
- (Easily extensible to other providers)

## 🛠️ Development

### Available Scripts

```bash
# Frontend
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Backend (Optional)
cd backend
npm run dev          # Start Express server
npm run build        # Build TypeScript
npm start            # Start production server
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 🚢 Deployment

### Frontend (Vercel - Recommended)
```bash
vercel deploy
```

### Frontend (Other platforms)
```bash
npm run build
npm start
```

### Firebase Hosting
```bash
firebase init hosting
firebase deploy
```

## 🔒 Security

### Best Practices Implemented
- ✅ Firebase Authentication
- ✅ Firestore Security Rules
- ✅ Environment Variables for Secrets
- ✅ HTTPS Only
- ✅ Input Validation
- ✅ CORS Configuration

### Production Security Checklist
- [ ] Update Firestore security rules
- [ ] Enable Firebase App Check
- [ ] Set up monitoring and alerts
- [ ] Implement rate limiting
- [ ] Add email verification
- [ ] Review and audit code

## 📱 Responsive Design

Fully responsive design that works on:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1920px+)

## 🧪 Testing

```bash
# Run tests
npm test

# Run E2E tests
npm run cypress
```

## 📚 Documentation

- [Firebase Setup Guide](./FIREBASE_SETUP.md) - Complete Firebase configuration
- [API Configuration](./API_CONFIG.md) - Express backend setup
- [Component Documentation](./frontend/src/app/components/README.md) - Component usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Product images require direct URLs (Firebase Storage integration ready)
- Admin role management needs to be implemented
- Email verification is optional

## 🔮 Future Enhancements

- [ ] Product recommendations
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Discount codes/coupons
- [ ] Multi-currency support
- [ ] Dark mode
- [ ] Progressive Web App (PWA)
- [ ] Real-time inventory updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Firebase team for the backend infrastructure
- Tailwind CSS for the styling system
- The open-source community

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Happy Shopping! 🛍️**

Built with ❤️ using Next.js, Firebase, and TypeScript
