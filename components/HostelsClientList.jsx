'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import HostelCard from './hostelCard';
import CardSkeleton from './cardSkeleton';
import { fetchHostels } from '@/utils/https';
import { Loader2, CheckCircle2, RefreshCw } from 'lucide-react';

export default function HostelsClientList({ initialHostels, total, searchParams }) {
    const [hostels, setHostels] = useState(initialHostels);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(initialHostels.length < total);

    const observer = useRef();
    const loaderRef = useRef();


    // Load next page of hostels
    const loadNextPage = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        setError(null);
        const nextPage = page + 1;

        try {
            const queryParams = new URLSearchParams(searchParams);
            queryParams.set('page', nextPage.toString());
            queryParams.set('limit', '25');

            const response = await fetchHostels(queryParams.toString());

            if (response.success) {
                const newHostels = response.data;
                setHostels((prev) => {
                    // Prevent duplicate listings
                    const existingIds = new Set(prev.map(h => h._id));
                    const uniqueNewHostels = newHostels.filter(h => !existingIds.has(h._id));
                    return [...prev, ...uniqueNewHostels];
                });
                setPage(nextPage);
                setHasMore(response.pagination ? response.pagination.hasNextPage : (hostels.length + newHostels.length < total));
            } else {
                throw new Error(response.error || 'Failed to fetch hostels');
            }
        } catch (err) {
            console.error('Error fetching next page of hostels:', err);
            setError('Something went wrong. Please check your connection.');
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore, searchParams, total, hostels.length]);

    // Intersection Observer to trigger loading next page
    useEffect(() => {
        if (!hasMore || loading) return;

        const currentLoader = loaderRef.current;
        if (!currentLoader) return;

        const ob = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadNextPage();
                }
            },
            { threshold: 0.1, rootMargin: '200px' } // Load slightly before reaching bottom for premium UX
        );

        ob.observe(currentLoader);

        return () => {
            if (currentLoader) ob.unobserve(currentLoader);
        };
    }, [hasMore, loading, loadNextPage]);

    if (!hostels || hostels.length === 0) {
        return (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                    <Loader2 size={24} className="animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No Hostels Found</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                    We couldn&apos;t find any hostels matching your exact filters. Try adjusting your preferences!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Grid display */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {hostels.map((hostel) => (
                    <div key={hostel._id} className="fade-in duration-300">
                        <HostelCard hostel={hostel} />
                    </div>
                ))}

                {/* Skeletons to show when fetching more records */}
                {loading && (
                    <>
                        {[...Array(5)].map((_, i) => (
                            <CardSkeleton key={`skeleton-${i}`} />
                        ))}
                    </>
                )}
            </div>

            {/* Error Message with Retry */}
            {error && (
                <div className="col-span-full flex flex-col items-center justify-center py-6 text-center space-y-3">
                    <p className="text-sm font-semibold text-rose-500">{error}</p>
                    <button
                        onClick={loadNextPage}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all text-xs cursor-pointer shadow-sm"
                    >
                        <RefreshCw size={13} /> Retry Loading
                    </button>
                </div>
            )}

            {/* Infinite Scroll Trigger */}
            {hasMore && !error && (
                <div ref={loaderRef} className="col-span-full flex justify-center py-6">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                        <Loader2 className="animate-spin text-primary" size={16} />
                        <span>Loading more properties...</span>
                    </div>
                </div>
            )}

            {/* End of list announcement */}
            {!hasMore && hostels.length > 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-10 text-center border-t border-slate-100/80">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm mb-3">
                        <CheckCircle2 size={18} />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">You&apos;ve caught up!</span>
                    <span className="text-[11px] text-slate-400 font-medium tracking-wide mt-0.5">
                        Showing all {total} verified listing{total !== 1 ? 's' : ''} in Pakistan.
                    </span>
                </div>
            )}
        </div>
    );
}
