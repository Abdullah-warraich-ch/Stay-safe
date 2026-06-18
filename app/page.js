import Nav from "../components/Nav";
import Hero from "../components/Hero";
import CitySection from "../components/CitySection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import ParentDashboardListing from "@/components/ParentDashboardListing";

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
