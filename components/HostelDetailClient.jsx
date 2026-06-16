'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import {
  MapPin, Phone, ShieldCheck, Wifi, Car, Wind, Tv,
  WashingMachine, Dumbbell, CookingPot, Utensils, Droplets,
  Zap, BookOpen, Lock, Cigarette, PawPrint, Bed, Footprints,
  ShowerHead, Share2, ChevronLeft, ChevronRight,
  BadgeCheck, Building2, Star, X, CheckCircle2
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const AMENITY_MAP = {
  wifi: { icon: Wifi, label: 'Wi-Fi' },
  parking: { icon: Car, label: 'Parking' },
  ac: { icon: Wind, label: 'Air Conditioning' },
  tv: { icon: Tv, label: 'TV' },
  laundry: { icon: WashingMachine, label: 'Laundry' },
  gym: { icon: Dumbbell, label: 'Gym' },
  kitchen: { icon: CookingPot, label: 'Kitchen' },
  meals: { icon: Utensils, label: 'Meals Included' },
  geyser: { icon: Droplets, label: 'Geyser' },
  electricity: { icon: Zap, label: '24/7 Electricity' },
  security: { icon: ShieldCheck, label: 'Security Guard' },
  study_room: { icon: BookOpen, label: 'Study Room' },
  attached_bath: { icon: ShowerHead, label: 'Attached Bathroom' },
  furnished: { icon: Bed, label: 'Furnished Rooms' },
  locker: { icon: Lock, label: 'Lockers' },
  no_smoking: { icon: Cigarette, label: 'No Smoking' },
  pets_allowed: { icon: PawPrint, label: 'Pets Allowed' },
  terrace: { icon: Footprints, label: 'Terrace' },
};

/* ─── Skeleton ─── */
function Skeleton({ className }) {
  return <div className={`bg-slate-100 animate-pulse rounded-lg ${className}`} />;
}

function HostelDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-20">
        {/* Title */}
        <div className="mb-6 space-y-2.5">
          <Skeleton className="h-9 w-2/3" />
          <div className="flex gap-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        {/* Photo grid */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] rounded-2xl overflow-hidden mb-10">
          <div className="col-span-2 row-span-2 bg-slate-100 animate-pulse" />
          {[0, 1, 2, 3].map(i => <div key={i} className="bg-slate-100 animate-pulse" />)}
        </div>
        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
          <div>
            <div className="flex justify-between items-center pb-7 border-b border-slate-100">
              <div className="space-y-2"><Skeleton className="h-6 w-52" /><Skeleton className="h-4 w-36" /></div>
              <Skeleton className="w-14 h-14 rounded-full" />
            </div>
            <div className="py-7 border-b border-slate-100 grid grid-cols-3 gap-4">
              {[0, 1, 2].map(i => <div key={i} className="p-4 rounded-2xl border border-slate-100 space-y-2"><Skeleton className="h-6 w-6 rounded-full" /><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-32" /></div>)}
            </div>
            <div className="py-7 border-b border-slate-100 space-y-3">
              <Skeleton className="h-6 w-40" />
              {[85, 70, 90, 60].map((w, i) => <Skeleton key={i} className="h-3.5" style={{ width: `${w}%` }} />)}
            </div>
            <div className="py-7 border-b border-slate-100 space-y-4">
              <Skeleton className="h-6 w-44" />
              <div className="grid grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => <div key={i} className="flex gap-3 items-center"><Skeleton className="w-10 h-10 rounded-xl shrink-0" /><Skeleton className="h-4 w-28" /></div>)}
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-2xl border border-slate-200 p-6 space-y-4 shadow-lg">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <div className="pt-2 space-y-3">
                {[0, 1, 2].map(i => <div key={i} className="flex justify-between"><Skeleton className="h-3 w-1/3" /><Skeleton className="h-3 w-1/4" /></div>)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─── Main ─── */
export default function HostelDetailClient() {
  const { id } = useParams();
  const router = useRouter();
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const { data: hostel, isLoading, error } = useQuery({
    queryKey: ['hostel', id],
    queryFn: async () => {
      const res = await fetch(`/api/hostels/${id}`);
      const r = await res.json();
      if (!r.success) throw new Error(r.error);
      return r.data;
    }
  });

  const ctaRef = React.useRef(null);
  const [ctaVisible, setCtaVisible] = React.useState(false);
  React.useEffect(() => {
    if (!hostel) return;
    const obs = new IntersectionObserver(([e]) => setCtaVisible(e.isIntersecting), { threshold: 0.05 });
    if (ctaRef.current) obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, [hostel]);

  if (isLoading) return <HostelDetailSkeleton />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-10 max-w-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Failed to load</h2>
        <p className="text-sm text-slate-500 mb-6">{error.message}</p>
        <button onClick={() => router.back()} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold cursor-pointer">← Go Back</button>
      </div>
    </div>
  );

  const images = hostel.images || [];
  const typeLabel = hostel.hostelType === 'boys' ? 'Boys Only' : hostel.hostelType === 'girls' ? 'Girls Only' : 'Co-ed';
  const typeBg = hostel.hostelType === 'boys' ? 'bg-sky-50 text-sky-700 border-sky-200' : hostel.hostelType === 'girls' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-purple-50 text-purple-700 border-purple-200';

  const highlights = [
    hostel.verified && { icon: BadgeCheck, title: 'Verified Property', desc: 'Reviewed and verified by our safety team.' },
    { icon: MapPin, title: `Located in ${hostel.area}`, desc: `${hostel.city} — Near universities & transport.` },
    hostel.mess?.available && { icon: Utensils, title: 'Mess Service Available', desc: `${hostel.mess.compulsory ? 'Compulsory' : 'Optional'} — Rs. ${hostel.mess.price?.toLocaleString()}/month.` },
    hostel.amenities?.includes('security') && { icon: ShieldCheck, title: '24/7 Security', desc: 'Round-the-clock security for residents.' },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center" onClick={() => setLightboxIdx(null)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white p-2.5 rounded-full bg-white/10 cursor-pointer" onClick={() => setLightboxIdx(null)}><X size={20} /></button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer" onClick={e => { e.stopPropagation(); setLightboxIdx(i => Math.max(0, i - 1)); }}><ChevronLeft size={26} /></button>
          <img src={images[lightboxIdx]?.url} alt="" className="max-h-[88vh] max-w-[88vw] object-contain rounded-xl" onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer" onClick={e => { e.stopPropagation(); setLightboxIdx(i => Math.min(images.length - 1, i + 1)); }}><ChevronRight size={26} /></button>
          <p className="absolute bottom-5 text-white/50 text-sm">{lightboxIdx + 1} / {images.length}</p>
        </div>
      )}

      {/* Mobile bottom CTA */}
      <div className={`lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/85 backdrop-blur-xl border-t border-slate-200/50 px-4 pt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ${ctaVisible ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`} style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom,0px))' }}>
        <div className="flex gap-3 max-w-md mx-auto">
          <a href={`tel:${hostel.phone}`} className="relative flex-1 py-3.5 rounded-xl bg-gradient-to-r from-primary to-[#ff6b6b] text-white text-[15px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-active:translate-y-0 transition-transform duration-300 ease-in-out" />
            <Phone size={18} className="relative z-10" /> <span className="relative z-10">Call</span>
          </a>
          <a href={`https://wa.me/${hostel.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="relative flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[15px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/30 active:scale-[0.98] transition-transform overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-active:translate-y-0 transition-transform duration-300 ease-in-out" />
            <FaWhatsapp size={20} className="relative z-10" /> <span className="relative z-10">WhatsApp</span>
          </a>
        </div>
      </div>

      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-28 lg:pb-16">

        {/* ── Title bar ── */}
        <div className="mb-5">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 leading-tight flex items-center gap-2 flex-wrap">
              {hostel.name}
              {hostel.verified && <BadgeCheck className="fill-blue-500 text-white w-6 h-6 shrink-0" />}
            </h1>
            <button className="shrink-0 flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl px-3.5 py-2 hover:bg-slate-50 transition-all cursor-pointer mt-0.5">
              <Share2 size={14} /> Share
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1 font-semibold text-slate-800">
              <Star size={13} className="fill-slate-800 text-slate-800" /> 4.9 <span className="font-normal text-slate-400">· 42 reviews</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="underline underline-offset-2 text-slate-700">{hostel.area}, {hostel.city}</span>
            <span className="text-slate-300">·</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${typeBg}`}>{typeLabel}</span>
          </div>
        </div>

        {/* ── Photo Grid ── */}
        <div className="relative mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[260px] sm:h-[380px] md:h-[440px] rounded-2xl overflow-hidden">
            <button className="md:col-span-2 md:row-span-2 relative overflow-hidden group cursor-pointer w-full h-full" onClick={() => setLightboxIdx(0)}>
              {images[0] ? <img src={images[0].url} alt={hostel.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" /> : <div className="w-full h-full bg-slate-100 flex items-center justify-center"><Building2 size={48} className="text-slate-300" /></div>}
            </button>
            {[1, 2, 3, 4].map(i => (
              <button key={i} className="hidden md:block relative overflow-hidden group cursor-pointer bg-slate-100" onClick={() => setLightboxIdx(i)}>
                {images[i] ? <img src={images[i].url} alt="" className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" /> : <div className="w-full h-full bg-slate-100" />}
              </button>
            ))}
          </div>
          {images.length > 5 && (
            <button onClick={() => setLightboxIdx(0)} className="absolute bottom-4 right-4 bg-white border border-slate-300 text-slate-800 text-sm font-semibold px-4 py-2 rounded-xl shadow-sm flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
              <span className="grid grid-cols-2 gap-[2px] w-3 h-3">{[...Array(4)].map((_, i) => <span key={i} className="bg-slate-800 rounded-[1px]" />)}</span>
              Show all {images.length}
            </button>
          )}
        </div>

        {/* ── Body grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16">

          {/* Left column */}
          <div>
            {/* Sentinel for mobile CTA visibility */}
            <div ref={ctaRef} className="absolute top-0 h-px w-px opacity-0 pointer-events-none" />

            {/* Host row */}
            <div className="flex items-center justify-between pb-8 border-b border-slate-100">
              <div>
                <h2 className="text-[22px] font-bold text-slate-900">Hosted by {hostel.owner?.name || 'Property Owner'}</h2>
                <p className="text-slate-500 mt-1 text-sm">
                  {[
                    hostel.capacity?.length > 0 && `${hostel.capacity.length} room type${hostel.capacity.length > 1 ? 's' : ''}`,
                    hostel.amenities?.length > 0 && `${hostel.amenities.length} amenities`,
                    hostel.verified && 'Verified'
                  ].filter(Boolean).join(' · ')}
                </p>
              </div>
              <div className="w-14 h-14 rounded-full bg-slate-900 text-white text-2xl font-bold flex items-center justify-center shrink-0 select-none shadow-lg">
                {hostel.owner?.name?.charAt(0)?.toUpperCase() || 'H'}
              </div>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="py-8 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {highlights.map(({ icon: Icon, title, desc }, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                      <Icon size={18} className="text-slate-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            {hostel.description && (
              <div className="py-8 border-b border-slate-100">
                <h3 className="text-[18px] font-bold text-slate-900 mb-4">About this property</h3>
                <p className="text-slate-600 leading-[1.8] text-[15px] whitespace-pre-wrap break-words">{hostel.description}</p>
              </div>
            )}

            {/* Room Types */}
            {hostel.capacity?.length > 0 && (
              <div className="py-8 border-b border-slate-100">
                <h3 className="text-[18px] font-bold text-slate-900 mb-5">Available room types</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hostel.capacity.map((item, i) => (
                    <div key={i} className="group relative rounded-2xl border border-slate-200 bg-white p-5 hover:border-primary hover:shadow-md hover:shadow-primary/5 transition-all duration-200">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                          <Bed size={18} className="text-slate-600" />
                        </div>
                        <CheckCircle2 size={16} className="text-slate-200 group-hover:text-primary transition-colors mt-1" />
                      </div>
                      <p className="font-bold text-slate-900 text-[15px]">{item.seater}</p>
                      <p className="text-xs text-slate-400 mt-0.5 mb-3">Monthly occupancy</p>
                      <p className="text-xl font-bold text-slate-900">Rs. {item.price?.toLocaleString()}<span className="text-sm text-slate-400 font-normal ml-1">/ mo</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {hostel.amenities?.length > 0 && (
              <div className="py-8 border-b border-slate-100">
                <h3 className="text-[18px] font-bold text-slate-900 mb-6">What this place offers</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-8">
                  {hostel.amenities.map(key => {
                    const a = AMENITY_MAP[key];
                    const Icon = a?.icon || Building2;
                    const label = a?.label || key.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
                    return (
                      <div key={key} className="flex items-center gap-3.5">
                        <Icon size={20} className="text-slate-600 shrink-0" />
                        <span className="text-[15px] text-slate-700">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Nearby Unis */}
            {hostel.nearbyUniversities?.length > 0 && (
              <div className="py-8">
                <h3 className="text-[18px] font-bold text-slate-900 mb-4">Nearby universities</h3>
                <div className="flex flex-wrap gap-2">
                  {hostel.nearbyUniversities.map((u, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-slate-300 transition-colors">
                      <Building2 size={13} className="text-slate-400" />
                      {u.split('(')[0].trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right sticky sidebar */}
          <div className="hidden lg:block self-start">
            <div className="sticky top-[5.5rem] rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/8 overflow-hidden">

              {/* Price header */}
              <div className="px-6 pt-6 pb-5 border-b border-slate-100">
                <p className="text-[26px] font-bold text-slate-900 leading-none">
                  Rs. {hostel.price?.toLocaleString()}
                  <span className="text-sm font-normal text-slate-400 ml-1.5">/ month</span>
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-slate-800">4.9</span>
                  <span className="text-sm text-slate-400">· 42 reviews</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="px-6 py-5 space-y-3 border-b border-slate-100">
                <a href={`tel:${hostel.phone}`} className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-[#ff6b6b] hover:from-[#ff6b6b] hover:to-primary text-white text-[15px] font-bold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/40 cursor-pointer overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <Phone size={18} className="relative z-10" /> <span className="relative z-10">Call Owner</span>
                </a>
                <a href={`https://wa.me/${hostel.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-500 hover:to-emerald-500 text-white text-[15px] font-bold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 cursor-pointer overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <FaWhatsapp size={20} className="relative z-10" /> <span className="relative z-10">WhatsApp Owner</span>
                </a>
              </div>

              {/* Price details */}
              {(hostel.capacity?.length > 0 || hostel.mess?.available) && (
                <div className="px-6 py-5 space-y-3 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Price Breakdown</p>
                  {hostel.capacity?.map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">{item.seater}</span>
                      <span className="text-sm font-bold text-slate-900">Rs. {item.price?.toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span></span>
                    </div>
                  ))}
                  {hostel.mess?.available && (
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <span className="text-sm text-slate-600">Mess ({hostel.mess.compulsory ? 'Compulsory' : 'Optional'})</span>
                      <span className="text-sm font-bold text-slate-900">Rs. {hostel.mess.price?.toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span></span>
                    </div>
                  )}
                </div>
              )}

              {/* Listing ID */}
              <div className="px-6 py-4 bg-slate-50 text-center">
                <p className="text-[11px] text-slate-400 font-medium">Listing #{hostel._id?.slice(-8).toUpperCase()}</p>
              </div>
            </div>

            {/* Safety tips */}
            <div className="mt-5 hidden  rounded-2xl bg-amber-50 border border-amber-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={16} className="text-amber-600" />
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Stay Safe Tips</p>
              </div>
              <div className="space-y-3.5">
                {[
                  ['Visit before paying', 'Never pay advance rent before physically visiting.'],
                  ['Verify all amenities', 'Check that all advertised facilities are actually provided.'],
                  ['Always get receipts', 'Keep proof of every payment made to the owner.'],
                ].map(([title, desc], i) => (
                  <div key={i} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{title}</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-4 pt-3.5 border-t border-amber-200">Something suspicious? <span className="text-rose-500 font-semibold cursor-pointer hover:underline">Report listing</span></p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
