"use client";

import Link from "next/link";
import { Star, Trash } from "lucide-react";
import Image from "next/image";
import { deleteHostel } from "@/utils/https";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function HostelCard({ hostel, showDeleteButton }) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteHostel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-hostels'] });
        },
    });
    const getHostelTypeLabel = (type) => {
        if (type === 'boys') return 'Boys';
        if (type === 'girls') return 'Girls';
        return 'Co-ed';
    };
    const getHostelTypeBadgeClass = (type) => {
        if (type === 'boys') return 'bg-sky-50/95 text-sky-700 ring-sky-200/80';
        if (type === 'girls') return 'bg-rose-50/95 text-rose-700 ring-rose-200/80';
        return 'bg-white/95 text-slate-900 ring-black/5';
    };

    return (
        <Link href={`/hostels/${hostel._id}`} className="group flex flex-col gap-3 cursor-pointer">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-200">
                <Image
                    src={hostel.images?.[0]?.url || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={hostel.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Heart Button */}
                {showDeleteButton ? (
                    <button
                        className="absolute top-3 right-3 transition-all active:scale-90 z-10 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 p-1.5 rounded-full backdrop-blur-md shadow-sm border border-black/5"
                        onClick={(e) => { e.preventDefault(); deleteMutation.mutate(hostel._id); }}
                    >
                        <Trash size={18} strokeWidth={2.5} />
                    </button>
                ) : (
                    <button
                        className="absolute top-3 right-3 transition-transform active:scale-90 z-10"
                        onClick={(e) => { e.preventDefault(); }}
                    >
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'rgba(0, 0, 0, 0.5)', height: '24px', width: '24px', stroke: 'var(--linaria-theme_palette-bg-primary)', strokeWidth: '2', overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-6.94c-2.87 0-5.4 1.5-6.69 3.86l-.31.57-.31-.57A7.4 7.4 0 0 0 9 4.06 6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
                    </button>
                )}



                {/* Optional Tag (like Guest Favorite) */}
                {hostel.verified && (
                    <div className="absolute top-3 left-3 bg-secondary px-2 py-1 rounded-full shadow-md text-[13px] font-bold text-white shadow-black/10">
                        Verified
                    </div>
                )}

                <div className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-[12px] font-medium shadow-sm ring-1 backdrop-blur ${getHostelTypeBadgeClass(hostel.hostelType)}`}>
                    {getHostelTypeLabel(hostel.hostelType)}
                </div>
            </div>

            {/* Info Container */}
            <div className="flex flex-col gap-1">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 flex-1 truncate text-[15px] font-semibold leading-snug text-slate-950">
                        {hostel.name}
                    </h3>
                    <div className="flex shrink-0 items-center gap-1 pt-0.5 text-[14px] leading-none text-slate-900">
                        <Star size={12} className="fill-slate-900 text-slate-900" />
                        <span>4.9</span>
                    </div>
                </div>
                <p className="truncate text-[13px] leading-normal text-slate-500">{hostel.area}, {hostel.city}</p>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                    {hostel.price ? (
                        <>
                            <span className="text-[15px] font-semibold leading-snug text-slate-950">
                                Rs. {hostel.price.toLocaleString()}
                            </span>
                            <span className="text-[13px] leading-snug text-slate-400">per month</span>
                        </>
                    ) : (
                        <span className="text-[15px] font-semibold leading-snug text-slate-950">Contact for price</span>
                    )}
                </div>
            </div>
        </Link>
    )
}
