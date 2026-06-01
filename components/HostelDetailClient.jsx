'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import {
  MapPin, Phone, Users, ShieldCheck, Wifi, Car, Wind, Tv,
  WashingMachine, Dumbbell, CookingPot, Utensils, Droplets,
  Zap, BookOpen, Lock, Cigarette, PawPrint, Bed, Footprints,
  ShowerHead, Heart, Share2, Loader2,
  BadgeCheck, Building2, Star
} from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

const AMENITY_ICONS = {
  wifi: Wifi,
  parking: Car,
  ac: Wind,
  tv: Tv,
  laundry: WashingMachine,
  gym: Dumbbell,
  kitchen: CookingPot,
  meals: Utensils,
  geyser: Droplets,
  electricity: Zap,
  security: ShieldCheck,
  study_room: BookOpen,
  attached_bath: ShowerHead,
  furnished: Bed,
  locker: Lock,
  no_smoking: Cigarette,
  pets_allowed: PawPrint,
  terrace: Footprints,
};

export default function HostelDetailClient() {
  const { id } = useParams();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);

  const { data: hostel, isLoading, error } = useQuery({
    queryKey: ['hostel', id],
    queryFn: async () => {
      const res = await fetch(`/api/hostels/${id}`);
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  });

  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const ctaRef = React.useRef(null);

  React.useEffect(() => {
    if (!hostel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCtaVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.05,
      }
    );

    const currentRef = ctaRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hostel]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-slate-400" size={32} />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 text-center">
      <div className="max-w-md p-8 bg-white border border-slate-100 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Property</h2>
        <p className="text-slate-505 text-sm mb-6">{error.message}</p>
        <button onClick={() => router.back()} className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-all">Go Back</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Nav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Mobile Floating CTA Bar */}
          <div 
            className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 ease-in-out ${
              isCtaVisible ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
            }`}
            style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))', paddingTop: '1rem' }}
          >
            <div className="flex gap-2 max-w-lg mx-auto w-full">
              <a 
                href={`tel:${hostel.phone}`} 
                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-sm cursor-pointer"
              >
                <Phone size={14} /> Call Owner
              </a>
              <a 
                href={`https://wa.me/${hostel.phone.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <FaWhatsapp size={15} className="text-emerald-500" /> WhatsApp Owner
              </a>
            </div>
          </div>

          {/* ─── LEFT COLUMN: Gallery & Info ─── */}
          <div className="lg:col-span-8 space-y-8">

            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-sm group">
                <img
                  src={hostel.images[activeImage]?.url}
                  alt={hostel.name}
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-[1.01]"
                />

                {/* Floating Type Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="px-3 py-1.5 bg-slate-900/90 backdrop-blur-md rounded-lg text-white text-[10px] font-semibold uppercase tracking-wider shadow-sm">
                    {hostel.hostelType} Only
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <button className="p-2.5 rounded-full bg-white/95 backdrop-blur-md text-slate-400 hover:text-rose-500 hover:bg-white shadow-sm hover:shadow transition-all cursor-pointer">
                    <Heart size={18} />
                  </button>
                </div>
              </div>

              {/* Thumbnails Row */}
              {hostel.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  {hostel.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImage === idx
                        ? 'border-slate-800 scale-95 shadow-sm'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-95'
                        }`}
                    >
                      <img src={img.url} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center flex-wrap gap-2">
                      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                        {hostel.name}
                      </h1>
                      {hostel.verified && (
                        <BadgeCheck className="text-white fill-[#1877F2] w-6 h-6 shrink-0 align-middle" title="Verified Property" />
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                      <MapPin size={15} className="text-slate-400 shrink-0" />
                      <span>{hostel.area}, {hostel.city}</span>
                    </div>
                  </div>

                  <button className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <Share2 size={15} />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>

                {/* Universities tags */}
                {hostel.nearbyUniversities && hostel.nearbyUniversities.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {hostel.nearbyUniversities.map((uni, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-medium rounded-lg">
                        Near {uni.split('(')[0].trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tags list */}
                {hostel.tags && hostel.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {hostel.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs text-slate-400 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">About this space</h3>
                <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap font-normal">
                  {hostel.description}
                </p>
              </div>
            </div>

            {/* Room Options */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Available Room Types</h3>
                <span className="text-xs font-semibold text-slate-400">{hostel.capacity?.length} Seater Options</span>
              </div>

              <div className="divide-y divide-slate-100">
                {hostel.capacity?.map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
                        <Bed size={16} />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 text-sm">{item.seater}</span>
                        <p className="text-[11px] text-slate-400 font-medium">Monthly occupancy rent</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">Rs. {item.price?.toLocaleString()}</span>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Per Month</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities List */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-6">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">Amenities & Facilities</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                {hostel.amenities?.map((id) => {
                  const Icon = AMENITY_ICONS[id] || Building2;
                  const label = id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                  return (
                    <div key={id} className="flex items-center gap-3 py-0.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                        <Icon size={15} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mess Section */}
            {hostel.mess?.available && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                    <Utensils size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Monthly Mess Service</h4>
                    <p className="text-xs text-slate-500 max-w-md leading-relaxed mt-0.5">
                      Freshly prepared meals served daily. {hostel.mess.compulsory ? 'Compulsory requirement for all residents.' : 'Optional/opt-in service.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-stretch sm:self-auto justify-between sm:justify-start">
                  <span className="text-xs font-semibold text-slate-400">
                    {hostel.mess.compulsory ? 'Compulsory' : 'Optional'}
                  </span>
                  <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-sm">
                    Rs. {hostel.mess.price?.toLocaleString()}/mo
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─── RIGHT COLUMN: Sticky Sidebar ─── */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">

              {/* Price & Contact Card */}
              <div className=" bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Starting From</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Rs. {hostel.price?.toLocaleString()} <span className="text-xs text-slate-400 font-semibold tracking-normal">/mo</span>
                  </h3>
                </div>

                <div className="pt-5 border-t border-slate-100 space-y-4">
                  {/* Host info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-600 text-sm font-semibold select-none">
                      {hostel.owner?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 leading-none">{hostel.owner?.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">Property Host</p>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center gap-1">
                      <Users size={14} className="text-slate-500" />
                      <span className="text-[10px] font-semibold text-slate-600">{hostel.capacity?.length} Types</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center gap-1">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      <span className="text-[10px] font-semibold text-slate-600">4.8 Rating</span>
                    </div>
                  </div>
                </div>

                {/* Call & WhatsApp CTA Buttons */}
                <div ref={ctaRef} className="flex gap-2 pt-2">
                  <a
                    href={`tel:${hostel.phone}`}
                    className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-sm cursor-pointer"
                  >
                    <Phone size={14} /> Call Owner
                  </a>
                  <a
                    href={`https://wa.me/${hostel.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    <FaWhatsapp size={15} className="text-emerald-500" /> WhatsApp Owner
                  </a>
                </div>

                <div className="text-center pt-2">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Listing ID: {hostel._id?.slice(-8).toUpperCase()}</p>
                </div>
              </div>

              {/* Safety Tips Card */}
              <div className="bg-amber-50/40 border border-amber-100/60 rounded-2xl p-6 space-y-4 relative overflow-hidden">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-amber-600" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Stay Safe Tips</h4>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Visit Personally", desc: "Never pay advance rent before visiting the hostel." },
                    { title: "Verify Facilities", desc: "Check if all promised amenities are actually available." },
                    { title: "Payment Proof", desc: "Always take a receipt for every payment." }
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="text-amber-600/80 font-bold text-xs">0{i + 1}</div>
                      <div>
                        <h5 className="text-xs font-semibold text-slate-800 mb-0.5">{tip.title}</h5>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-normal">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-amber-200/30">
                  <p className="text-[10px] text-slate-400 font-medium">
                    Report listing if suspicious. <span className="text-rose-500 font-semibold cursor-pointer hover:underline">Report Now</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
