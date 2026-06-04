'use client';

import { FileText } from 'lucide-react';

export default function StepDescription({ formData, handleChange }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-6">
        <div>
          <label className="block text-[15px] font-semibold text-slate-950 mb-3">
            Describe your hostel
          </label>
          <textarea
            name="description"
            rows={8}
            value={formData.description}
            placeholder="Share the room setup, environment, rules, facilities, and nearby places students care about."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-[16px] font-medium leading-7 text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-950 transition-colors resize-none"
            onChange={handleChange}
          />
          <p className="text-[13px] text-slate-500 mt-3">Keep it honest and specific. Students compare details before calling.</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
          <FileText size={18} className="text-slate-500 mt-0.5 shrink-0" />
          <p className="text-[13px] leading-5 text-slate-600">
            A good description usually includes room sharing, food, timings, laundry, security, and the neighborhood.
          </p>
        </div>
      </div>
    </div>
  );
}
