'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Users, Star, Loader2, Plus, Building2, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

export default function MyHostels({ ownerId }) {
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

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-secondary mb-4" size={32} />
                <p className="text-slate-500 font-medium">Loading your listings...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl border border-red-100 p-8 text-center">
                <p className="text-red-500 font-medium">Error: {error.message}</p>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                    <Building2 size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">No Listings Yet</h3>
                <p className="text-slate-500 text-sm max-w-xs mb-6">
                    You haven't added any hostels yet. Start by creating your first listing.
                </p>
                <Link
                    href="/dashboard/create-listing"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-white text-[14px] font-bold hover:brightness-110 transition-all shadow-md shadow-secondary/15"
                >
                    <Plus size={18} /> Create First Listing
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-lg font-bold text-slate-800">My Listings ({data.length})</h3>
                <Link href="/dashboard/create-listing" className="text-secondary text-[13px] font-bold hover:underline">
                    Add New
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((hostel) => (
                    <Link href={`/hostels/${hostel._id}`} key={hostel._id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col cursor-pointer">
                        {/* Image Header */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                                src={hostel.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
                                alt={hostel.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3 flex gap-2">
                                {hostel.verified && (
                                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 bg-green-500 text-white animate-in zoom-in duration-300">
                                        <CheckCircle2 size={12} /> Verified
                                    </span>
                                )}
                                <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-slate-800 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                    {hostel.hostelType}
                                </span>
                            </div>
                            <div className="absolute bottom-3 right-3">
                                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm">
                                    <p className="text-[14px] font-extrabold text-secondary">
                                        Rs. {hostel.price?.toLocaleString()}<span className="text-[10px] text-slate-400 font-bold">/mo</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="mb-3">
                                <h4 className="text-[16px] font-bold text-slate-900 group-hover:text-secondary transition-colors line-clamp-1">
                                    {hostel.name}
                                </h4>
                                <div className="flex items-center gap-1 text-slate-400 mt-1">
                                    <MapPin size={12} />
                                    <p className="text-[12px] font-medium truncate">{hostel.area}, {hostel.city}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-slate-50">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                        <Users size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter leading-none">Capacity</p>
                                        <p className="text-[12px] font-bold text-slate-700">{hostel.capacity?.length || 0} Types</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                        <Star size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter leading-none">Amenities</p>
                                        <p className="text-[12px] font-bold text-slate-700">{hostel.amenities?.length || 0} Added</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto flex gap-2 pt-1">
                                <button className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 text-[12px] font-bold hover:bg-slate-50 transition-all cursor-pointer">
                                    Edit Details
                                </button>
                                <button className="px-3 py-2 rounded-xl bg-slate-900 text-white text-[12px] font-bold hover:bg-slate-800 transition-all cursor-pointer">
                                    Stats
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
