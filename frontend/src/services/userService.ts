/**
 * User Service
 * Business logic for user profile operations
 */

import {
    getDocument,
    setDocument,
    updateDocument,
    COLLECTIONS,
} from '@/lib/firebase/firestore';
import { UserProfile, ShippingAddress } from '@/types/product';
import { User } from 'firebase/auth';

/**
 * Get user profile
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    return await getDocument<UserProfile>('users', userId);
};

/**
 * Create or update user profile
 */
export const saveUserProfile = async (
    userId: string,
    profile: Partial<UserProfile>
): Promise<void> => {
    await setDocument('users', userId, profile);
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
    userId: string,
    updates: Partial<UserProfile>
): Promise<void> => {
    await updateDocument('users', userId, updates);
};

/**
 * Add shipping address
 */
export const addShippingAddress = async (
    userId: string,
    address: ShippingAddress
): Promise<void> => {
    const profile = await getUserProfile(userId);

    const addresses = profile?.addresses || [];
    addresses.push(address);

    await updateDocument('users', userId, { addresses });
};

/**
 * Update shipping address
 */
export const updateShippingAddress = async (
    userId: string,
    addressIndex: number,
    address: ShippingAddress
): Promise<void> => {
    const profile = await getUserProfile(userId);

    if (profile?.addresses && profile.addresses[addressIndex]) {
        profile.addresses[addressIndex] = address;
        await updateDocument('users', userId, { addresses: profile.addresses });
    }
};

/**
 * Delete shipping address
 */
export const deleteShippingAddress = async (
    userId: string,
    addressIndex: number
): Promise<void> => {
    const profile = await getUserProfile(userId);

    if (profile?.addresses) {
        profile.addresses.splice(addressIndex, 1);
        await updateDocument('users', userId, { addresses: profile.addresses });
    }
};

/**
 * Sync Firebase Auth user data to Firestore profile
 */
export const syncUserProfile = async (user: User): Promise<void> => {
    const existingProfile = await getUserProfile(user.uid);

    await setDocument('users', user.uid, {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || existingProfile?.displayName || '',
        photoURL: user.photoURL || existingProfile?.photoURL || '',
        addresses: existingProfile?.addresses || [],
    });
};

