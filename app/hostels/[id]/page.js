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
  ShowerHead, ArrowLeft, Heart, Share2, Info, Loader2,
  CheckCircle2, Building2, User, Star
} from 'lucide-react';
import { FaMale, FaFemale, FaWhatsapp } from "react-icons/fa";

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

export default function HostelDetailPage() {
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

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-secondary" size={40} />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 text-center">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Error loading hostel</h2>
        <p className="text-slate-500 mb-6">{error.message}</p>
        <button onClick={() => router.back()} className="px-6 py-2 bg-secondary text-white rounded-xl font-bold">Go Back</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ─── LEFT COLUMN: Gallery & Info ─── */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-100 border border-slate-50 shadow-sm group">
                <img 
                  src={hostel.images[activeImage]?.url} 
                  alt={hostel.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Actions on Image */}
                <div className="absolute top-6 left-6 flex gap-2">
                  {hostel.verified && (
                    <div className="px-4 py-2 bg-green-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-green-500/20">
                      <CheckCircle2 size={14} /> Verified
                    </div>
                  )}
                  <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-slate-900 text-[11px] font-black uppercase tracking-widest shadow-sm">
                    {hostel.hostelType} Only
                  </div>
                </div>

                <div className="absolute top-6 right-6">
                  <button className="p-3 rounded-full bg-white/90 backdrop-blur-md text-slate-400 hover:text-red-500 hover:bg-white shadow-lg transition-all cursor-pointer">
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              {/* Small Thumbnails on Bottom */}
              <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                {hostel.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-secondary scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight flex-1">{hostel.name}</h1>
                  <button className="p-3 rounded-2xl border border-slate-100 text-slate-400 hover:text-secondary hover:bg-secondary/5 transition-all flex items-center gap-2 text-[14px] font-bold">
                    <Share2 size={18} /> <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-medium text-[16px]">
                  <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <MapPin size={16} />
                  </div>
                  {hostel.area}, {hostel.city}
                </div>
              </div>

              {/* Price Row for Mobile/Tablet (Visible if sidebar not sticky) */}
              <div className="lg:hidden p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Starting From</p>
                    <p className="text-2xl font-black text-secondary">Rs. {hostel.price?.toLocaleString()}</p>
                </div>
                <button className="px-6 py-3 bg-secondary text-white rounded-xl font-bold shadow-lg shadow-secondary/20">Call Owner</button>
              </div>

              <div className="flex flex-wrap gap-2">
                {hostel.nearbyUniversities?.map((uni, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-[11px] font-bold rounded-xl border border-slate-100">
                        Near {uni.split('(')[0].trim()}
                    </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 pt-4 border-t border-slate-50">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">The Space</h3>
                <p className="text-slate-500 leading-relaxed text-[16px] whitespace-pre-wrap font-medium">
                    {hostel.description}
                </p>
            </div>

            {/* Pricing Details */}
            <div className="space-y-6">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">Room Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {hostel.capacity?.map((item, idx) => (
                        <div key={idx} className="p-5 rounded-3xl border border-slate-100 bg-white hover:border-secondary/20 transition-all group">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-secondary/10 group-hover:text-secondary transition-all">
                                        <Bed size={20} />
                                    </div>
                                    <span className="font-bold text-slate-800">{item.seater}</span>
                                </div>
                                <span className="font-black text-slate-900">Rs. {item.price?.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-6 pt-4">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {hostel.amenities?.map((id) => {
                  const Icon = AMENITY_ICONS[id] || Building2;
                  const label = id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                  return (
                    <div key={id} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50/50 border border-slate-50 group hover:bg-white hover:border-slate-100 hover:shadow-sm transition-all text-center gap-2">
                      <Icon className="text-slate-400 group-hover:text-secondary transition-colors" size={24} />
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mess Section */}
            {hostel.mess?.available && (
                <div className="p-8 rounded-[32px] bg-slate-900 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    <Utensils size={120} className="absolute -right-10 -bottom-10 text-white/5" />
                    <div className="shrink-0 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                        <Utensils size={32} className="text-secondary" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="text-xl font-black mb-2">Monthly Mess Service</h4>
                        <p className="text-white/60 text-[14px] mb-4">
                            Enjoy fresh, home-style meals served daily. {hostel.mess.compulsory ? 'Mandatory for all residents.' : 'Opt-in as per your need.'}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[15px] font-bold">
                                Rs. {hostel.mess.price?.toLocaleString()}/mo
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-secondary/20 text-secondary text-[12px] font-black uppercase tracking-widest flex items-center">
                                {hostel.mess.compulsory ? 'Compulsory' : 'Optional'}
                            </div>
                        </div>
                    </div>
                </div>
            )}
          </div>

          {/* ─── RIGHT COLUMN: Sticky Sidebar ─── */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              
              {/* Contact & Booking Card */}
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/40 p-6 space-y-6">
                
                <div className="flex items-center justify-between px-2">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Rent</p>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter">
                            Rs. {hostel.price?.toLocaleString()} <span className="text-[12px] text-slate-400 font-bold tracking-normal">/mo</span>
                        </h3>
                    </div>
                    <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
                        <ShieldCheck size={20} />
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-lg font-black">
                            {hostel.owner?.name?.charAt(0)}
                        </div>
                        <div>
                            <p className="text-[12px] font-black text-slate-900">{hostel.owner?.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Hostel Owner</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        <div className="flex-1 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center gap-1">
                            <Users size={16} className="text-secondary" />
                            <span className="text-[11px] font-bold text-slate-800">{hostel.capacity?.length} Types</span>
                        </div>
                        <div className="flex-1 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center gap-1">
                            <Star size={16} className="text-amber-500" />
                            <span className="text-[11px] font-bold text-slate-800">4.8 Rating</span>
                        </div>
                    </div>
                </div>

                {/* Parallel Buttons */}
                <div className="flex gap-2">
                    <a href={`tel:${hostel.phone}`} className="flex-1 py-3.5 rounded-2xl bg-slate-900 text-white text-[13px] font-black flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-[0.95] shadow-lg shadow-slate-900/10 cursor-pointer">
                        <Phone size={16} /> Call
                    </a>
                    <a href={`https://wa.me/${hostel.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="flex-1 py-3.5 rounded-2xl bg-green-500 text-white text-[13px] font-black flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-[0.95] shadow-lg shadow-green-500/10 cursor-pointer">
                        <FaWhatsapp size={18} /> WhatsApp
                    </a>
                </div>

                <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Listing ID: {hostel._id?.slice(-8).toUpperCase()}</p>
                </div>
              </div>

              {/* Enhanced Stay Safe Tips Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 space-y-6 relative overflow-hidden shadow-xl">
                <div className="absolute -right-8 -bottom-8 text-white/5 rotate-12">
                    <ShieldCheck size={160} />
                </div>
                
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
                        <ShieldCheck size={20} />
                    </div>
                    <h4 className="text-lg font-black text-white">Stay Safe Tips</h4>
                </div>
                
                <div className="space-y-5 relative z-10">
                    {[
                        { title: "Visit Personally", desc: "Never pay advance rent before visiting the hostel." },
                        { title: "Verify Facilities", desc: "Check if all promised amenities are actually available." },
                        { title: "Payment Proof", desc: "Always take a receipt for every payment." }
                    ].map((tip, i) => (
                        <div key={i} className="flex gap-4 group">
                            <div className="text-secondary font-black text-xl opacity-50 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                            <div>
                                <h5 className="text-[13px] font-bold text-white mb-0.5">{tip.title}</h5>
                                <p className="text-[11px] text-white/50 leading-relaxed font-medium">{tip.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-4 mt-2 border-t border-white/5 relative z-10">
                    <p className="text-[10px] text-white/40 font-medium italic">
                        Report this listing if it seems suspicious. <span className="text-secondary font-bold cursor-pointer hover:underline">Report Now</span>
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
