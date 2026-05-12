import Nav from "../components/Nav";
import Hero from "../components/Hero";
import CitySection from "../components/CitySection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-poppins min-h-screen bg-slate-50">
      <Nav />
      <main>
        <Hero />
        <CitySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
