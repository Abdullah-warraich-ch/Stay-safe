'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { cities, citiesData } from "../data/citiesData";
import SearchableSelect from "./SearchableSelect";
import { SlidersHorizontal, BedDouble, Bath, Wind, Wifi, Zap, Building2, MapPin, CheckCircle2, X } from "lucide-react";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [gender, setGender] = useState(searchParams.get('gender') || "all");
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || "");
  const [selectedArea, setSelectedArea] = useState(searchParams.get('area') || "");
  const [isVerified, setIsVerified] = useState(searchParams.get('isVerified') === 'true');

  const [seater, setSeater] = useState(searchParams.get('seater')?.replace('-Seater', '') || "");
  const [attachedBath, setAttachedBath] = useState(searchParams.get('attachedBath') || "");
  const [acType, setAcType] = useState(searchParams.get('acType') || "");
  const [wifi, setWifi] = useState(searchParams.get('wifi') || "");
  const [backupLight, setBackupLight] = useState(searchParams.get('backupLight') || "");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGender(searchParams.get('gender') || "all");

    setSelectedCity(searchParams.get('city') || "");

    setSelectedArea(searchParams.get('area') || "");

    setIsVerified(searchParams.get('isVerified') === 'true');

    setSeater(searchParams.get('seater')?.replace('-Seater', '') || "");

    setAttachedBath(searchParams.get('attachedBath') || "");

    setAcType(searchParams.get('acType') || "");

    setWifi(searchParams.get('wifi') || "");

    setBackupLight(searchParams.get('backupLight') || "");
  }, [searchParams]);

  const activeFilterCount = [
    gender !== "all",
    selectedCity,
    selectedArea,
    isVerified,
    seater,
    attachedBath,
    acType,
    wifi,
    backupLight
  ].filter(Boolean).length;

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedArea("");
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (gender && gender !== "all") params.set("gender", gender);
    if (selectedCity) params.set("city", selectedCity);
    if (selectedArea) params.set("area", selectedArea);
    if (isVerified) params.set("isVerified", "true");
    if (seater) params.set("seater", seater + "-Seater");
    if (attachedBath) params.set("attachedBath", attachedBath);
    if (acType) params.set("acType", acType);
    if (wifi) params.set("wifi", wifi);
    if (backupLight) params.set("backupLight", backupLight);

    router.push(`/hostels?${params.toString()}`);
    setIsOpen(false);
  };

  const clearAll = () => {
    setGender("all");
    setSelectedCity("");
    setSelectedArea("");
    setIsVerified(false);
    setSeater("");
    setAttachedBath("");
    setAcType("");
    setWifi("");
    setBackupLight("");
    router.push(`/hostels`);
    setIsOpen(false);
  };

  const filterControls = (
    <div className="p-5 space-y-6 overflow-y-auto custom-scrollbar flex-1">
      {/* Gender */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hostel Type</label>
        <div className="flex p-1 bg-slate-50 border border-slate-100 rounded-xl">
          {["boys", "girls", "all"].map((type) => (
            <button
              key={type}
              onClick={() => setGender(type)}
              className={`flex-1 py-1.5 text-xs font-semibold capitalize rounded-lg transition-all ${gender === type ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
        <SearchableSelect
          name="city"
          value={selectedCity}
          onChange={handleCityChange}
          options={cities}
          placeholder="City"
          icon={Building2}
        />
        <SearchableSelect
          name="area"
          value={selectedArea}
          onChange={handleAreaChange}
          options={selectedCity ? citiesData[selectedCity] : []}
          placeholder="Area"
          icon={MapPin}
          disabled={!selectedCity}
        />
      </div>

      {/* Verified */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className={isVerified ? 'text-primary' : 'text-slate-400'} />
          <span className="text-sm font-semibold text-slate-800">Verified Only</span>
        </div>
        <button
          onClick={() => setIsVerified(!isVerified)}
          className={`relative w-10 h-5.5 rounded-full transition-all duration-300 ${isVerified ? 'bg-primary' : 'bg-slate-200'}`}
        >
          <div className={`absolute top-1 left-1 w-3.5 h-3.5 bg-white rounded-full transition-transform duration-300 ${isVerified ? 'translate-x-4.5' : ''}`} />
        </button>
      </div>

      {/* Detailed Filters */}

      {/* Seater */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <BedDouble size={14} /> Seater
        </label>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: "Any", val: "" },
            { label: "1", val: "1" },
            { label: "2", val: "2" },
            { label: "3", val: "3" },
            { label: "4", val: "4" },
            { label: "5+", val: "5" },
          ].map(({ label, val }) => (
            <button
              key={label}
              onClick={() => setSeater(val)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${seater === val ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Attached Bath */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Bath size={14} /> Attached Bath
        </label>
        <div className="flex gap-1.5">
          {[
            { label: "Any", val: "" },
            { label: "Yes", val: "Yes" },
            { label: "No", val: "No" },
          ].map(({ label, val }) => (
            <button
              key={label}
              onClick={() => setAttachedBath(val)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${attachedBath === val ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* AC / Non-AC */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Wind size={14} /> AC Type
        </label>
        <div className="flex gap-1.5">
          {[
            { label: "Any", val: "" },
            { label: "AC", val: "AC" },
            { label: "Non-AC", val: "Non-AC" },
          ].map(({ label, val }) => (
            <button
              key={label}
              onClick={() => setAcType(val)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${acType === val ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* WiFi */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Wifi size={14} /> WiFi
        </label>
        <div className="flex gap-1.5">
          {[
            { label: "Any", val: "" },
            { label: "Yes", val: "Yes" },
            { label: "No", val: "No" },
          ].map(({ label, val }) => (
            <button
              key={label}
              onClick={() => setWifi(val)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${wifi === val ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Backup Power */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Zap size={14} /> Backup Power
        </label>
        <div className="flex gap-1.5">
          {[
            { label: "Any", val: "" },
            { label: "Yes", val: "Yes" },
            { label: "No", val: "No" },
          ].map(({ label, val }) => (
            <button
              key={label}
              onClick={() => setBackupLight(val)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${backupLight === val ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-72 shrink-0">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col sticky top-24 max-h-[calc(100vh-8rem)]">
          <div className="flex items-center justify-between p-5 pb-4 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-slate-800" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <button
              onClick={clearAll}
              disabled={activeFilterCount === 0}
              className={`text-xs font-semibold ${activeFilterCount > 0 ? 'text-primary hover:underline' : 'text-slate-300'}`}
            >
              Clear All
            </button>
          </div>

          {filterControls}

          <div className="p-4 border-t border-slate-100 shrink-0 bg-slate-50/50 rounded-b-2xl">
            <button
              onClick={applyFilters}
              className="w-full py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-slate-900 text-white px-6 py-3.5 rounded-full shadow-2xl shadow-slate-900/30 font-bold text-[15px] flex items-center gap-2.5 active:scale-95 transition-transform"
        >
          <SlidersHorizontal size={18} /> Filters
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center text-[11px]">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Drawer */}
          <div className="relative w-[85vw] max-w-[340px] bg-white h-full overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-4 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-slate-800" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Filters</h2>
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={clearAll}
                  disabled={activeFilterCount === 0}
                  className={`text-xs font-semibold ${activeFilterCount > 0 ? 'text-primary' : 'text-slate-300'}`}
                >
                  Clear
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Filters */}
            {filterControls}

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 shrink-0 bg-slate-50/50">
              <button
                onClick={applyFilters}
                className="w-full py-3.5 bg-primary text-white text-[15px] font-bold rounded-xl shadow-md shadow-primary/20 active:scale-[0.98] transition-transform"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
