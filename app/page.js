import Nav from "@/components/layout/Nav";
import Hero from "@/components/home/Hero";
import CitySection from "@/components/home/CitySection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";
import ParentDashboardListing from "@/components/dashboard/ParentDashboardListing";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />
      <main>
        <Hero />
        <ParentDashboardListing />
        <CitySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
