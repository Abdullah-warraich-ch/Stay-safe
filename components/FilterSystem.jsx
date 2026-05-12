'use client';

import { useState, useEffect, useRef } from "react";
import { cities, citiesData } from "../data/citiesData";
import { SlidersHorizontal, BedDouble, Bath, Wind, Wifi, Zap } from "lucide-react";

export default function FilterSystem() {
  const [gender, setGender] = useState("All");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [detailedFilterOpen, setDetailedFilterOpen] = useState(false);
  const [filterRounded, setFilterRounded] = useState(false); // lags on close

  const toggleFilter = () => {
    if (!detailedFilterOpen) {
      // Opening: change border-radius & open panel immediately
      setFilterRounded(true);
      setDetailedFilterOpen(true);
    } else {
      // Closing: collapse panel, then snap border-radius after animation
      setDetailedFilterOpen(false);
      setTimeout(() => setFilterRounded(false), 450);
    }
  };

  // Custom Dropdown States
  const [cityOpen, setCityOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [areaSearch, setAreaSearch] = useState("");

  const [seater, setSeater] = useState("");
  const [attachedBath, setAttachedBath] = useState("");
  const [acType, setAcType] = useState("");
  const [wifi, setWifi] = useState("");
  const [backupLight, setBackupLight] = useState("");

  const cityRef = useRef(null);
  const areaRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cityRef.current && !cityRef.current.contains(event.target))
        setCityOpen(false);
      if (areaRef.current && !areaRef.current.contains(event.target)) {
        setAreaOpen(false);
        setAreaSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (gender) => {
    setGender(gender);
  };

  const availableAreas = selectedCity
    ? citiesData[selectedCity].filter((area) =>
      area.toLowerCase().includes(areaSearch.toLowerCase()),
    )
    : [];

  const activeFilterCount = [seater, attachedBath, acType, wifi, backupLight].filter(Boolean).length;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl px-4 md:px-0">
      {/* Gender Switcher */}
      <div className="flex items-center gap-2 mt-6 bg-white/80 p-1.5 rounded-full shadow-sm border border-slate-100">
        {["Boys", "Girls", "All"].map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
            className={`px-6 md:px-10 py-2.5 md:py-3 text-xs md:text-sm font-semibold tracking-wide text-black rounded-full transition-all duration-300 cursor-pointer ${gender === item ? "bg-black text-white shadow-lg" : "hover:bg-slate-50"}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* search div */}
      <div
        className={`flex flex-col bg-white p-2 shadow-2xl shadow-slate-200/60 border border-slate-100 w-full relative mt-8 md:mt-5 overflow-hidden ${filterRounded ? "rounded-3xl" : "rounded-3xl md:rounded-full"}`}
      >
        <div className="flex flex-col md:flex-row md:items-center">
          {/* 1. City Selection */}
          <div
            className="flex-1 px-6 border-b md:border-b-0 md:border-r border-slate-100 relative"
            ref={cityRef}
          >
            <button
              onClick={() => {
                setCityOpen(!cityOpen);
                setAreaOpen(false);
              }}
              className="w-full flex items-center justify-between py-4 cursor-pointer group"
            >
              <span
                className={`text-[15px] font-semibold ${selectedCity ? "text-slate-800" : "text-slate-400"}`}
              >
                {selectedCity || "Choose City"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`text-slate-400 transition-transform duration-300 ${cityOpen ? "rotate-180 text-secondary" : ""}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {cityOpen && (
              <div className="absolute top-full md:top-[110%] left-0 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="max-h-60 overflow-y-auto custom-scrollbar p-2">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setSelectedArea("");
                        setCityOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${selectedCity === city ? "bg-secondary text-white" : "hover:bg-slate-50 text-slate-700"}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Area Selection */}
          <div
            className="flex-[1.5] px-6 border-b md:border-b-0 md:border-r border-slate-100 relative"
            ref={areaRef}
          >
            <button
              onClick={() => {
                if (selectedCity) {
                  setAreaOpen(!areaOpen);
                  setCityOpen(false);
                }
              }}
              className={`w-full flex items-center justify-between py-4 cursor-pointer group ${!selectedCity && "opacity-40 cursor-not-allowed"}`}
            >
              <span
                className={`text-[15px] font-semibold truncate max-w-45 ${selectedArea ? "text-slate-800" : "text-slate-400"}`}
              >
                {selectedArea || "Select Area"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`text-slate-400 transition-transform duration-300 ${areaOpen ? "rotate-180 text-secondary" : ""}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {areaOpen && (
              <div className="absolute top-full md:top-[110%] left-0 w-full min-w-70 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-3 border-b border-slate-100">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search area..."
                      value={areaSearch}
                      onChange={(e) => setAreaSearch(e.target.value)}
                      className="w-full bg-slate-50 text-sm font-medium px-10 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-secondary/20 border border-transparent focus:border-secondary/20 transition-all"
                      autoFocus
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
                  {availableAreas.length > 0 ? (
                    availableAreas.map((area) => (
                      <button
                        key={area}
                        onClick={() => {
                          setSelectedArea(area);
                          setAreaOpen(false);
                          setAreaSearch("");
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors mb-0.5 ${selectedArea === area ? "bg-secondary text-white" : "hover:bg-slate-50 text-slate-700"}`}
                      >
                        {area}
                      </button>
                    ))
                  ) : (
                    <div className="py-8 text-center text-slate-400 text-sm font-medium">
                      No areas found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 3. Verified Toggle & Filter */}
          <div className="flex items-center justify-between md:justify-start gap-4 px-6 py-4 border-b md:border-b-0 md:border-r border-slate-100">
            <div className="flex items-center gap-4">
              <span
                className={`text-sm font-bold tracking-tight transition-colors duration-300 whitespace-nowrap ${isVerified ? "text-secondary" : "text-slate-500"}`}
              >
                Verified Only
              </span>
              <button
                onClick={() => setIsVerified(!isVerified)}
                className={`relative w-10 h-5.5 rounded-full transition-all duration-500 focus:outline-none cursor-pointer shadow-inner ${isVerified ? "bg-secondary" : "bg-slate-200"}`}
              >
                <div
                  className={`absolute top-1 left-1 w-3.5 h-3.5 bg-white rounded-full transition-transform duration-500 shadow-sm ${isVerified ? "translate-x-4.5" : ""}`}
                ></div>
              </button>
            </div>

            {/* Filter Button (Mobile Only inline) */}
            <div className="md:hidden">
              <button
                onClick={toggleFilter}
                className={`p-3 rounded-full transition-all duration-300 cursor-pointer ${detailedFilterOpen
                  ? "text-secondary bg-secondary/10"
                  : "text-slate-500 hover:text-secondary hover:bg-secondary/5"
                  }`}
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>

          {/* 4. Filter Button (Desktop Only) */}
          <div className="hidden md:block px-4">
            <button
              onClick={toggleFilter}
              className={`p-3 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer group ${detailedFilterOpen
                ? "text-secondary bg-secondary/10"
                : "text-slate-500 hover:text-secondary hover:bg-secondary/5"
                }`}
            >
              <SlidersHorizontal />
            </button>
          </div>

          {/* 5. Search Button */}
          <div className="p-2 md:p-0">
            <button className="w-full md:w-auto bg-secondary hover:brightness-110 text-white p-4.5 rounded-2xl md:rounded-full shadow-lg shadow-secondary/25 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2 md:gap-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="md:hidden font-bold">Search Hostels</span>
            </button>
          </div>
        </div>
        {/* Detailed filter — always mounted, toggled via CSS transition */}
        <div
          style={{
            maxHeight: detailedFilterOpen ? "700px" : "0px",
            opacity: detailedFilterOpen ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
          }}
        >
          <div className="border-t border-slate-100  px-5 pt-5 pb-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <SlidersHorizontal size={13} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 leading-tight">Advanced Filters</h3>
                  <p className="text-[11px] text-slate-400 leading-none mt-0.5">Refine your search results</p>
                </div>
                {activeFilterCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary text-white shadow-sm shadow-secondary/30">
                    {activeFilterCount} active
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => { setSeater(""); setAttachedBath(""); setAcType(""); setWifi(""); setBackupLight(""); }}
                disabled={activeFilterCount === 0}
                className={`text-xs font-semibold transition-all duration-200 ${activeFilterCount > 0
                  ? "text-secondary hover:text-secondary/70 cursor-pointer"
                  : "text-slate-300 cursor-not-allowed"
                  }`}
              >
                Clear all
              </button>
            </div>

            {/* Filter grid */}
            <div className="grid gap-y-5 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">

              {/* Seater */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <BedDouble size={12} />
                  Seater
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
                      type="button"
                      onClick={() => setSeater(val)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${seater === val
                        ? "bg-secondary text-white border-secondary shadow-sm shadow-secondary/25 scale-105"
                        : "bg-white text-slate-600 border-slate-200 hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attached Bath */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <Bath size={12} />
                  Attached Bath
                </label>
                <div className="flex gap-1.5">
                  {[{ label: "Any", val: "" }, { label: "Yes", val: "Yes" }, { label: "No", val: "No" }].map(({ label, val }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setAttachedBath(val)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${attachedBath === val
                        ? "bg-secondary text-white border-secondary shadow-sm shadow-secondary/25 scale-105"
                        : "bg-white text-slate-600 border-slate-200 hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* AC Type */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <Wind size={12} />
                  AC / Non-AC
                </label>
                <div className="flex gap-1.5">
                  {[{ label: "Any", val: "" }, { label: "AC", val: "AC" }, { label: "Non-AC", val: "Non-AC" }].map(({ label, val }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setAcType(val)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${acType === val
                        ? "bg-secondary text-white border-secondary shadow-sm shadow-secondary/25 scale-105"
                        : "bg-white text-slate-600 border-slate-200 hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wifi */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <Wifi size={12} />
                  Wifi
                </label>
                <div className="flex gap-1.5">
                  {[{ label: "Any", val: "" }, { label: "Yes", val: "Yes" }, { label: "No", val: "No" }].map(({ label, val }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setWifi(val)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${wifi === val
                        ? "bg-secondary text-white border-secondary shadow-sm shadow-secondary/25 scale-105"
                        : "bg-white text-slate-600 border-slate-200 hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Backup Power */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <Zap size={12} />
                  Backup Power
                </label>
                <div className="flex gap-1.5">
                  {[{ label: "Any", val: "" }, { label: "Yes", val: "Yes" }, { label: "No", val: "No" }].map(({ label, val }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setBackupLight(val)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${backupLight === val
                        ? "bg-secondary text-white border-secondary shadow-sm shadow-secondary/25 scale-105"
                        : "bg-white text-slate-600 border-slate-200 hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
