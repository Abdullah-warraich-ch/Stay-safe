'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Building2 } from 'lucide-react';
import Link from 'next/link';
import HostelCard from '../hostels/HostelCard';
import CardSkeleton from '../hostels/CardSkeleton';
import { useAuth } from '@/context/AuthContext';

export default function MyHostels({ ownerId, viewMode = 'grid' }) {
    const { user } = useAuth();
    const userId = user?._id ?? user?.id;

    const { data, isLoading, error } = useQuery({
        queryKey: ['my-hostels', ownerId],
        queryFn: async () => {
            const res = await fetch(`/api/dashboard/my-hostels?ownerId=${ownerId}`);
            const result = await res.json();
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
        enabled: !!ownerId
    });

    /* ── Loading ── */
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[...Array(4)].map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        );
    }

    /* ── Error ── */
    if (error) {
        return (
            <div className="bg-white rounded-2xl border border-red-100 p-8 text-center shadow-sm">
                <p className="text-red-500 font-semibold text-sm">Failed to load listings</p>
                <p className="text-slate-400 text-xs mt-1">{error.message}</p>
            </div>
        );
    }

    /* ── Empty ── */
    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-14 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                    <Building2 size={32} />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">No Listings Yet</h3>
                <p className="text-slate-500 text-sm max-w-xs mb-6">
                    You haven&apos;t added any hostels yet. Create your first listing to get started.
                </p>
                <Link
                    href="/dashboard/create-listing"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-[14px] font-bold hover:brightness-110 transition-all shadow-md shadow-primary/15"
                >
                    <Plus size={18} /> Create First Listing
                </Link>
            </div>
        );
    }

    /* ── Grid view ── */
    if (viewMode === 'grid') {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {data.map((hostel) => (
                    <HostelCard
                        hostel={hostel}
                        key={hostel._id}
                        showDeleteButton={
                            String(hostel.owner) === String(userId) ||
                            String(hostel.owner?._id) === String(userId)
                        }
                    />
                ))}
            </div>
        );
    }

    /* ── List view ── */
    return (
        <div className="space-y-3">
            {data.map((hostel) => (
                <Link
                    href={`/hostels/${hostel.slug || hostel._id}`}
                    key={hostel._id}
                    className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 hover:border-slate-200 hover:shadow-sm transition-all group"
                >
                    {/* Thumb */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        {hostel.images?.[0]?.url ? (
                            <img src={hostel.images[0].url} alt={hostel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <Building2 size={22} />
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 text-[14px] truncate">{hostel.name}</p>
                        <p className="text-[12px] text-slate-400 mt-0.5 truncate">{hostel.area}, {hostel.city}</p>
                        <p className="text-[13px] font-semibold text-slate-700 mt-0.5">
                            Rs. {hostel.price?.toLocaleString()}<span className="text-slate-400 font-normal text-[11px]">/mo</span>
                        </p>
                    </div>

                    {/* Status */}
                    <div className="shrink-0 text-right">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${hostel.verified ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            {hostel.verified ? 'Verified' : 'Pending'}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
