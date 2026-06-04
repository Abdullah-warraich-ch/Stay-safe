'use client';

import { MapPin, Building2, X, Navigation } from 'lucide-react';
import SearchableSelect from '@/components/SearchableSelect';

export default function StepLocation({ formData, handleChange, allCities, availableAreas, availableUniversities, selectedUniversities, toggleUniversity }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* ─── Location ─── */}
      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
          <Navigation size={18} className="text-slate-500 mt-0.5 shrink-0" />
          <p className="text-[13px] leading-5 text-slate-600">
            Add the area and exact address so students can judge distance before contacting you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[15px] font-semibold text-slate-950 mb-3">
              City
            </label>
            <SearchableSelect
              name="city"
              value={formData.city}
              onChange={handleChange}
              options={allCities}
              placeholder="Select City"
              icon={Building2}
              required
            />
          </div>
          <div>
            <label className="block text-[15px] font-semibold text-slate-950 mb-3">
              Area
            </label>
            <SearchableSelect
              name="area"
              value={formData.area}
              onChange={handleChange}
              options={availableAreas}
              placeholder="Select Area"
              icon={MapPin}
              required
              disabled={!formData.city}
            />
          </div>
        </div>

        {/* Full Address */}
        <div>
          <label className="block text-[15px] font-semibold text-slate-950 mb-3">
            Full Address
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
              <MapPin size={16} className="text-slate-500" />
            </div>
            <input
              name="address"
              value={formData.address}
              placeholder="House #, Street, Block..."
              className="w-full rounded-xl border border-slate-300 bg-white py-4 pl-16 pr-4 text-[17px] font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-950 transition-colors"
              onChange={handleChange}
            />
          </div>
          <p className="text-[13px] text-slate-500 mt-3">Exact address helps students find the hostel easily.</p>
        </div>
      </div>

      {/* ─── Nearby Universities ─── */}
      <div className="space-y-5 pt-7 border-t border-slate-200">
        <div>
          <h4 className="text-[17px] font-semibold text-slate-950">Nearby Universities</h4>
          <p className="text-[13px] text-slate-500 mt-1">Select universities close to your hostel.</p>
        </div>

        {formData.city ? (
          <div className="space-y-4">
            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 min-h-[50px] p-3 bg-white rounded-xl border border-slate-300">
              {selectedUniversities.length > 0 ? (
                selectedUniversities.map(uni => (
                  <span key={uni} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 text-white rounded-lg text-[12px] font-semibold animate-in zoom-in duration-200">
                    {uni}
                    <button type="button" onClick={() => toggleUniversity(uni)} className="hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer">
                      <X size={12} />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-slate-400 text-[13px] px-2 py-1.5 font-medium">Tap universities below to add them...</span>
              )}
            </div>

            {/* University List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
              {availableUniversities.map(uni => {
                const isSelected = selectedUniversities.includes(uni);
                return (
                  <button
                    key={uni}
                    type="button"
                    onClick={() => toggleUniversity(uni)}
                    className={`relative flex items-center text-left px-4 py-3 rounded-xl border text-[13px] transition-all duration-200 cursor-pointer ${isSelected
                      ? 'bg-slate-50 border-slate-950 text-slate-950 font-semibold'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-slate-950'
                    }`}
                  >
                    {uni}
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-slate-950 rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-10 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-center bg-white">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-3">
              <MapPin size={22} className="text-slate-300" />
            </div>
            <p className="text-[13px] font-medium text-slate-400">Select a city first to see nearby universities</p>
          </div>
        )}
      </div>
    </div>
  );
}
