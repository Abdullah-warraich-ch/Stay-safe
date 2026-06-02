import Nav from '@/components/Nav';
import HostelsClientList from '@/components/HostelsClientList';
import connectDB from '@/lib/db';
import Hostel from '@/models/Hostel';

export async function generateMetadata({ searchParams }) {
    const resolvedParams = await searchParams;
    const city = resolvedParams.city || '';
    const area = resolvedParams.area || '';
    const hostelType = resolvedParams.hostelType || '';

    // Build dynamic title parts
    const typePart = hostelType ? `${hostelType.charAt(0).toUpperCase() + hostelType.slice(1)} ` : '';
    const locationPart = area && city
        ? `in ${area}, ${city}`
        : city
            ? `in ${city}`
            : 'in Pakistan';

    const title = `${typePart}Hostels ${locationPart}`;
    const description = `Browse verified ${typePart.toLowerCase()}hostels ${locationPart}. Compare prices, amenities, and room types. Find affordable student accommodation with Stay Safe.`;

    const keywords = [
        'hostel', 'student accommodation', 'affordable hostel',
        city && `${city} hostel`,
        area && `${area} hostel`,
        hostelType && `${hostelType} hostel`,
        city && area && `hostel in ${area} ${city}`,
    ].filter(Boolean);

    return {
        title,
        description,
        keywords,
        openGraph: {
            title: `${title} | Stay Safe`,
            description,
            type: 'website',
        },
    };
}

export default async function HostelsPage({ searchParams }) {
    const resolvedParams = await searchParams;

    await connectDB();
    const query = {};
    if (resolvedParams.gender) query.hostelType = resolvedParams.gender;
    if (resolvedParams.city) query.city = resolvedParams.city;
    if (resolvedParams.area) query.area = resolvedParams.area;
    if (resolvedParams.isVerified) query.isVerified = resolvedParams.isVerified;
    if (resolvedParams.acType) query.acType = resolvedParams.acType;
    if (resolvedParams.wifi) query.wifi = resolvedParams.wifi;
    if (resolvedParams.backupLight) query.backupLight = resolvedParams.backupLight;
    if (resolvedParams.attachedBath) query.attachedBath = resolvedParams.attachedBath;
    if (resolvedParams.seater) {
        query.capacity = { $elemMatch: { seater: resolvedParams.seater } };
    }

    const total = await Hostel.countDocuments(query);
    const hostels = await Hostel.find(query).sort({ createdAt: -1 }).limit(25).lean();
    const plainHostels = JSON.parse(JSON.stringify(hostels));
    const queryKey = JSON.stringify(resolvedParams);

    return (
        <>
            <Nav />
            <main className='px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40 py-6'>
                <HostelsClientList 
                    key={queryKey}
                    initialHostels={plainHostels} 
                    total={total} 
                    searchParams={resolvedParams} 
                />
            </main>
        </>
    );
}