import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import {
    SlidersHorizontal, MapPin, Building2, Users, BedDouble,
    Bath, Wind, Wifi, Zap, ShieldCheck
} from 'lucide-react';

export default async function HostelsPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const res = await fetch(`http://localhost:3000/api/hostels?gender=${resolvedParams.gender}&city=${resolvedParams.city}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();

    console.log(data);



    return (
        <></>
        // <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
        //     <div>
        //         <Nav />

        //         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        //             {/* Header */}
        //             <div className="mb-8">
        //                 <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Explore Hostels</h1>
        //                 <p className="text-sm text-slate-500 mt-1">Find and compare properties in your preferred area.</p>
        //             </div>

        //             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        //                 {/* Sidebar Filters */}
        //                 <div className="lg:col-span-1">
        //                     <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
        //                         <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        //                             <SlidersHorizontal size={16} className="text-slate-900" />
        //                             <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Active Filters</h2>
        //                         </div>

        //                         {filters.length === 0 ? (
        //                             <p className="text-xs text-slate-400 font-medium">No filters selected. Displaying all listings.</p>
        //                         ) : (
        //                             <div className="space-y-4">
        //                                 {filters.map((filter) => {
        //                                     const Icon = filter.icon;
        //                                     return (
        //                                         <div key={filter.key} className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
        //                                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        //                                                 <Icon size={12} className="text-slate-400" />
        //                                                 {filter.label}
        //                                             </span>
        //                                             <span className="text-xs font-semibold text-slate-700 capitalize">
        //                                                 {filter.value}
        //                                             </span>
        //                                         </div>
        //                                     );
        //                                 })}
        //                             </div>
        //                         )}
        //                     </div>
        //                 </div>

        //                 {/* Listings Section Placeholder */}
        //                 <div className="lg:col-span-3">
        //                     <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center space-y-4">
        //                         <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
        //                             <Building2 size={24} />
        //                         </div>
        //                         <div className="max-w-sm mx-auto space-y-1">
        //                             <h3 className="text-base font-bold text-slate-900">Hostel Listings</h3>
        //                             <p className="text-xs text-slate-400 leading-relaxed">
        //                                 This section will render the hostels matching the criteria selected in the search.
        //                             </p>
        //                         </div>
        //                         {filters.length > 0 && (
        //                             <div className="pt-2">
        //                                 <p className="text-[11px] font-medium text-slate-400">
        //                                     Query Parameters Awaited:
        //                                 </p>
        //                                 <pre className="mt-2 p-3 bg-slate-50 border border-slate-100 rounded-xl text-left text-[10px] font-mono text-slate-600 overflow-x-auto">
        //                                     {JSON.stringify(resolvedParams, null, 2)}
        //                                 </pre>
        //                             </div>
        //                         )}
        //                     </div>
        //                 </div>
        //             </div>
        //         </main>
        //     </div>

        //     <Footer />
        // </div>
    );
}