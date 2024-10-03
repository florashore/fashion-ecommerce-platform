'use client';

/**
 * User Profile Page
 * Luxury account dashboard with fashion aesthetic
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile, syncUserProfile } from '@/services/userService';
import { getUserOrders } from '@/services/orderService';
import { UserProfile, Order } from '@/types/product';
import Header from '../components/layout/Header';
import ProfileEditForm from '../components/profile/ProfileEditForm';
import AddressManager from '../components/profile/AddressManager';

type ProfileTab = 'profile' | 'orders' | 'addresses';

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<ProfileTab>('profile');

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!user) {
                router.push('/auth/signin');
                return;
            }

            try {
                setLoading(true);
                await syncUserProfile(user);
                const userProfile = await getUserProfile(user.uid);
                setProfile(userProfile);

                const orders = await getUserOrders(user.uid);
                setRecentOrders(orders.slice(0, 6));
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchProfileData();
        }
    }, [user, authLoading, router]);

    const handleProfileUpdate = async () => {
        if (user) {
            const updatedProfile = await getUserProfile(user.uid);
            setProfile(updatedProfile);
            setIsEditing(false);
        }
    };

    if (authLoading || loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                    <div className="space-y-4 text-center">
                        <div className="mx-auto h-12 w-12 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <p className="text-white/60">Loading atelier profile…</p>
                    </div>
                </main>
            </>
        );
    }

    if (!user) {
        return null;
    }

    const tabs: { key: ProfileTab; label: string; icon: string; description: string }[] = [
        { key: 'profile', label: 'Profile', icon: '👤', description: 'Edit identity' },
        { key: 'addresses', label: 'Addresses', icon: '📍', description: 'Shipping vault' },
        { key: 'orders', label: 'Orders', icon: '📦', description: 'Order archive' },
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(236,72,153,0.2),transparent_65%)]" />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
                        {/* Header */}
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                            <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                                <div className="flex items-center gap-6">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || 'Profile'}
                                            className="h-20 w-20 rounded-full border-4 border-white/40 object-cover"
                                        />
                                    ) : (
                                        <div className="h-20 w-20 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-3xl font-semibold">
                                            {(user.displayName || user.email || 'U')[0].toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.45em] text-white/60">atelier member</p>
                                        <h1 className="mt-2 text-3xl font-semibold">{profile?.displayName || user.displayName || 'Guest'}</h1>
                                        <p className="mt-2 text-sm text-white/60">{user.email}</p>
                                    </div>
                                </div>
                                <div className="grid gap-3 text-xs uppercase tracking-[0.35em] text-white/50">
                                    <span>Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '—'}</span>
                                    <span>{recentOrders.length} {recentOrders.length === 1 ? 'order' : 'orders'} placed</span>
                                </div>
                            </div>
                            <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-10">
                                <p className="text-xs uppercase tracking-[0.45em] text-white/60">profile notes</p>
                                <p className="mt-4 text-sm text-white/70 leading-relaxed">
                                    Keep your atelier dossier current to receive bespoke recommendations, invitation-only previews, and priority shipping.
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white/60">
                                        curated edits
                                    </span>
                                    <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white/60">
                                        atelier circle
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap gap-4">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur px-6 py-5 text-left transition-all duration-300 ${activeTab === tab.key ? 'shadow-[0_25px_45px_-25px_rgba(59,130,246,0.5)]' : 'opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-xl">{tab.icon}</span>
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white">{tab.label}</p>
                                            <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-white/50">{tab.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)]">
                            {activeTab === 'profile' && (
                                <section className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-10 space-y-8">
                                    <div className="flex flex-wrap items-center justify-between gap-6">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.45em] text-white/60">identity dossier</p>
                                            <h2 className="mt-2 text-2xl font-semibold text-white">Profile & preferences</h2>
                                        </div>
                                        {!isEditing && (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.4em] text-white/70 hover:text-white hover:border-white/40 transition-all"
                                            >
                                                Edit profile
                                            </button>
                                        )}
                                    </div>

                                    {isEditing ? (
                                        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                                            <ProfileEditForm
                                                user={user}
                                                profile={profile}
                                                onSave={handleProfileUpdate}
                                                onCancel={() => setIsEditing(false)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 space-y-2">
                                                <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">Display name</p>
                                                <p className="text-lg text-white">
                                                    {profile?.displayName || user.displayName || 'Not set'}
                                                </p>
                                            </div>
                                            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 space-y-2">
                                                <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">Email</p>
                                                <p className="text-lg text-white">{user.email}</p>
                                            </div>
                                            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 space-y-2">
                                                <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">Bio</p>
                                                <p className="text-sm text-white/70">
                                                    {profile?.description || 'Add a short description so our stylists can better curate recommendations.'}
                                                </p>
                                            </div>
                                            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 space-y-2">
                                                <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">Atelier tier</p>
                                                <p className="text-sm text-white/70">Signature member</p>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            )}

                            {activeTab === 'addresses' && (
                                <section className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-10 space-y-6">
                                    <div className="flex flex-wrap items-center justify-between gap-6">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.45em] text-white/60">shipping atelier</p>
                                            <h2 className="mt-2 text-2xl font-semibold text-white">Address book</h2>
                                        </div>
                                        <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">
                                            Save preferred destinations for express dispatch.
                                        </p>
                                    </div>
                                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                                        <AddressManager userId={user.uid} addresses={profile?.addresses || []} />
                                    </div>
                                </section>
                            )}

                            {activeTab === 'orders' && (
                                <section className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur p-10 space-y-8">
                                    <div className="flex flex-wrap items-center justify-between gap-6">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.45em] text-white/60">archive</p>
                                            <h2 className="mt-2 text-2xl font-semibold text-white">Order history</h2>
                                        </div>
                                        <Link
                                            href="/products"
                                            className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.4em] text-white/70 hover:text-white hover:border-white/40 transition-all"
                                        >
                                            Browse new edit
                                            <span aria-hidden>→</span>
                                        </Link>
                                    </div>

                                    {recentOrders.length === 0 ? (
                                        <div className="rounded-[28px] border border-white/10 bg-white/5 p-12 text-center text-white/60">
                                            No atelier pieces ordered yet. Begin your curated journey.
                                        </div>
                                    ) : (
                                        <div className="grid gap-6">
                                            {recentOrders.map((order) => (
                                                <div key={order.id} className="rounded-[24px] border border-white/10 bg-white/5 p-6 space-y-4">
                                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                                        <div>
                                                            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                                                                Order #{order.orderNumber}
                                                            </p>
                                                            <p className="mt-1 text-sm text-white/70">
                                                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Date unavailable'}
                                                            </p>
                                                        </div>
                                                        <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white/70">
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="grid gap-4 text-xs uppercase tracking-[0.35em] text-white/50 md:grid-cols-4">
                                                        <div>
                                                            <p>Total</p>
                                                            <p className="mt-1 text-sm text-white">
                                                                ${order.totalAmount.toFixed(2)}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p>Pieces</p>
                                                            <p className="mt-1 text-sm text-white">{order.items.length}</p>
                                                        </div>
                                                        <div>
                                                            <p>Payment</p>
                                                            <p className="mt-1 text-sm text-white/80">{order.paymentMethod}</p>
                                                        </div>
                                                        <div>
                                                            <p>Shipping</p>
                                                            <p className="mt-1 text-sm text-white/80">
                                                                {order.shippingAddress.city}, {order.shippingAddress.country}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
