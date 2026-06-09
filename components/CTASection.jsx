import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="px-6 py-10 md:py-12 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-12 md:py-16 text-center border border-white/5 shadow-2xl">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[140%] bg-purple-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[140%] bg-red-600/10 blur-[120px] rounded-full"></div>
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
            Stop Paying Hidden Hostel Commissions.
          </h2>

          <p className="text-[15px] md:text-[17px] text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Find your ideal student accommodation with verified listings and zero brokerage.
            Direct contact with owners, guaranteed.
          </p>

          <div className="pt-4">
            <button className="group relative inline-flex items-center gap-3 bg-[#ff0033] hover:bg-[#ff1a47] text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-300 shadow-[0_0_20px_rgba(255,0,51,0.3)] hover:shadow-[0_0_35px_rgba(255,0,51,0.5)] active:scale-95">
              Find Your Stay
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
