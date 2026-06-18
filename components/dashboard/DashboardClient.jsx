'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Plus, Building2, ShieldCheck, Heart, Settings } from 'lucide-react';
import Nav from '@/components/layout/Nav';
import MyHostels from '@/components/dashboard/MyHostels';
import Link from 'next/link';

export default function DashboardContent() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50">
            <Nav />

            <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 py-8">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome, {user.name}!</h2>
                        <p className="text-slate-500 text-sm mt-0.5">Here&apos;s what&apos;s happening with your account.</p>
                    </div>
                    <Link
                        href="/dashboard/create-listing"
                        className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-[13px] font-bold hover:brightness-110 transition-all shadow-sm shadow-primary/15 cursor-pointer"
                    >
                        <Plus size={16} /> New Listing
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="text-slate-400 text-[12px] font-semibold mb-1 uppercase tracking-wider">Role</h3>
                        <p className="text-xl font-bold text-slate-900 capitalize">{user.role}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="text-slate-400 text-[12px] font-semibold mb-1 uppercase tracking-wider">Email</h3>
                        <p className="text-[14px] font-bold text-slate-900 truncate">{user.email}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="text-slate-400 text-[12px] font-semibold mb-1 uppercase tracking-wider">City</h3>
                        <p className="text-xl font-bold text-slate-900">{user.city || '—'}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="text-slate-400 text-[12px] font-semibold mb-1 uppercase tracking-wider">Status</h3>
                        <p className="text-xl font-bold text-green-500 flex items-center gap-2">
                            <ShieldCheck size={20} /> Active
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-8">
                    <h3 className="text-[15px] font-bold text-slate-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href="/dashboard/create-listing"
                            className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all group cursor-pointer"
                        >
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                <Plus size={20} />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-800">Create Listing</p>
                                <p className="text-[12px] text-slate-400">Add a new hostel</p>
                            </div>
                        </Link>
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                                <Building2 size={20} />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-800">My Listings</p>
                                <p className="text-[12px] text-slate-400">View & manage</p>
                            </div>
                        </div>
                        <Link
                            href="/dashboard/favorites"
                            className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all group cursor-pointer"
                        >
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                <Heart size={20} />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-800">Loved Hostels</p>
                                <p className="text-[12px] text-slate-400">Your favorites</p>
                            </div>
                        </Link>
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                                <Settings size={20} />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-800">Settings</p>
                                <p className="text-[12px] text-slate-400">Edit profile</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* My Hostels List */}
                <MyHostels ownerId={user.id} />

                {/* Mobile FAB */}
                <Link
                    href="/dashboard/create-listing"
                    className="sm:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 z-50 hover:brightness-110 transition-all cursor-pointer"
                >
                    <Plus size={24} />
                </Link>
            </div>
        </div>
    );
}
