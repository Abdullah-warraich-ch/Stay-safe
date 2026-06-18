"use client";

import React, { useState, useEffect } from 'react';
import { Home, Building2, Bed, ShieldCheck } from 'lucide-react';

const ICONS = [Building2, Home, Bed, ShieldCheck];

export default function PropertyTypeLoader({ 
    iconSize = 20, 
    className = "", 
    cycleInterval = 1200,
    variant = "default"
}) {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            const timeout = setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % ICONS.length);
                setFade(true);
            }, 250); // Wait for fade out
            return () => clearTimeout(timeout);
        }, cycleInterval);

        return () => clearInterval(interval);
    }, [cycleInterval]);

    const IconComponent = ICONS[index];

    if (variant === 'mini') {
        return (
            <div className={`relative flex items-center justify-center w-8 h-8 shrink-0 ${className}`}>
                <div className="absolute inset-0 rounded-full border-2 border-slate-100 border-t-primary animate-spin" />
                <div 
                    className={`transition-all duration-300 ease-out transform ${
                        fade ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    } text-primary`}
                >
                    <IconComponent size={iconSize} />
                </div>
            </div>
        );
    }

    return (
        <div className={`relative flex items-center justify-center w-16 h-16 shrink-0 ${className}`}>
            {/* Outer pulsing background halo */}
            <div className="absolute inset-1 rounded-full bg-primary/15 animate-ping opacity-75" style={{ animationDuration: '2s' }} />

            {/* Main Circle Container */}
            <div className="relative w-12 h-12 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center">
                {/* Spinning Track */}
                <div className="absolute inset-0.5 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin" style={{ animationDuration: '1.2s' }} />
                
                {/* Cycling Icon */}
                <div 
                    className={`transition-all duration-300 ease-out transform ${
                        fade ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    } text-primary z-10`}
                >
                    <IconComponent size={iconSize} />
                </div>
            </div>
        </div>
    );
}
