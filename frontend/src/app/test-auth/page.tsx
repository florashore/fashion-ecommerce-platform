'use client';

/**
 * Authentication Test Page
 * Test all authentication methods including Google Sign-In
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { signInWithGoogle, signOut } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import Header from '../components/layout/Header';

export default function TestAuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    setIsSigningIn(true);

    try {
      await signInWithGoogle();
      setSuccess('✅ Successfully signed in with Google!');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setSuccess('✅ Successfully signed out!');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              🔐 Authentication Test Page
            </h1>

            {/* Status Section */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Authentication Status
              </h2>
              
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 text-2xl">✓</span>
                    <span className="text-lg font-semibold text-gray-900">
                      Signed In
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Display Name:</strong> {user.displayName || 'Not set'}</p>
                    <p><strong>User ID:</strong> {user.uid}</p>
                    <p><strong>Email Verified:</strong> {user.emailVerified ? '✅ Yes' : '❌ No'}</p>
                    
                    {user.photoURL && (
                      <div>
                        <p className="mb-2"><strong>Profile Photo:</strong></p>
                        <img 
                          src={user.photoURL} 
                          alt="Profile" 
                          className="w-16 h-16 rounded-full border-2 border-indigo-500"
                        />
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Provider:</strong>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {user.providerData.map((provider, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                          >
                            {provider.providerId}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-red-600 text-2xl">✗</span>
                  <span className="text-lg font-semibold text-gray-900">
                    Not Signed In
                  </span>
                </div>
              )}
            </div>

            {/* Messages */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                <p>{success}</p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              {!user ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Test Authentication
                  </h2>

                  {/* Google Sign-In Button */}
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isSigningIn}
                    className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="font-semibold">
                      {isSigningIn ? 'Signing in...' : 'Sign in with Google'}
                    </span>
                  </button>

                  <div className="text-center text-gray-500">or</div>

                  {/* Regular Sign In/Up */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => router.push('/auth/signin')}
                      className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 font-semibold"
                    >
                      Email Sign In
                    </button>
                    <button
                      onClick={() => router.push('/auth/signup')}
                      className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 font-semibold"
                    >
                      Email Sign Up
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => router.push('/products')}
                      className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 font-semibold"
                    >
                      Browse Products
                    </button>
                    <button
                      onClick={() => router.push('/cart')}
                      className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-semibold"
                    >
                      View Cart
                    </button>
                    <button
                      onClick={() => router.push('/orders')}
                      className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 font-semibold"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 font-semibold"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                📋 Setup Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-blue-900">
                <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Firebase Console</a></li>
                <li>Select your project</li>
                <li>Go to <strong>Authentication → Sign-in method</strong></li>
                <li>Enable <strong>Google</strong> provider</li>
                <li>Select a support email</li>
                <li>Click <strong>Save</strong></li>
                <li>Return here and click "Sign in with Google"</li>
              </ol>
              <p className="mt-4 text-sm text-blue-800">
                💡 <strong>Tip:</strong> Check <code className="bg-blue-100 px-2 py-1 rounded">GOOGLE_LOGIN_SETUP.md</code> for detailed instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

