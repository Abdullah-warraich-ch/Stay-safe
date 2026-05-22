"use client";

import Link from "next/link";
import { Star, Heart, Trash } from "lucide-react";
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
    const renderTypeIcon = (type) => {
        if (type === 'boys') {
            return (
                <span className="inline-flex items-center gap-1 font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider border border-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="14" r="5" /><line x1="13.5" y1="10.5" x2="21" y2="3" /><line x1="16" y1="3" x2="21" y2="3" /><line x1="21" y1="3" x2="21" y2="8" /></svg>
                    Boys
                </span>
            );
        }
        if (type === 'girls') {
            return (
                <span className="inline-flex items-center gap-1 font-bold bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider border border-pink-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="5" /><line x1="12" y1="15" x2="12" y2="22" /><line x1="9" y1="19" x2="15" y2="19" /></svg>
                    Girls
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider border border-purple-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Co-ed
            </span>
        );
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
            </div>

            {/* Info Container */}
            <div className="flex flex-col">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-slate-900 truncate text-[15px]">{hostel.name}</h3>
                    <div className="flex items-center gap-1 text-[14px] shrink-0">
                        <Star size={13} className="fill-slate-900 text-slate-900" />
                        <span>4.9</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                    {renderTypeIcon(hostel.hostelType)}
                    <p className="text-slate-500 text-[14px] truncate">{hostel.area}, {hostel.city}</p>
                </div>
                <div className="mt-1 flex items-baseline gap-1">

                    <span className="font-semibold text-slate-900 text-[15px]">Rs. {hostel.price?.toLocaleString()}</span>
                    <span className="text-slate-900 text-[15px]">month</span>
                </div>
            </div>
        </Link>
    )
}