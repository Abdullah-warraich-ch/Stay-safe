'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut, User, Layout, Home, Settings, ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="animate-spin text-secondary" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Simple Sidebar */}
            <div className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-50">
                    <h1 className="text-xl font-bold text-primary tracking-tight">Stay Safe<span className="text-secondary">.</span></h1>
                </div>
                <div className="flex-1 py-6 px-4 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/10 text-secondary font-bold">
                        <Layout size={20} /> Dashboard
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                        <Home size={20} /> My Listings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                        <Settings size={20} /> Settings
                    </button>
                </div>
                <div className="p-4 border-t border-slate-50">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-semibold"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Welcome, {user.name}!</h2>
                        <p className="text-slate-500">Here's what's happening with your account.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                            <User size={20} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">Account Role</h3>
                        <p className="text-2xl font-bold text-slate-900 capitalize">{user.role}</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">Email</h3>
                        <p className="text-lg font-bold text-slate-900 truncate">{user.email}</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">Status</h3>
                        <p className="text-2xl font-bold text-green-500 flex items-center gap-2">
                            <ShieldCheck size={24} /> Active
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}