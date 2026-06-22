export default function CardSkeleton({ color = "bg-slate-200" }) {
    return (
        <div className="flex flex-col gap-3">
            {/* Image Container Skeleton */}
            <div className={`relative aspect-square overflow-hidden rounded-xl ${color} animate-pulse`}></div>

            {/* Info Container Skeleton */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <div className={`h-4 ${color} rounded w-2/3 animate-pulse`}></div>
                    <div className={`h-4 ${color} rounded w-8 animate-pulse`}></div>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                    <div className={`h-4 ${color} rounded-full w-12 animate-pulse`}></div>
                    <div className={`h-3 ${color} rounded w-1/2 animate-pulse`}></div>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                    <div className={`${color} h-5  rounded w-1/3 animate-pulse`}></div>
                </div>
            </div>
        </div>
    );
}