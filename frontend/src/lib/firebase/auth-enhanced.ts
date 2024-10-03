/**
 * Enhanced Firebase Authentication Service
 * Includes additional Google Sign-In features
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  User,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  sendPasswordResetEmail,
  linkWithPopup,
} from 'firebase/auth';
import { auth, db } from './config';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

// Configure Google Auth Provider with custom parameters
const googleProvider = new GoogleAuthProvider();

// Add scopes for additional user information
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Customize the sign-in experience
googleProvider.setCustomParameters({
  prompt: 'select_account', // Always show account selection
});

/**
 * Sign in with Google using popup
 * This is the default method - works on most platforms
 */
export const signInWithGooglePopup = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Create or update user profile in Firestore
    await createUserProfile(result.user);
    
    return result;
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw handleAuthError(error);
  }
};

/**
 * Sign in with Google using redirect
 * Better for mobile browsers that block popups
 */
export const signInWithGoogleRedirect = async (): Promise<void> => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error: any) {
    console.error('Google Redirect Error:', error);
    throw handleAuthError(error);
  }
};

/**
 * Handle redirect result after Google Sign-In
 * Call this on page load to complete redirect flow
 */
export const handleGoogleRedirectResult = async (): Promise<UserCredential | null> => {
  try {
    const result = await getRedirectResult(auth);
    
    if (result) {
      // User successfully signed in
      await createUserProfile(result.user);
      return result;
    }
    
    return null;
  } catch (error: any) {
    console.error('Google Redirect Result Error:', error);
    throw handleAuthError(error);
  }
};

/**
 * Link Google account to existing email/password account
 */
export const linkGoogleAccount = async (): Promise<UserCredential> => {
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('No user is currently signed in');
  }
  
  try {
    const result = await linkWithPopup(user, googleProvider);
    await createUserProfile(result.user);
    return result;
  } catch (error: any) {
    console.error('Link Google Account Error:', error);
    throw handleAuthError(error);
  }
};

/**
 * Create or update user profile in Firestore after Google Sign-In
 */
const createUserProfile = async (user: User): Promise<void> => {
  try {
    const userRef = doc(db, 'users', user.uid);
    
    await setDoc(
      userRef,
      {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        provider: 'google',
        lastSignInTime: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
      { merge: true } // Don't overwrite existing data
    );
  } catch (error) {
    console.error('Error creating user profile:', error);
    // Don't throw - user is still authenticated
  }
};

/**
 * Handle authentication errors with user-friendly messages
 */
const handleAuthError = (error: any): Error => {
  let message = 'An error occurred during authentication';
  
  switch (error.code) {
    case 'auth/popup-blocked':
      message = 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
      break;
    case 'auth/popup-closed-by-user':
      message = 'Sign-in was cancelled. Please try again.';
      break;
    case 'auth/unauthorized-domain':
      message = 'This domain is not authorized. Please contact support.';
      break;
    case 'auth/account-exists-with-different-credential':
      message = 'An account already exists with this email using a different sign-in method.';
      break;
    case 'auth/network-request-failed':
      message = 'Network error. Please check your internet connection.';
      break;
    case 'auth/too-many-requests':
      message = 'Too many attempts. Please try again later.';
      break;
    default:
      message = error.message || message;
  }
  
  return new Error(message);
};

/**
 * Get Google user information
 */
export const getGoogleUserInfo = (user: User) => {
  const googleProvider = user.providerData.find(
    (provider) => provider.providerId === 'google.com'
  );
  
  return {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    isGoogleUser: !!googleProvider,
  };
};

/**
 * Check if user signed in with Google
 */
export const isGoogleUser = (user: User | null): boolean => {
  if (!user) return false;
  
  return user.providerData.some(
    (provider) => provider.providerId === 'google.com'
  );
};

// Re-export common auth functions
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseSignOut as signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
};

