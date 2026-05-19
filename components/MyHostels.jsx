'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Users, Star, Loader2, Plus, Building2, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import HostelCard from './hostelCard';

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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {data.map((hostel) => (
                    <HostelCard hostel={hostel} key={hostel._id} />
                ))}
            </div>
        </div>
    );
}
