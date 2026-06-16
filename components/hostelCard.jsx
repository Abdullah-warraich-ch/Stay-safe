"use client";

import Link from "next/link";
import { Star, Trash, Edit } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteHostel } from "@/utils/https";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function HostelCard({ hostel, showDeleteButton }) {
    const router = useRouter();
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
        if (type === 'boys') return 'bg-white text-sky-700 border-0 ring-0';
        if (type === 'girls') return 'bg-white text-rose-700 border-0 ring-0';
        return 'bg-white text-slate-900 border-0 ring-0';
    };

    return (
        <Link href={`/hostels/${hostel.slug || hostel._id}`} className="group flex flex-col gap-3 cursor-pointer h-full">
            {/* Image Container */}
            <div className="relative aspect-square shrink-0 overflow-hidden rounded-xl bg-slate-200 border-b-2 border-primary shadow-xl shadow-black/10">
                <Image
                    src={hostel.images?.[0]?.url || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={hostel.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Edit & Heart/Delete Buttons */}
                {showDeleteButton ? (
                    <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                        <button
                            className="transition-all active:scale-90 bg-white/90 hover:bg-emerald-500 hover:text-white text-emerald-500 p-1.5 rounded-full backdrop-blur-md shadow-sm border border-black/5"
                            onClick={(e) => { e.preventDefault(); router.push(`/dashboard/create-listing?id=${hostel._id}`); }}
                        >
                            <Edit size={18} strokeWidth={2.5} />
                        </button>
                        <button
                            className="transition-all active:scale-90 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 p-1.5 rounded-full backdrop-blur-md shadow-sm border border-black/5"
                            onClick={(e) => { e.preventDefault(); deleteMutation.mutate(hostel._id); }}
                        >
                            <Trash size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                ) : (
                    <button
                        className="absolute top-3 right-3 transition-transform active:scale-90 z-10"
                        onClick={(e) => { e.preventDefault(); }}
                    >
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'rgba(0, 0, 0, 0.5)', height: '26px', width: '26px', stroke: 'var(--linaria-theme_palette-bg-primary)', strokeWidth: '2', overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-6.94c-2.87 0-5.4 1.5-6.69 3.86l-.31.57-.31-.57A7.4 7.4 0 0 0 9 4.06 6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
                    </button>
                )}



                {/* Optional Tag (like Guest Favorite) */}
                {hostel.verified && (
                    <div className="absolute top-3 left-3 bg-primary px-3 py-1.5 rounded-full shadow-md text-[14px] font-bold text-white shadow-black/10">
                        Verified
                    </div>
                )}

                <div className={`absolute bottom-3 left-0 rounded-tr-full rounded-br-full px-3 py-1 text-[14px] font-bold shadow-sm  ${getHostelTypeBadgeClass(hostel.hostelType)}`}>
                    {getHostelTypeLabel(hostel.hostelType)}
                </div>
            </div>

            {/* Info Container */}
            <div className="flex flex-col gap-0.5 px-1 mt-1">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="min-w-0 flex-1 truncate text-[15px] font-semibold leading-snug text-slate-950">
                        {hostel.name}
                    </h3>
                    <div className="flex shrink-0 items-center gap-0.5 text-[13px] leading-none text-slate-900 font-medium">
                        <Star size={12} className="fill-slate-900 text-slate-900" />
                        <span>4.9</span>
                    </div>
                </div>
                <p className="truncate text-[13px] leading-normal text-slate-500">{hostel.area}, {hostel.city}</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                    {hostel.price ? (
                        <>
                            <span className="text-[15px] font-semibold leading-snug text-slate-950">
                                Rs. {hostel.price.toLocaleString()}
                            </span>
                            <span className="text-[12px] leading-snug text-slate-400">/ month</span>
                        </>
                    ) : (
                        <span className="text-[14px] font-semibold leading-snug text-slate-950">Contact for price</span>
                    )}
                </div>
            </div>
        </Link>
    )
}
