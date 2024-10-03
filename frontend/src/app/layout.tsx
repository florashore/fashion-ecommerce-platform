import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FashionShop - Modern Ecommerce Platform',
  description: 'Discover the latest fashion trends with Firebase-powered shopping experience',
}

import Footer from './components/layout/Footer';
import CanvasBackground from './components/animations/CanvasBackground';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <CanvasBackground />
            <div className="relative z-10">
              {children}
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
