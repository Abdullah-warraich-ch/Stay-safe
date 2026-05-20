
import Nav from '@/components/Nav';
import { fetchHostels } from '@/utils/https';
import HostelCard from '@/components/hostelCard';

export default async function HostelsPage({ searchParams }) {
    const resolvedParams = await searchParams;

    const params = new URLSearchParams(resolvedParams);
    const data = await fetchHostels(params.toString());





    return (

        <>
            <Nav />
            <main className='px-40  py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8'>
                {data?.data?.map((hostel) => (
                    <HostelCard key={hostel._id} hostel={hostel} />
                ))}
            </main>

        </>

    );
}