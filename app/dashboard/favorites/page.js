'use client';

import { useFavorites } from '@/utils/useFavorites';
import Nav from '@/components/layout/Nav';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Building2, MapPin, ArrowUpRight, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FavoritesPage() {
    const { getAll, remove } = useFavorites();
    const hostels = getAll();

    const handleRemove = (hostel) => {
        remove(hostel._id);
        toast('Removed from Loved Hostels', { icon: '💔', duration: 1800 });
    };

    const getTypeColor = (type) => {
        if (type === 'boys') return 'bg-sky-50 text-sky-700 border-sky-200';
        if (type === 'girls') return 'bg-rose-50 text-rose-700 border-rose-200';
        return 'bg-violet-50 text-violet-700 border-violet-200';
    };
    const getTypeLabel = (type) => {
        if (type === 'boys') return 'Boys Only';
        if (type === 'girls') return 'Girls Only';
        return 'Co-ed';
    };

    return (
        <div className="min-h-screen bg-[#f8f9fc]">
            <Nav />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-8 pb-16">

                {/* Header */}
                <div className="flex items-center justify-between mb-7">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Heart className="fill-rose-500 text-rose-500" size={22} />
                            Loved Hostels
                        </h1>
                        <p className="text-slate-500 text-sm mt-0.5">
                            {hostels.length > 0
                                ? `${hostels.length} hostel${hostels.length > 1 ? 's' : ''} saved locally`
                                : 'No hostels saved yet'}
                        </p>
                    </div>
                    <Link
                        href="/hostels"
                        className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-[13px] font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                    >
                        <Search size={14} /> Browse Hostels
                    </Link>
                </div>

                {/* Empty state */}
                {hostels.length === 0 && (
                    <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-16 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-300 mb-4">
                            <Heart size={30} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800 mb-1">Nothing saved yet</h2>
                        <p className="text-slate-500 text-sm max-w-xs mb-6">
                            Tap the ❤️ on any hostel card or detail page to save it here for quick access.
                        </p>
                        <Link
                            href="/hostels"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-[14px] hover:brightness-110 transition-all shadow-lg shadow-primary/25"
                        >
                            <Search size={16} /> Find Hostels
                        </Link>
                    </div>
                )}

                {/* Saved hostels grid */}
                {hostels.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {hostels.map((hostel) => (
                            <div key={hostel._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 overflow-hidden group">

                                {/* Image */}
                                <div className="relative h-44 bg-slate-100 overflow-hidden">
                                    {hostel.images?.[0]?.url ? (
                                        <Image
                                            src={hostel.images[0].url}
                                            alt={hostel.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                            <Building2 size={36} />
                                        </div>
                                    )}

                                    {/* Remove button */}
                                    <button
                                        onClick={() => handleRemove(hostel)}
                                        title="Remove from favourites"
                                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow-md cursor-pointer active:scale-90"
                                    >
                                        <Trash2 size={14} strokeWidth={2.5} />
                                    </button>

                                    {/* Type badge */}
                                    {hostel.hostelType && (
                                        <span className={`absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getTypeColor(hostel.hostelType)}`}>
                                            {getTypeLabel(hostel.hostelType)}
                                        </span>
                                    )}

                                    {/* Verified */}
                                    {hostel.verified && (
                                        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary/90 text-white uppercase tracking-wider">
                                            Verified
                                        </span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <h3 className="font-bold text-slate-900 text-[15px] leading-tight truncate mb-1">{hostel.name}</h3>
                                    {(hostel.area || hostel.city) && (
                                        <p className="flex items-center gap-1 text-[12px] text-slate-400 mb-3">
                                            <MapPin size={11} />
                                            {[hostel.area, hostel.city].filter(Boolean).join(', ')}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between">
                                        {hostel.price ? (
                                            <p className="text-[16px] font-bold text-slate-900">
                                                Rs. {hostel.price.toLocaleString()}
                                                <span className="text-[11px] font-normal text-slate-400 ml-1">/mo</span>
                                            </p>
                                        ) : (
                                            <p className="text-[13px] font-semibold text-slate-500">Contact for price</p>
                                        )}

                                        <Link
                                            href={`/hostels/${hostel.slug || hostel._id}`}
                                            className="flex items-center gap-1 bg-slate-900 hover:bg-primary text-white px-3.5 py-2 rounded-full text-[11px] font-semibold transition-all duration-300 cursor-pointer"
                                        >
                                            View <ArrowUpRight size={11} strokeWidth={2.5} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bottom note */}
                {hostels.length > 0 && (
                    <p className="text-center text-[12px] text-slate-400 mt-8">
                        Saved hostels are stored on this device only. Clearing browser data will remove them.
                    </p>
                )}
            </div>
        </div>
    );
}
