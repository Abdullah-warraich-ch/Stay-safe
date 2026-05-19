
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import {
    SlidersHorizontal, MapPin, Building2, Users, BedDouble,
    Bath, Wind, Wifi, Zap, ShieldCheck
} from 'lucide-react';
import HostelCard from '@/components/hostelCard';

export default async function HostelsPage({ searchParams }) {
    const resolvedParams = await searchParams;

    const params = new URLSearchParams(resolvedParams);
    console.log(params.toString(), "params");

    const res = await fetch(`http://localhost:3000/api/hostels?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    console.log(data);



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