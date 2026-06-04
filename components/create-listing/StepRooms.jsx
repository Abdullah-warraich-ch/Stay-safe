'use client';

import { Bed } from 'lucide-react';

export default function StepRooms({ howManySeaters, setHowManySeaters }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
          <Bed size={18} className="text-slate-500 mt-0.5 shrink-0" />
          <p className="text-[13px] leading-5 text-slate-600">
            Select every room type you offer, then add the monthly rent for each.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {howManySeaters.map((item, index) => (
            <button
              key={item.seater}
              type="button"
              onClick={() => {
                const newSeaters = [...howManySeaters];
                newSeaters[index].active = !newSeaters[index].active;
                setHowManySeaters(newSeaters);
              }}
              className={`relative rounded-xl border p-4 text-[15px] font-semibold transition-all duration-200 cursor-pointer ${
                item.active
                  ? 'border-slate-950 bg-slate-50 text-slate-950'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-950'
              }`}
            >
              {item.seater}
              {item.active && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-slate-950 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {howManySeaters.filter(s => s.active).length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            {howManySeaters.filter(s => s.active).map((item) => (
              <div key={item.seater} className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-[14px] font-semibold text-slate-950 mb-2">
                  {item.seater} - Monthly Rent
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-[14px]">Rs.</div>
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
                    className="w-full rounded-xl border border-slate-300 bg-white py-4 pl-12 pr-4 text-[17px] font-semibold text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-950 transition-colors"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {howManySeaters.filter(s => s.active).length === 0 && (
          <div className="p-5 rounded-xl border border-dashed border-slate-300 bg-white text-center">
            <p className="text-[14px] text-slate-500 font-medium">Tap a room type to add pricing.</p>
          </div>
        )}
      </div>
    </div>
  );
}
