export default function CardSkeleton({ color = "bg-slate-200" }) {
    return (
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 border border-slate-100/80 animate-pulse">
            {/* Top Row */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full ${color}`}></div>
                    <div className="flex flex-col gap-1">
                        <div className={`h-2.5 ${color} rounded w-16`}></div>
                        <div className={`h-2 ${color} rounded w-10`}></div>
                    </div>
                </div>
                <div className={`h-5 ${color} rounded-full w-12`}></div>
            </div>

            {/* Floating Bottom Bar */}
            <div className="absolute bottom-3 left-3 right-3 z-10">
                <div className="flex items-center justify-between gap-3 bg-white rounded-xl px-4 py-2.5">
                    <div className={`h-4 ${color} rounded w-24`}></div>
                    <div className={`h-8 ${color} rounded-full w-16`}></div>
                </div>
            </div>
        </div>
    );
}