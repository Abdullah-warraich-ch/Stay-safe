"use client";

import Link from "next/link";
import { Star, Trash, Edit, Building, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteHostel } from "@/utils/https";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ModalComponent from "../ui/ConfirmPopup";
import { useState } from 'react'
import toast from 'react-hot-toast';
import PropertyTypeLoader from "../ui/PropertyTypeLoader";


export default function HostelCard({ hostel, showDeleteButton }) {
    const [isOpen, setIsOpen] = useState(false);
    const [imgLoading, setImgLoading] = useState(true);
    const router = useRouter();
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteHostel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-hostels'] });
            toast.success('Hostel deleted successfully!');
        },
        onError: (error) => {
            toast.error('Failed to delete hostel');
        }
    });
    const getHostelTypeLabel = (type) => {
        if (type === 'boys') return 'Boys';
        if (type === 'girls') return 'Girls';
        return 'Co-ed';
    };

    const getHostelTypeColor = (type) => {
        if (type === 'boys') return 'bg-sky-500';
        if (type === 'girls') return 'bg-rose-500';
        return 'bg-violet-500';
    };

    return (
        <>
            <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen} action={() => deleteMutation.mutate(hostel._id)} title="Are you sure you want to delete this Hostel?" desc="This action is permanent and cannot be undone. Once deleted, the item will be removed from your account." />

            <Link href={`/hostels/${hostel.slug || hostel._id}`} className="hostel-card group block cursor-pointer h-full">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-200/60 border border-slate-100/80">

                    {/* Full-bleed Image */}
                    {hostel.images?.[0]?.url ? (
                        <>
                            {imgLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-[5]">
                                    <PropertyTypeLoader />
                                </div>
                            )}
                            <Image
                                src={hostel.images[0].url}
                                alt={hostel.name}
                                fill
                                className={`object-cover transition-opacity duration-300 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                onLoad={() => setImgLoading(false)}
                            />
                        </>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 px-4 text-center bg-slate-50">
                            <Building size={42} strokeWidth={1.5} className="mb-2" />
                            <span className="text-[13px] font-semibold text-slate-500">No Image Available</span>
                            <span className="text-[11px] mt-1 leading-tight text-slate-400">But you can still contact the owner.</span>
                        </div>
                    )}

                    {/* Gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/25 z-[1]" />

                    {/* ─── Top Row: Avatar + Rating ─── */}
                    <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between p-3">
                        {/* Avatar + Name */}
                        <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md ring-2 ring-white/25 ${getHostelTypeColor(hostel.hostelType)}`}>
                                {hostel.name?.charAt(0)?.toUpperCase() || 'H'}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-[11px] font-semibold leading-tight drop-shadow-lg truncate max-w-[110px]">
                                    {hostel.name}
                                </span>
                                <span className="text-white/65 text-[9px] font-medium leading-tight">
                                    {getHostelTypeLabel(hostel.hostelType)}
                                </span>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 bg-emerald-400 text-slate-900 px-2 py-0.5 rounded-full shadow-md">
                            <Star size={10} className="fill-slate-900 text-slate-900" />
                            <span className="text-[10px] font-bold leading-none">4.9</span>
                        </div>
                    </div>

                    {/* ─── Edit & Delete (Dashboard) ─── */}
                    {showDeleteButton && (
                        <div className="absolute top-12 right-3 flex flex-col items-center gap-1.5 z-10">
                            <button
                                className="transition-all active:scale-90 bg-white/80 hover:bg-emerald-500 hover:text-white text-emerald-600 p-1.5 rounded-full backdrop-blur-md shadow-sm"
                                onClick={(e) => { e.preventDefault(); router.push(`/dashboard/create-listing?id=${hostel._id}`); }}
                            >
                                <Edit size={14} strokeWidth={2.5} />
                            </button>
                            <button
                                className="transition-all active:scale-90 bg-white/80 hover:bg-red-500 hover:text-white text-red-500 p-1.5 rounded-full backdrop-blur-md shadow-sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsOpen(true);
                                }}
                            >
                                <Trash size={14} strokeWidth={2.5} />
                            </button>
                        </div>
                    )}

                    {/* ─── Verified Badge ─── */}
                    {hostel.verified && (
                        <div className="absolute top-12 left-3 z-10 bg-primary/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] font-bold text-white shadow-md uppercase tracking-wider">
                            Verified
                        </div>
                    )}

                    {/* ─── Floating Bottom White Bar ─── */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                        <div className="flex items-center justify-between gap-3 bg-white rounded-xl px-4 py-2.5 shadow-lg">
                            {/* Price */}
                            <div className="flex items-baseline gap-1 min-w-0">
                                {hostel.price ? (
                                    <>
                                        <span className="text-slate-900 text-[15px] font-bold leading-none tracking-tight">
                                            Rs.{hostel.price.toLocaleString()}
                                        </span>
                                        <span className="text-slate-400 text-[11px] font-medium leading-none">/mo</span>
                                    </>
                                ) : (
                                    <span className="text-slate-800 text-[13px] font-semibold leading-none">Contact for price</span>
                                )}
                            </div>

                            {/* View Button */}
                            <div className="flex items-center gap-1 bg-slate-900 text-white px-3.5 py-2 rounded-full transition-all duration-300 group-hover:bg-primary shrink-0">
                                <span className="text-[11px] font-semibold leading-none">View</span>
                                <ArrowUpRight size={11} strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>

    )
}
