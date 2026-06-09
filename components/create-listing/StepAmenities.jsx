'use client';

import {
  Wifi, Car, Wind, Tv, WashingMachine, Dumbbell, CookingPot, Utensils,
  Droplets, Zap, ShieldCheck, BookOpen, ShowerHead, Bed, Lock, Cigarette,
  PawPrint, Footprints, MapPin, Phone, CheckCircle2
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
  formData, hostelType, howManySeaters, mess, imageFiles, selectedUniversities, tags,
  backupLight, setBackupLight, acType, setAcType, attachedBath, setAttachedBath
}) {
  const activeSeaters = howManySeaters.filter(s => s.active);
  const minPrice = activeSeaters.length > 0 ? Math.min(...activeSeaters.map(s => Number(s.price) || 0)) : 0;

  return (
    <div className="space-y-8 ">

      {/* ─── Amenities ─── */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[17px] font-semibold text-slate-950">Amenities</h4>
            <p className="text-[13px] text-slate-500 mt-1">Select everything your hostel offers.</p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[12px] font-semibold text-slate-950">{selectedAmenities.length}</span>
            <span className="text-[11px] text-slate-500 ml-1">selected</span>
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
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl border text-[13px] font-semibold transition-all duration-200 cursor-pointer group ${isSelected
                  ? 'bg-slate-50 border-slate-950 text-slate-950'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-slate-950'
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${isSelected ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}>
                  <Icon size={15} />
                </div>
                <span className="truncate">{label}</span>
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-slate-950 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Backup Light ─── */}
      <div className="space-y-5 pt-7 border-t border-slate-200">
        <div className="flex items-center gap-3 pb-2">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <Zap size={18} className="text-slate-500" />
          </div>
          <div>
            <h4 className="text-[15px] font-semibold text-slate-950">Backup Light</h4>
            <p className="text-[13px] text-slate-500">Does your hostel have backup power/generator?</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { val: 'Yes', label: 'Yes, Backup Light Available' },
            { val: 'No', label: 'No Backup Power' },
          ].map(({ val, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => setBackupLight(val)}
              className={`relative p-4 rounded-xl border font-semibold transition-all duration-200 cursor-pointer text-center text-[13px] ${backupLight === val
                  ? 'border-slate-950 bg-slate-50 text-slate-950'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-950'
                }`}
            >
              {label}
              {backupLight === val && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-slate-950 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Air Conditioning ─── */}
      <div className="space-y-5 pt-7 border-t border-slate-200">
        <div className="flex items-center gap-3 pb-2">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <Wind size={18} className="text-slate-500" />
          </div>
          <div>
            <h4 className="text-[15px] font-semibold text-slate-950">Air Conditioning</h4>
            <p className="text-[13px] text-slate-500">Do you offer AC rooms?</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { val: 'AC', label: 'AC Rooms Available' },
            { val: 'Non-AC', label: 'Non-AC Only' },
          ].map(({ val, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => setAcType(val)}
              className={`relative p-4 rounded-xl border font-semibold transition-all duration-200 cursor-pointer text-center text-[13px] ${acType === val
                  ? 'border-slate-950 bg-slate-50 text-slate-950'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-950'
                }`}
            >
              {label}
              {acType === val && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-slate-950 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Attached Bath ─── */}
      <div className="space-y-5 pt-7 border-t border-slate-200">
        <div className="flex items-center gap-3 pb-2">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <ShowerHead size={18} className="text-slate-500" />
          </div>
          <div>
            <h4 className="text-[15px] font-semibold text-slate-950">Attached Bath</h4>
            <p className="text-[13px] text-slate-500">Are rooms equipped with attached washrooms?</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { val: 'Yes', label: 'Yes, Attached Bath' },
            { val: 'No', label: 'No / Common Bath' },
          ].map(({ val, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => setAttachedBath(val)}
              className={`relative p-4 rounded-xl border font-semibold transition-all duration-200 cursor-pointer text-center text-[13px] ${attachedBath === val
                  ? 'border-slate-950 bg-slate-50 text-slate-950'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-950'
                }`}
            >
              {label}
              {attachedBath === val && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-slate-950 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              )}
            </button>
          ))}
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
            <div className="flex items-center gap-2 text-[13px]">
              <Zap size={13} className="text-slate-400" />
              <span className="text-slate-600 font-medium">
                Backup Light: {backupLight === 'Yes' ? 'Available' : 'Not Available'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[13px]">
              <Wind size={13} className="text-slate-400" />
              <span className="text-slate-600 font-medium">
                Air Conditioning: {acType === 'AC' ? 'AC Rooms' : 'Non-AC Only'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[13px]">
              <ShowerHead size={13} className="text-slate-400" />
              <span className="text-slate-600 font-medium">
                Washroom: {attachedBath === 'Yes' ? 'Attached Bath' : 'Common Bath'}
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
