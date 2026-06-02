"use client"

import { useState, useEffect, useRef } from "react";
import { fetchHostels } from "@/utils/https";
import { useAuth } from "@/context/AuthContext";
import HostelCard from "./hostelCard";
import CardSkeleton from "./cardSkeleton";
import { ArrowRight, ChevronRight, ChevronLeft, Compass, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function SingleDashboardListing({ currentCity }) {
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollRef = useRef(null);
    const targetScrollRef = useRef(0);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 2);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
        }
    };

    const handleScrollClick = (direction) => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        // Reset targetScrollRef to current scroll position if user manually scrolled
        if (Math.abs(targetScrollRef.current - scrollLeft) > 100) {
            targetScrollRef.current = scrollLeft;
        }

        // Scroll by 85% of container's clientWidth for an elegant 'peek' overlap
        const step = clientWidth * 0.85;
        const maxScroll = scrollWidth - clientWidth;

        if (direction === "left") {
            targetScrollRef.current = Math.max(0, targetScrollRef.current - step);
        } else {
            targetScrollRef.current = Math.min(maxScroll, targetScrollRef.current + step);
        }

        scrollRef.current.scrollTo({
            left: targetScrollRef.current,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        checkScroll();

        el.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        const resizeObserver = new ResizeObserver(() => {
            checkScroll();
        });
        resizeObserver.observe(el);

        return () => {
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
            resizeObserver.disconnect();
        };
    }, [hostels, loading]);

    useEffect(() => {
        const getHostels = async () => {
            if (currentCity === undefined) return;

            setLoading(true);
            try {
                const data = await fetchHostels(currentCity ? `city=${currentCity}&limit=8` : "");
                setHostels(data.data);
                console.log(data.data);
            } catch (error) {
                console.error("Error fetching hostels:", error);
            } finally {
                setLoading(false);
            }
        };

        getHostels();
    }, [currentCity]);

    return (
        <div className="px-4 sm:px-6 md:px-12 py-5 bg-white">
            <div className="flex gap-4 justify-between items-center mb-3">
                <Link href={currentCity ? `/hostels?city=${currentCity}` : "/hostels"}>
                    <h1 className="font-bold text-lg sm:text-xl flex gap-2 sm:gap-4 group cursor-pointer items-center">
                        {currentCity ? `Popular Hostels in ${currentCity}` : "Popular Hostels"}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-all" />
                    </h1>
                </Link>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleScrollClick("left")}
                        disabled={!canScrollLeft}
                        className={`w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200
                            ${canScrollLeft
                                ? "hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-95 cursor-pointer"
                                : "opacity-40 cursor-not-allowed"
                            }`}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => handleScrollClick("right")}
                        disabled={!canScrollRight}
                        className={`w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200
                            ${canScrollRight
                                ? "hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-95 cursor-pointer"
                                : "opacity-40 cursor-not-allowed"
                            }`}
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide py-4 -my-4 snap-x snap-mandatory" ref={scrollRef}>
                {loading ? (
                    [...Array(5)].map((_, i) => (
                        <div key={i} className="w-[240px] sm:w-[calc(33.33vw-36px)] md:w-[calc(25vw-36px)] lg:w-[calc(20vw-36px)] xl:w-[calc(16.66vw-36px)] max-w-[280px] shrink-0 snap-start">
                            <CardSkeleton />
                        </div>
                    ))
                ) : (
                    <>
                        {hostels?.map((hostel) => (
                            <div key={hostel._id} className="w-[240px] sm:w-[calc(33.33vw-36px)] md:w-[calc(25vw-36px)] lg:w-[calc(20vw-36px)] xl:w-[calc(16.66vw-36px)] max-w-[280px] shrink-0 snap-start">
                                <HostelCard hostel={hostel} />
                            </div>
                        ))}
                        {hostels && hostels.length > 0 && (
                            <Link
                                href={currentCity ? `/hostels?city=${currentCity}` : "/hostels"}
                                className="group flex flex-col gap-3 cursor-pointer w-[240px] sm:w-[calc(33.33vw-36px)] md:w-[calc(25vw-36px)] lg:w-[calc(20vw-36px)] xl:w-[calc(16.66vw-36px)] max-w-[280px] shrink-0 snap-start"
                            >
                                <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_0_12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_0_20px_rgba(0,0,0,0.12)] group-hover:border-slate-200 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                                    <div className="absolute top-3 right-3 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                                        <ArrowUpRight size={18} />
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-white shadow-sm group-hover:shadow-md text-slate-600 group-hover:text-slate-900 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                                        <Compass size={24} className="group-hover:rotate-45 transition-transform duration-500" />
                                    </div>
                                    <span className="font-semibold text-sm text-slate-700 group-hover:text-slate-950 transition-colors">
                                        See All Hostels
                                    </span>
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <h3 className="text-[15px] hidden font-semibold leading-5 text-slate-800 group-hover:text-slate-950 transition-colors truncate">
                                        Explore {hostels.length > 10 ? `${hostels.length}+` : hostels.length} Listings
                                    </h3>
                                    <p className="text-[14px] hidden leading-5 text-slate-500 truncate">
                                        Find the best place in {currentCity || "your city"}
                                    </p>
                                </div>
                            </Link>
                        )}
                    </>
                )}
            </div>

        </div>
    );
}