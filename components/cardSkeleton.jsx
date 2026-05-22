export default function CardSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {/* Image Container Skeleton */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-200 animate-pulse"></div>

            {/* Info Container Skeleton */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded w-8 animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                    <div className="h-4 bg-slate-200 rounded-full w-12 animate-pulse"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse"></div>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                    <div className="h-5 bg-slate-200 rounded w-1/3 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}