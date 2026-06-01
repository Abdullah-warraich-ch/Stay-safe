import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: {
    template: '%s | Stay Safe',
    default: 'Stay Safe — Find Safe & Verified Hostels in Pakistan',
  },
  description: 'Stay Safe helps students and professionals find verified, affordable hostels across Pakistan. Compare prices, amenities, and locations — all in one place.',
  keywords: ['hostel', 'Pakistan hostel', 'student accommodation', 'boys hostel', 'girls hostel', 'affordable hostel', 'Lahore hostel', 'stay safe', 'hostels in Lahore', 'hostels in Karachi', 'hostels in Islamabad', 'hostels in Multan', 'hostels in Faisalabad', 'hostels in Rawalpindi', 'hostels in Gujranwala', 'hostels in Sialkot', 'hostels in Peshawar', 'hostels in Quetta', 'hostels in Hyderabad', 'hostels in Sukkur', 'hostels in Bahawalpur', 'hostels in Rahim Yar Khan', 'hostels in Sargodha', 'hostels in DG Khan', 'hostels in Sheikhupura', 'hostels in Jhang', 'hostels in Gujrat', 'hostels in Mardan', 'hostels in Sahiwal', 'hostels in Kasur', 'hostels in Okara', 'hostels in Abbottabad', 'hostels in Mirpur Khas', 'hostels in Larkana', 'hostels in Nawabshah', 'hostels in Dadu', 'hostels in Tando Allahyar', 'hostels in Tando Adam', 'hostels in Badin', 'hostels in Thatta', 'hostels in Umerkot', 'hostels in Tharparkar'],
  authors: [{ name: 'Stay Safe' }],
  creator: 'Stay Safe',
  openGraph: {
    type: 'website',
    siteName: 'Stay Safe',
    title: 'Stay Safe — Find Safe & Verified Hostels in Pakistan',
    description: 'Stay Safe helps students and professionals find verified, affordable hostels across Pakistan. Compare prices, amenities, and locations — all in one place.',
    locale: 'en_PK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stay Safe — Find Safe & Verified Hostels in Pakistan',
    description: 'Stay Safe helps students and professionals find verified, affordable hostels across Pakistan.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
