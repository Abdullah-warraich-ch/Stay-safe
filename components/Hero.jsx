import FilterSystem from "./FilterSystem";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-h-[80vh] md:min-h-screen px-6 md:px-12 lg:px-32 py-12 md:py-25 flex flex-col justify-center gap-8 md:gap-6 items-center">
      {/* Stats: Hidden on mobile, visible on Tablet+ */}
      <div className="hidden md:flex justify-center items-center font-medium text-slate-500 text-sm tracking-wide">
        <div className="px-6 lg:px-10 border-r-2 border-slate-200">
          500+ Listings
        </div>
        <div className="px-6 lg:px-10 border-r-2 border-slate-200">
          5+ Cities
        </div>
        <div className="px-6 lg:px-10">2K+ Students</div>
      </div>

      {/* Headline: Hidden on mobile, visible on Tablet+ */}
      <h1 className="hidden md:block text-3xl lg:text-5xl font-semibold tracking-tight leading-tight lg:leading-[60px] text-black max-w-2xl lg:max-w-4xl text-center">
        Find Your Perfect Hostel,{" "}
        <span className="text-secondary">Effortlessly</span>
      </h1>

      {/* Description: Hidden on mobile, visible on Tablet+ */}
      <p className="hidden md:block text-slate-500 text-sm lg:text-base tracking-wide max-w-xl lg:max-w-2xl text-center leading-relaxed">
        From budget-friendly single rooms to shared spaces with all{" "}
        <span className="text-black font-medium">amenities</span>, we help you
        find the perfect{" "}
        <span className="text-black font-medium">home away from home.</span>
      </p>

      {/* FilterSystem: Always visible, responsive width */}
      <div className="w-full flex justify-center items-center md:px-10 lg:px-20">
        <FilterSystem />
      </div>

      {/* Owner Link: Hidden on mobile, visible on Tablet+ */}
      <div className="hidden md:flex items-center gap-1 group text-sm text-slate-500">
        Are you an owner?
        <span className="text-secondary font-medium cursor-pointer flex items-center justify-center ml-1">
          {" "}
          List Your Hostel Free
        </span>
        <ArrowRight
          size={17}
          className="group-hover:translate-x-1 transition-transform duration-200 text-secondary"
        />
      </div>
    </div>
  );
}
