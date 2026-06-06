'use client';

import { Home } from 'lucide-react';
import { FaMale, FaFemale } from 'react-icons/fa';

export default function StepTitle({ formData, handleChange, hostelType, setHostelType }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-6">
        <div>
          <label className="block text-[18px] font-medium leading-snug tracking-tight text-slate-900 mb-3">
            What is your hostel called?
          </label>
          <input
            name="name"
            value={formData.name}
            placeholder="Al-Noor Boys Hostel"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-[17px] font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-950 transition-colors"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-[18px] font-medium leading-snug tracking-tight text-slate-900 mb-3">
            Who can stay here?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'boys', label: 'Boys Hostel', Icon: FaMale },
              { key: 'girls', label: 'Girls Hostel', Icon: FaFemale },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setHostelType(key)}
                className={`relative rounded-xl border p-5 transition-all duration-200 cursor-pointer group ${hostelType === key
                  ? 'border-slate-950 bg-slate-50'
                  : 'border-slate-300 bg-white hover:border-slate-950'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${hostelType === key ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-[15px] font-semibold ${hostelType === key ? 'text-slate-950' : 'text-slate-700'
                    }`}>
                    {label}
                  </span>
                </div>
                {hostelType === key && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-slate-950 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
          <Home size={18} className="text-slate-500 mt-0.5 shrink-0" />
          <p className="text-[13px] leading-5 text-slate-600">
            Use the public name students will recognize in search results.
          </p>
        </div>
      </div>
    </div>
  );
}
