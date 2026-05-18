'use client';

import { MapPin, Building2, School, X, Navigation } from 'lucide-react';
import SearchableSelect from '@/components/SearchableSelect';

export default function StepLocation({ formData, handleChange, allCities, availableAreas, availableUniversities, selectedUniversities, toggleUniversity }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* ─── Location ─── */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 pb-2">
          <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Navigation size={18} className="text-secondary" />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-slate-900">Hostel Location</h4>
            <p className="text-[11px] text-slate-400">Help students find you on the map</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              City <span className="text-red-400">*</span>
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
            <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Area <span className="text-red-400">*</span>
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
          <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Full Address <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
              <MapPin size={14} className="text-slate-400" />
            </div>
            <input
              name="address"
              value={formData.address}
              placeholder="House #, Street, Block..."
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3.5 pl-14 pr-5 outline-none text-slate-900 text-[15px] font-medium placeholder:text-slate-300 focus:bg-white focus:border-secondary/40 focus:shadow-lg focus:shadow-secondary/5 transition-all duration-300"
              onChange={handleChange}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 pl-1">Exact address helps students find the hostel easily.</p>
        </div>
      </div>

      {/* ─── Nearby Universities ─── */}
      <div className="space-y-5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 pb-2">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
            <School size={18} className="text-violet-500" />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-slate-900">Nearby Universities</h4>
            <p className="text-[11px] text-slate-400">Select universities close to your hostel</p>
          </div>
        </div>

        {formData.city ? (
          <div className="space-y-4">
            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 min-h-[50px] p-3 bg-slate-50 rounded-2xl border-2 border-slate-100">
              {selectedUniversities.length > 0 ? (
                selectedUniversities.map(uni => (
                  <span key={uni} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-white rounded-xl text-[12px] font-semibold animate-in zoom-in duration-200 shadow-sm shadow-secondary/15">
                    {uni}
                    <button type="button" onClick={() => toggleUniversity(uni)} className="hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer">
                      <X size={12} />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-slate-300 text-[13px] px-2 py-1.5 font-medium">Tap universities below to add them...</span>
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
                    className={`relative flex items-center text-left px-4 py-3 rounded-2xl border-2 text-[12px] transition-all duration-200 cursor-pointer ${isSelected
                      ? 'bg-secondary/5 border-secondary/30 text-secondary font-bold'
                      : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-white'
                    }`}
                  >
                    {uni}
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-10 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50/30">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3">
              <MapPin size={22} className="text-slate-300" />
            </div>
            <p className="text-[13px] font-medium text-slate-400">Select a city first to see nearby universities</p>
          </div>
        )}
      </div>
    </div>
  );
}
