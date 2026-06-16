'use client';

import { useEffect, useState } from 'react';
import Button from './ui/Button';
import { Menu, X, User, LogOut, Heart } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen]);

    return (
        <>
            <nav className="relative py-4 px-6 md:px-10 lg:px-20 border-b border-slate-50 bg-white/80 backdrop-blur-md sticky top-0 z-[100]">
                <div className="flex justify-between items-center">
                    <Link href="/" className="logo shrink-0">
                        <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">Stay Safe<span className="text-primary">.</span></h1>
                    </Link>

                    {/* Desktop & Tablet Links */}
                    <ul className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide text-slate-600">
                        {["Lahore", "Islamabad", "Karachi", "Faisalabad"].map((city) => (
                            <li key={city} className="group relative">
                                <a href="#" className="py-1 transition-colors duration-200 hover:text-primary">{city}</a>
                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-3 md:gap-4">
                        {/* List Your Hostel - Always visible */}
                        <div className="hidden sm:block">
                            <Link href={user ? '/dashboard/create-listing' : '/signup'}>
                                <Button size="sm" variant='secondary' className='relative overflow-hidden whitespace-nowrap'>
                                    List Your Hostel
                                    <span className="absolute top-[-100%] left-[-100%] w-[100%] rotate-[10deg] h-[300%] bg-gradient-to-r from-transparent via-white/60 to-transparent animate-sweep"></span>
                                </Button>
                            </Link>
                        </div>

                        {user ? (
                            /* Logged In — Heart, Profile, Logout */
                            <div className="hidden md:flex items-center gap-2">
                                {/* Loved Hostels */}
                                <Link
                                    href="/dashboard/favorites"
                                    className="p-2.5 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10 transition-all cursor-pointer relative"
                                    title="Loved Hostels"
                                >
                                    <Heart size={19} />
                                </Link>

                                {/* Profile */}
                                <Link href="/dashboard">
                                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer">
                                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
                                    </div>
                                </Link>

                                {/* Logout */}
                                <button
                                    onClick={logout}
                                    className="p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            /* Not Logged In — Show Login & Signup */
                            <div className="hidden md:flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant='ghost' size="sm">Login</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button size="sm" variant='primary'>Sign Up</Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="lg:hidden p-2 text-slate-600 hover:text-primary transition-colors cursor-pointer"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[999] lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-[85vw] max-w-[340px] bg-white z-[1000] shadow-2xl lg:hidden transform transition-transform duration-300 ease-out rounded-l-3xl flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Sidebar Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50 rounded-tl-3xl shrink-0">
                    <h1 className="text-2xl font-bold text-primary tracking-tight">Stay Safe<span className="text-primary">.</span></h1>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-700 shadow-sm transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex flex-col p-6 gap-8 overflow-y-auto custom-scrollbar flex-1">
                    {user ? (
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shrink-0">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-white shadow-md shadow-primary/20 shrink-0">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-slate-900 leading-tight truncate">{user.name}</h3>
                                <p className="text-xs text-slate-500 mt-0.5 truncate">{user.email}</p>
                            </div>
                        </div>
                    ) : null}

                    <div className="space-y-4 shrink-0">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Explore Cities</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {["Lahore", "Islamabad", "Karachi", "Faisalabad"].map((city) => (
                                <Link key={city} href={`/hostels?city=${city}`} onClick={() => setIsMenuOpen(false)} className="flex flex-col justify-center items-center gap-1 py-4 px-2 rounded-2xl border border-slate-100 bg-white hover:border-primary hover:bg-primary/5 hover:shadow-sm hover:shadow-primary/5 transition-all text-center">
                                    <span className="font-bold text-slate-800 text-[14px]">{city}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-slate-100 shrink-0">
                        <Link href={user ? '/dashboard/create-listing' : '/signup'} onClick={() => setIsMenuOpen(false)}>
                            <button className="w-full relative overflow-hidden group py-4 rounded-2xl bg-primary text-white font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-primary/25 cursor-pointer">
                                <span className="absolute top-[-100%] left-[-100%] w-[100%] rotate-[10deg] h-[300%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-sweep"></span>
                                List Your Hostel
                            </button>
                        </Link>

                        {user ? (
                            <div className="space-y-2 mt-2">
                                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors cursor-pointer">
                                        <User size={18} className="text-slate-400" /> Dashboard
                                    </button>
                                </Link>
                                <Link href="/dashboard/favorites" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors cursor-pointer">
                                        <Heart size={18} className="text-rose-400" /> Loved Hostels
                                    </button>
                                </Link>
                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className="w-full flex items-center gap-3 p-4 rounded-2xl text-rose-500 font-semibold hover:bg-rose-50 transition-colors mt-2 cursor-pointer"
                                >
                                    <LogOut size={18} className="text-rose-400" /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">Login</button>
                                </Link>
                                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-colors cursor-pointer">Sign Up</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}