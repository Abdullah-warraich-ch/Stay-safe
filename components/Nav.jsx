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
                        <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">Stay Safe<span className="text-secondary">.</span></h1>
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
                                    className="p-2.5 rounded-full text-slate-400 hover:text-secondary hover:bg-secondary/10 transition-all cursor-pointer relative"
                                    title="Loved Hostels"
                                >
                                    <Heart size={19} />
                                </Link>

                                {/* Profile */}
                                <Link href="/dashboard">
                                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer">
                                        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white">
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
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[1000] shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex justify-between items-center p-6 border-b border-slate-50">
                        <h1 className="text-xl font-bold text-primary tracking-tight">Stay Safe<span className="text-secondary">.</span></h1>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex flex-col p-6 gap-8 overflow-y-auto">
                        <ul className="flex flex-col gap-4">
                            <li className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Explore Cities</li>
                            {["Lahore", "Islamabad", "Karachi", "Faisalabad"].map((city) => (
                                <li key={city}>
                                    <a href="#" className="text-lg font-semibold text-slate-800 hover:text-primary transition-colors block py-1">{city}</a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col gap-3 mt-auto">
                            <Link href={user ? '/dashboard/create-listing' : '/signup'} onClick={() => setIsMenuOpen(false)}>
                                <Button variant='secondary' className="w-full justify-center py-4 text-base">List Your Hostel</Button>
                            </Link>

                            {user ? (
                                <div className="flex flex-col gap-2">
                                    <Link href="/dashboard/favorites" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant='ghost' className="w-full justify-center py-3 text-slate-600">
                                            <Heart size={18} className="mr-2" /> Loved Hostels
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant='primary' className="w-full justify-center py-4 text-base">Dashboard</Button>
                                    </Link>
                                    <button
                                        onClick={() => { logout(); setIsMenuOpen(false); }}
                                        className="w-full flex items-center justify-center gap-2 py-3 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                    >
                                        <LogOut size={18} /> Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant='primary' className="w-full justify-center py-4 text-base">Sign Up</Button>
                                    </Link>
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant='ghost' className="w-full justify-center py-3 text-slate-600">Login</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}