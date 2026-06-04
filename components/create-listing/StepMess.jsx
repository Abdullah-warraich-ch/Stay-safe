'use client';

import { Utensils } from 'lucide-react';

export default function StepMess({ mess, setMess }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
          <Utensils size={18} className="text-slate-500 mt-0.5 shrink-0" />
          <p className="text-[13px] leading-5 text-slate-600">
            Add food details only if meals are available at the hostel.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMess(prev => ({ ...prev, available: !prev.available }))}
          className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
            mess.available
              ? 'border-slate-950 bg-slate-50'
              : 'border-slate-300 bg-white hover:border-slate-950'
          }`}
        >
          <div className="text-left">
            <p className={`text-[15px] font-semibold ${mess.available ? 'text-slate-950' : 'text-slate-700'}`}>
              {mess.available ? 'Mess is Available' : 'Enable Mess Service'}
            </p>
            <p className="text-[13px] text-slate-500 mt-1">Toggle if your hostel serves food</p>
          </div>
          <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${mess.available ? 'bg-slate-950' : 'bg-slate-200'}`}>
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${mess.available ? 'translate-x-6' : ''}`} />
          </div>
        </button>

        {mess.available && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-3 duration-400">
            <div>
              <label className="block text-[14px] font-semibold text-slate-950 mb-2">
                Monthly Price
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-[14px]">Rs.</div>
                <input
                  type="number"
                  placeholder="4,000"
                  value={mess.price}
                  onChange={(e) => setMess(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 bg-white py-4 pl-12 pr-4 text-[17px] font-semibold text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-950 transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-slate-950 mb-2">
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
                    className={`py-4 rounded-xl border text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
                      mess.compulsory === val
                        ? 'border-slate-950 bg-slate-50 text-slate-950'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-950'
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
