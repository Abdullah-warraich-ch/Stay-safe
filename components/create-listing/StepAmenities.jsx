'use client';

import {
  Wifi, Car, Wind, Tv, WashingMachine, Dumbbell, CookingPot, Utensils,
  Droplets, Zap, ShieldCheck, BookOpen, ShowerHead, Bed, Lock, Cigarette,
  PawPrint, Footprints, MapPin, Phone, CheckCircle2, Tag, Sparkles
} from 'lucide-react';

const AMENITIES = [
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'parking', label: 'Parking', icon: Car },
  { id: 'ac', label: 'Air Conditioning', icon: Wind },
  { id: 'tv', label: 'TV / Lounge', icon: Tv },
  { id: 'laundry', label: 'Laundry', icon: WashingMachine },
  { id: 'gym', label: 'Gym', icon: Dumbbell },
  { id: 'kitchen', label: 'Kitchen', icon: CookingPot },
  { id: 'meals', label: 'Meals Included', icon: Utensils },
  { id: 'geyser', label: 'Hot Water', icon: Droplets },
  { id: 'electricity', label: '24/7 Power', icon: Zap },
  { id: 'security', label: 'CCTV', icon: ShieldCheck },
  { id: 'study_room', label: 'Study Room', icon: BookOpen },
  { id: 'attached_bath', label: 'Attached Bath', icon: ShowerHead },
  { id: 'furnished', label: 'Furnished', icon: Bed },
  { id: 'locker', label: 'Locker', icon: Lock },
  { id: 'no_smoking', label: 'No Smoking', icon: Cigarette },
  { id: 'pets_allowed', label: 'Pets OK', icon: PawPrint },
  { id: 'terrace', label: 'Rooftop', icon: Footprints },
];

export default function StepAmenities({
  selectedAmenities, toggleAmenity,
  formData, hostelType, howManySeaters, mess, imageFiles, selectedUniversities, tags
}) {
  const activeSeaters = howManySeaters.filter(s => s.active);
  const minPrice = activeSeaters.length > 0 ? Math.min(...activeSeaters.map(s => Number(s.price) || 0)) : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* ─── Amenities ─── */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Sparkles size={18} className="text-secondary" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-900">Amenities</h4>
              <p className="text-[11px] text-slate-400">Select everything your hostel offers</p>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[12px] font-bold text-secondary">{selectedAmenities.length}</span>
            <span className="text-[11px] text-slate-400 ml-1">selected</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {AMENITIES.map(({ id, label, icon: Icon }) => {
            const isSelected = selectedAmenities.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleAmenity(id)}
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-[13px] font-semibold transition-all duration-300 cursor-pointer group ${isSelected
                  ? 'bg-secondary/5 border-secondary/30 text-secondary shadow-sm shadow-secondary/5'
                  : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${
                  isSelected ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                }`}>
                  <Icon size={15} />
                </div>
                <span className="truncate">{label}</span>
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-secondary rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Review Summary ─── */}
      <div className="space-y-5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 pb-2">
          <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 size={18} className="text-green-500" />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-slate-900">Review Your Listing</h4>
            <p className="text-[11px] text-slate-400">Make sure everything looks good before publishing</p>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 text-white">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-lg font-black truncate">{formData.name || 'Hostel Name'}</h3>
                <div className="flex items-center gap-1.5 text-white/60 mt-1 text-[12px]">
                  <MapPin size={12} />
                  <span className="truncate">{formData.area || 'Area'}, {formData.city || 'City'}</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-[11px] font-bold uppercase shrink-0 backdrop-blur-sm">
                {hostelType}
              </span>
            </div>
            {minPrice > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <span className="text-white/50 text-[11px] font-bold uppercase">Starting from</span>
                <span className="text-white text-lg font-black ml-2">Rs. {minPrice.toLocaleString()}<span className="text-white/40 text-[11px] font-bold">/mo</span></span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 divide-x divide-slate-100 bg-white">
            {[
              { label: 'Rooms', value: activeSeaters.length, color: 'text-amber-500' },
              { label: 'Photos', value: imageFiles.length, color: 'text-blue-500' },
              { label: 'Amenities', value: selectedAmenities.length, color: 'text-secondary' },
              { label: 'Tags', value: tags.length, color: 'text-orange-500' },
            ].map(({ label, value, color }) => (
              <div key={label} className="p-3 text-center">
                <p className={`text-[16px] font-black ${color}`}>{value}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-[13px]">
              <Phone size={13} className="text-slate-400" />
              <span className="text-slate-600 font-medium">{formData.phone || 'No phone set'}</span>
            </div>
            <div className="flex items-center gap-2 text-[13px]">
              <Utensils size={13} className="text-slate-400" />
              <span className="text-slate-600 font-medium">
                {mess.available ? `Mess: Rs. ${mess.price || '0'}/mo (${mess.compulsory ? 'Compulsory' : 'Optional'})` : 'No mess service'}
              </span>
            </div>

            {selectedUniversities.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedUniversities.map((uni, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white text-slate-500 rounded-lg text-[10px] font-bold border border-slate-100">
                    Near {uni.split('(')[0].trim()}
                  </span>
                ))}
              </div>
            )}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 bg-secondary/10 text-secondary rounded-lg text-[10px] font-bold">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
