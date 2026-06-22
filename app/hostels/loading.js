import Nav from '@/components/layout/Nav';
import CardSkeleton from '@/components/hostels/CardSkeleton';

export default function Loading() {
    return (
        <>
            <Nav />
            {/* <main className='px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8'>

            </main> */}

            <main className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Sidebar Filter Skeleton */}
                    <div className="hidden lg:flex flex-col w-72 shrink-0">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col sticky top-24 max-h-[calc(100vh-8rem)] p-5 space-y-6">
                            {/* Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
                                <div className="h-5 bg-slate-200 rounded w-1/3 animate-pulse"></div>
                                <div className="h-4 bg-slate-200 rounded w-16 animate-pulse"></div>
                            </div>
                            {/* Filters skeleton items */}
                            <div className="space-y-4 flex-1">
                                <div className="space-y-2">
                                    <div className="h-3 bg-slate-100 rounded w-1/4 animate-pulse"></div>
                                    <div className="h-8 bg-slate-100 rounded-xl animate-pulse"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 bg-slate-100 rounded w-1/3 animate-pulse"></div>
                                    <div className="h-10 bg-slate-100 rounded-xl animate-pulse"></div>
                                    <div className="h-10 bg-slate-100 rounded-xl animate-pulse"></div>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse"></div>
                                    <div className="h-6 bg-slate-100 rounded-full w-10 animate-pulse"></div>
                                </div>
                                <div className="space-y-2 pt-2 border-t border-slate-100">
                                    <div className="h-3 bg-slate-100 rounded w-1/4 animate-pulse"></div>
                                    <div className="flex gap-2">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="h-8 bg-slate-100 rounded-lg flex-1 animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Button */}
                            <div className="pt-4 border-t border-slate-100 shrink-0">
                                <div className="h-11 bg-slate-200 rounded-xl animate-pulse w-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-slate-50">
                        <div className="mb-6">
                            <h1 className="rounded-lg text-2xl font-bold text-transparent bg-slate-100">
                                Total Property Fonud 11
                            </h1>
                            <p className="text-sm rounded-lg text-transparent mt-1 bg-slate-100">
                                Showing verified hostels matching your preferences.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
                            {[...Array(24)].map((_, i) => (
                                <CardSkeleton key = { i } />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
