'use client';

import { Phone, Utensils, Bed, Home, ChevronDown } from 'lucide-react';
import { FaMale, FaFemale } from 'react-icons/fa';

export default function StepBasicInfo({ formData, handleChange, hostelType, setHostelType, howManySeaters, setHowManySeaters, mess, setMess }) {
  return (
    <div className="space-y-8 ">

      {/* ─── Hostel Identity ─── */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 pb-2">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Home size={18} className="text-primary" />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-slate-900">Hostel Identity</h4>
            <p className="text-[11px] text-slate-400">What should students know first?</p>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Hostel Name <span className="text-red-400">*</span>
          </label>
          <input
            name="name"
            value={formData.name}
            placeholder="e.g. Al-Noor Boys Hostel"
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3.5 px-5 outline-none text-slate-900 text-[15px] font-medium placeholder:text-slate-300 focus:bg-white focus:border-primary/40 focus:shadow-lg focus:shadow-primary/5 transition-all duration-300"
            onChange={handleChange}
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Hostel Type <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'boys', label: 'Boys Hostel', Icon: FaMale, color: 'blue' },
              { key: 'girls', label: 'Girls Hostel', Icon: FaFemale, color: 'pink' },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setHostelType(key)}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${hostelType === key
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                  : 'border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-white'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${hostelType === key ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                    }`}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-[14px] font-bold transition-colors ${hostelType === key ? 'text-primary' : 'text-slate-600'
                    }`}>
                    {label}
                  </span>
                </div>
                {hostelType === key && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            placeholder="Describe your hostel — rooms, environment, rules, neighborhood highlights..."
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3.5 px-5 outline-none text-slate-900 text-[15px] font-medium placeholder:text-slate-300 focus:bg-white focus:border-primary/40 focus:shadow-lg focus:shadow-primary/5 transition-all duration-300 resize-none leading-relaxed"
            onChange={handleChange}
          />
          <p className="text-[11px] text-slate-400 mt-1.5 pl-1">A detailed description helps students make confident decisions.</p>
        </div>

        {/* Contact */}
        <div>
          <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Contact Number <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
              <Phone size={14} className="text-slate-400" />
            </div>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              placeholder="+92 300 1234567"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3.5 pl-14 pr-5 outline-none text-slate-900 text-[15px] font-medium placeholder:text-slate-300 focus:bg-white focus:border-primary/40 focus:shadow-lg focus:shadow-primary/5 transition-all duration-300"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* ─── Room Types & Pricing ─── */}
      <div className="space-y-5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 pb-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Bed size={18} className="text-amber-500" />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-slate-900">Room Types & Pricing</h4>
            <p className="text-[11px] text-slate-400">Select room sizes and set monthly rent</p>
          </div>
        </div>

        {/* Seater Buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          {howManySeaters.map((item, index) => (
            <button
              key={item.seater}
              type="button"
              onClick={() => {
                const newSeaters = [...howManySeaters];
                newSeaters[index].active = !newSeaters[index].active;
                setHowManySeaters(newSeaters);
              }}
              className={`relative py-3.5 px-3 rounded-2xl border-2 text-[13px] font-bold transition-all duration-300 cursor-pointer ${item.active
                ? 'border-primary bg-primary/5 text-primary shadow-md shadow-primary/10'
                : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200 hover:bg-white'
                }`}
            >
              {item.seater}
              {item.active && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Price Inputs */}
        {howManySeaters.filter(s => s.active).length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            {howManySeaters.filter(s => s.active).map((item) => (
              <div key={item.seater} className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  {item.seater} — Monthly Rent
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[13px]">Rs.</div>
                  <input
                    type="number"
                    placeholder="0"
                    value={item.price}
                    onChange={(e) => {
                      const newSeaters = [...howManySeaters];
                      const idx = howManySeaters.findIndex(s => s.seater === item.seater);
                      newSeaters[idx].price = e.target.value;
                      setHowManySeaters(newSeaters);
                    }}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 pl-12 pr-5 outline-none text-slate-900 text-[15px] font-bold placeholder:text-slate-300 focus:bg-white focus:border-primary/40 focus:shadow-lg focus:shadow-primary/5 transition-all duration-300"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {howManySeaters.filter(s => s.active).length === 0 && (
          <div className="p-4 rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 text-center">
            <p className="text-[13px] text-slate-400 font-medium">Tap the room types above to get started</p>
          </div>
        )}
      </div>

      {/* ─── Mess / Food Service ─── */}
      <div className="space-y-5 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 pb-2">
          <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
            <Utensils size={18} className="text-green-500" />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-slate-900">Mess / Food Service</h4>
            <p className="text-[11px] text-slate-400">Does your hostel provide meals?</p>
          </div>
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={() => setMess(prev => ({ ...prev, available: !prev.available }))}
          className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${mess.available
            ? 'border-green-200 bg-green-50/50'
            : 'border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200'
            }`}
        >
          <div className="text-left">
            <p className={`text-[14px] font-bold ${mess.available ? 'text-green-700' : 'text-slate-700'}`}>
              {mess.available ? 'Mess is Available ✓' : 'Enable Mess Service'}
            </p>
            <p className="text-[12px] text-slate-400 mt-0.5">Toggle if your hostel serves food</p>
          </div>
          <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${mess.available ? 'bg-green-500' : 'bg-slate-200'}`}>
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${mess.available ? 'translate-x-6' : ''}`} />
          </div>
        </button>

        {/* Mess Details */}
        {mess.available && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-3 duration-400">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Monthly Price
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[13px]">Rs.</div>
                <input
                  type="number"
                  placeholder="4,000"
                  value={mess.price}
                  onChange={(e) => setMess(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 pl-12 pr-5 outline-none text-slate-900 text-[15px] font-bold placeholder:text-slate-300 focus:bg-white focus:border-primary/40 transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Is it Compulsory?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { val: true, label: 'Yes' },
                  { val: false, label: 'Optional' },
                ].map(({ val, label }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setMess(prev => ({ ...prev, compulsory: val }))}
                    className={`py-3 rounded-2xl border-2 text-[13px] font-bold transition-all duration-300 cursor-pointer ${mess.compulsory === val
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
