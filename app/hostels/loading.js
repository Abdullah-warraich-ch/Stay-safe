import Nav from '@/components/Nav';
import CardSkeleton from '@/components/cardSkeleton';

export default function Loading() {
    return (
        <>
            <Nav />
            <main className='px-40 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8'>
                {[...Array(12)].map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </main>
        </>
    );
}
