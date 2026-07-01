'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Plus, Building2, ShieldCheck, LogOut, MapPin, Star,
  TrendingUp, Eye, Pencil, Home, Search, Heart, ChevronRight,
  Bell, Settings, BarChart3, User, Grid3X3, List
} from 'lucide-react';
import Nav from '@/components/layout/Nav';
import MyHostels from '@/components/dashboard/MyHostels';
import Link from 'next/link';

/* ─── Stat Card ─── */
function StatCard({ icon: Icon, label, value, sub, color = 'primary', delay = 0 }) {
  const colors = {
    primary: 'bg-primary/10 text-primary',
    green: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-sky-50 text-sky-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
  };
  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 ss-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
      <p className="text-[13px] font-semibold text-slate-500 mt-0.5">{label}</p>
      {sub && <p className="text-[11px] text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

/* ─── Quick Action ─── */
function QuickAction({ icon: Icon, label, desc, href, onClick, colorClass = 'bg-slate-50 text-slate-500', accent = 'hover:border-slate-300' }) {
  const inner = (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border border-slate-100 ${accent} hover:bg-slate-50/60 transition-all duration-200 group cursor-pointer`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${colorClass} group-hover:scale-105 transition-transform`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-[14px] font-bold text-slate-800 leading-tight">{label}</p>
        <p className="text-[12px] text-slate-400 mt-0.5 leading-tight">{desc}</p>
      </div>
      <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
    </div>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  if (onClick) return <button onClick={onClick} className="w-full text-left">{inner}</button>;
  return inner;
}

/* ─── Main Dashboard ─── */
export default function DashboardContent() {
  const { user, logout } = useAuth();
  const [view, setView] = useState('grid'); // 'grid' | 'list'

  const isOwner = user?.role === 'owner' || user?.role === 'admin';
  const initial = user?.name?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Nav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 pb-24 sm:pb-10">

        {/* ── Profile Banner ── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 mb-7 ss-fade-in shadow-xl shadow-slate-900/20">
          {/* decorative rings */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/5" />
          <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full border border-white/5" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex items-center gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-rose-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg shadow-primary/40">
                {initial}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 shadow" />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight truncate">{user?.name}</h1>
                {isOwner && (
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/30 border border-primary/40 text-primary text-[11px] font-bold uppercase tracking-wider">
                    {user?.role}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm truncate">{user?.email}</p>
              {user?.city && (
                <p className="flex items-center gap-1 text-slate-500 text-[12px] mt-1">
                  <MapPin size={11} /> {user.city}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              {isOwner && (
                <Link
                  href="/dashboard/create-listing"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-[13px] font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/30 cursor-pointer"
                >
                  <Plus size={15} /> New Listing
                </Link>
              )}
              <button
                onClick={logout}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Content split by role ── */}
        {isOwner ? (
          /* ═══════════════════════════════
             OWNER VIEW
             ═══════════════════════════════ */
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
              <StatCard icon={Building2} label="My Listings" value="—" sub="Manage below" color="primary" delay={0} />
              <StatCard icon={Eye} label="Profile Views" value="—" sub="Coming soon" color="blue" delay={80} />
              <StatCard icon={TrendingUp} label="Leads" value="—" sub="Coming soon" color="green" delay={160} />
              <StatCard icon={Star} label="Avg. Rating" value="4.9" sub="42 reviews" color="amber" delay={240} />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 mb-7 shadow-sm ss-slide-up" style={{ animationDelay: '100ms' }}>
              <h2 className="text-[15px] font-bold text-slate-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <QuickAction
                  icon={Plus}
                  label="Create New Listing"
                  desc="Add a hostel to the platform"
                  href="/dashboard/create-listing"
                  colorClass="bg-primary/10 text-primary"
                  accent="hover:border-primary/30"
                />
                <QuickAction
                  icon={Home}
                  label="Browse All Hostels"
                  desc="Explore listings on the platform"
                  href="/hostels"
                  colorClass="bg-sky-50 text-sky-600"
                  accent="hover:border-sky-200"
                />
                <QuickAction
                  icon={Heart}
                  label="Saved Hostels"
                  desc="View your bookmarked listings"
                  href="/dashboard/favorites"
                  colorClass="bg-rose-50 text-rose-500"
                  accent="hover:border-rose-200"
                />
                <QuickAction
                  icon={LogOut}
                  label="Sign Out"
                  desc="Log out of your account"
                  onClick={logout}
                  colorClass="bg-slate-100 text-slate-500"
                  accent="hover:border-slate-300"
                />
              </div>
            </div>

            {/* My Listings */}
            <div className="ss-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[17px] font-bold text-slate-900">My Listings</h2>
                <div className="flex items-center gap-2">
                  {/* View toggle */}
                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                    <button
                      onClick={() => setView('grid')}
                      className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                      <Grid3X3 size={14} />
                    </button>
                    <button
                      onClick={() => setView('list')}
                      className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                      <List size={14} />
                    </button>
                  </div>
                  <Link
                    href="/dashboard/create-listing"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-[13px] font-bold hover:brightness-110 transition-all shadow-sm shadow-primary/20 cursor-pointer"
                  >
                    <Plus size={14} /> Add New
                  </Link>
                </div>
              </div>
              <MyHostels ownerId={user?._id ?? user?.id} viewMode={view} />
            </div>
          </>
        ) : (
          /* ═══════════════════════════════
             REGULAR USER / STUDENT VIEW
             ═══════════════════════════════ */
          <>
            {/* Welcome card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 mb-6 shadow-sm ss-slide-up text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Search size={26} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Find Your Perfect Hostel</h2>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                Browse verified hostels near your university. Filter by city, price, amenities and more.
              </p>
              <Link
                href="/hostels"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-[14px] hover:brightness-110 transition-all shadow-lg shadow-primary/25 cursor-pointer"
              >
                <Search size={16} /> Explore Hostels
              </Link>
            </div>

            {/* User actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <QuickAction
                icon={Heart}
                label="Saved Hostels"
                desc="Your bookmarked listings"
                href="/dashboard/favorites"
                colorClass="bg-rose-50 text-rose-500"
                accent="hover:border-rose-200"
              />
              <QuickAction
                icon={Home}
                label="All Hostels"
                desc="Browse the full catalogue"
                href="/hostels"
                colorClass="bg-sky-50 text-sky-600"
                accent="hover:border-sky-200"
              />
              <QuickAction
                icon={Building2}
                label="List Your Hostel"
                desc="Become an owner & post a listing"
                href="/signup"
                colorClass="bg-primary/10 text-primary"
                accent="hover:border-primary/30"
              />
              <QuickAction
                icon={LogOut}
                label="Sign Out"
                desc="Log out of your account"
                onClick={logout}
                colorClass="bg-slate-100 text-slate-500"
                accent="hover:border-slate-300"
              />
            </div>

            {/* Account info */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm ss-slide-up" style={{ animationDelay: '100ms' }}>
              <h2 className="text-[15px] font-bold text-slate-800 mb-4">Account Details</h2>
              <div className="space-y-3">
                {[
                  { label: 'Full Name', value: user?.name },
                  { label: 'Email Address', value: user?.email },
                  { label: 'City', value: user?.city || '—' },
                  { label: 'Account Role', value: user?.role || 'user' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                    <span className="text-[13px] text-slate-500 font-medium">{label}</span>
                    <span className="text-[13px] font-semibold text-slate-800 capitalize max-w-[60%] truncate text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile FAB — owners only */}
      {isOwner && (
        <Link
          href="/dashboard/create-listing"
          className="sm:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/40 z-50 hover:brightness-110 transition-all cursor-pointer"
        >
          <Plus size={24} />
        </Link>
      )}
    </div>
  );
}
