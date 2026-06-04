'use client';

import { Phone } from 'lucide-react';

export default function StepContact({ formData, handleChange }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-6">
        <div>
          <label className="block text-[15px] font-semibold text-slate-950 mb-3">
            What number should students call?
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
              <Phone size={16} className="text-slate-500" />
            </div>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              placeholder="+92 300 1234567"
              className="w-full rounded-xl border border-slate-300 bg-white py-4 pl-16 pr-4 text-[17px] font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-950 transition-colors"
              onChange={handleChange}
            />
          </div>
          <p className="text-[13px] text-slate-500 mt-3">This number appears on the listing for student inquiries.</p>
        </div>
      </div>
    </div>
  );
}
