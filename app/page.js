
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import CitySection from "../components/CitySection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import { GuestRoute } from "@/components/ProtectedRoute";
import ParentDashboardListing from "@/components/ParentDashboardListing";

export default function Home() {
  return (
    <GuestRoute>
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
    </GuestRoute>
  );
}
