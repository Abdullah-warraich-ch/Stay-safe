import connectDB from '@/lib/db';
import Hostel from '@/models/Hostel';
import HostelDetailClient from '@/components/HostelDetailClient';

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    await connectDB();
    const hostel = await Hostel.findById(id).select('name city area hostelType description price amenities tags images').lean();

    if (!hostel) {
      return {
        title: 'Hostel Not Found',
        description: 'The hostel you are looking for does not exist or has been removed.',
      };
    }

    const type = hostel.hostelType
      ? hostel.hostelType.charAt(0).toUpperCase() + hostel.hostelType.slice(1)
      : '';

    const title = `${hostel.name} — ${type} Hostel in ${hostel.area}, ${hostel.city}`;

    const lowestPrice = hostel.price ? `Rs. ${hostel.price.toLocaleString()}/mo` : '';
    const amenitiesList = (hostel.amenities || []).slice(0, 5).join(', ');
    const description = `${hostel.name} is a verified ${type.toLowerCase()} hostel in ${hostel.area}, ${hostel.city}. ${lowestPrice ? `Starting from ${lowestPrice}.` : ''} ${amenitiesList ? `Amenities: ${amenitiesList}.` : ''} Book safely with Stay Safe.`;

    const keywords = [
      hostel.name,
      `${type.toLowerCase()} hostel`,
      `hostel in ${hostel.area}`,
      `hostel in ${hostel.city}`,
      `${hostel.area} ${hostel.city} hostel`,
      'student accommodation',
      'affordable hostel',
      ...(hostel.tags || []).slice(0, 10),
    ];

    // Use first hostel image for Open Graph
    const ogImage = hostel.images?.[0]?.url;

    return {
      title,
      description,
      keywords,
      openGraph: {
        title: `${title} | Stay Safe`,
        description,
        type: 'article',
        ...(ogImage && {
          images: [{ url: ogImage, alt: hostel.name }],
        }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(ogImage && { images: [ogImage] }),
      },
    };
  } catch (error) {
    return {
      title: 'Hostel Details',
      description: 'View hostel details on Stay Safe.',
    };
  }
}

export default function HostelDetailPage() {
  return <HostelDetailClient />;
}
