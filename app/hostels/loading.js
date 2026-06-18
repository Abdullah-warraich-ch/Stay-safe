import Nav from '@/components/layout/Nav';
import CardSkeleton from '@/components/hostels/CardSkeleton';

export default function Loading() {
    return (
        <>
            <Nav />
            <main className='px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8'>
                {[...Array(12)].map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </main>
        </>
    );
}
