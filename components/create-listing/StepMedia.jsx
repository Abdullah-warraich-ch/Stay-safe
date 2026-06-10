'use client';

import { useRef } from 'react';
import { Upload, X, Sparkles } from 'lucide-react';

export default function StepMedia({
  imageFiles, imagePreviews, handleImageSelect, removeImage,
  tags, tagInput, setTagInput, handleAddTag, handleRemoveTag, handleTagInputKeyDown, getSuggestedTags
}) {
  const fileInputRef = useRef(null);

  return (
    <div className="space-y-8 ">

      {/* ─── Photos ─── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[17px] font-semibold text-slate-950">Hostel Photos</h4>
            <p className="text-[13px] text-slate-500 mt-1">Upload clear, well-lit images.</p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className={`text-[12px] font-semibold ${imageFiles.length >= 2 ? 'text-slate-950' : 'text-slate-500'}`}>
              {imageFiles.length}/8
            </span>
            <span className="text-[11px] text-slate-500 ml-1">Min 2</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-slate-200">
              <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-3">
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-red-500 text-[11px] font-semibold hover:bg-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <X size={12} /> Remove
                </button>
              </div>
              {index === 0 && (
                <span className="absolute top-2 left-2 bg-slate-950 text-white text-[9px] font-semibold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  Cover
                </span>
              )}
            </div>
          ))}

          {imageFiles.length < 8 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[4/3] rounded-xl border border-dashed border-slate-300 hover:border-slate-950 bg-white transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-primary/10 flex items-center justify-center transition-all shadow-sm">
                <Upload size={18} className="text-slate-500 group-hover:text-slate-950 transition-colors" />
              </div>
              <span className="text-[12px] font-semibold text-slate-500 group-hover:text-slate-950 transition-colors">Add Photo</span>
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>

      {/* ─── Search Tags ─── */}
      <div className="space-y-5 pt-7 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[17px] font-semibold text-slate-950">Search Tags</h4>
            <p className="text-[13px] text-slate-500 mt-1">Keywords to help students find you.</p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[12px] font-semibold text-slate-500">{tags.length}/8</span>
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            placeholder='e.g. "Boys Hostel near Barkat Market"'
            className="flex-1 rounded-xl border border-slate-300 bg-white py-4 px-4 outline-none text-slate-950 text-[15px] font-medium placeholder:text-slate-400 focus:border-slate-950 transition-colors"
          />
          <button
            type="button"
            onClick={() => { if (tagInput.trim()) { handleAddTag(tagInput); setTagInput(''); } }}
            className="px-5 py-3 rounded-xl bg-slate-950 text-white text-[14px] font-semibold hover:bg-slate-800 transition-all cursor-pointer shrink-0 active:scale-95"
          >
            Add
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 min-h-[50px] p-3 bg-white rounded-xl border border-slate-300">
          {tags.length > 0 ? (
            tags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 text-white rounded-lg text-[12px] font-semibold animate-in zoom-in duration-200">
                #{tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer">
                  <X size={12} />
                </button>
              </span>
            ))
          ) : (
            <span className="text-slate-400 text-[13px] px-2 py-1.5 font-medium">No tags yet. Try the smart suggestions below.</span>
          )}
        </div>

        {/* Smart Suggestions */}
        {getSuggestedTags().length > 0 && (
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <div className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-400" />
              <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Smart Suggestions</h5>
            </div>
            <div className="flex flex-wrap gap-2">
              {getSuggestedTags().slice(0, 10).map(suggestion => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleAddTag(suggestion)}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-950 text-slate-700 hover:text-slate-950 rounded-lg text-[12px] font-semibold transition-all duration-200 cursor-pointer"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
