'use client';

import { useRef } from 'react';
import { ImagePlus, Upload, X, Tag, Camera, Sparkles } from 'lucide-react';

export default function StepMedia({
  imageFiles, imagePreviews, handleImageSelect, removeImage,
  tags, tagInput, setTagInput, handleAddTag, handleRemoveTag, handleTagInputKeyDown, getSuggestedTags
}) {
  const fileInputRef = useRef(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* ─── Photos ─── */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Camera size={18} className="text-blue-500" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-900">Hostel Photos</h4>
              <p className="text-[11px] text-slate-400">Upload clear, well-lit images</p>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className={`text-[12px] font-bold ${imageFiles.length >= 2 ? 'text-green-500' : 'text-slate-400'}`}>
              {imageFiles.length}/8
            </span>
            <span className="text-[11px] text-slate-400 ml-1">• Min 2</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden group border-2 border-slate-100 shadow-sm">
              <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-3">
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-xl text-red-500 text-[11px] font-bold hover:bg-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <X size={12} /> Remove
                </button>
              </div>
              {index === 0 && (
                <span className="absolute top-2 left-2 bg-secondary text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg shadow-secondary/30">
                  Cover
                </span>
              )}
            </div>
          ))}

          {imageFiles.length < 8 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-200 hover:border-secondary/40 bg-slate-50 hover:bg-secondary/5 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-secondary/10 flex items-center justify-center transition-all shadow-sm">
                <Upload size={18} className="text-slate-400 group-hover:text-secondary transition-colors" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 group-hover:text-secondary transition-colors">Add Photo</span>
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
      <div className="space-y-5 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Tag size={18} className="text-orange-500" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-900">Search Tags</h4>
              <p className="text-[11px] text-slate-400">Keywords to help students find you</p>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[12px] font-bold text-slate-400">{tags.length}/8</span>
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
            className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl py-3.5 px-5 outline-none text-slate-900 text-[14px] font-medium placeholder:text-slate-300 focus:bg-white focus:border-secondary/40 focus:shadow-lg focus:shadow-secondary/5 transition-all duration-300"
          />
          <button
            type="button"
            onClick={() => { if (tagInput.trim()) { handleAddTag(tagInput); setTagInput(''); } }}
            className="px-5 py-3 rounded-2xl bg-slate-900 text-white text-[13px] font-bold hover:bg-slate-800 transition-all cursor-pointer shrink-0 shadow-sm active:scale-95"
          >
            Add
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 min-h-[50px] p-3 bg-slate-50 rounded-2xl border-2 border-slate-100">
          {tags.length > 0 ? (
            tags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-white rounded-xl text-[12px] font-semibold animate-in zoom-in duration-200 shadow-sm shadow-secondary/15">
                #{tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer">
                  <X size={12} />
                </button>
              </span>
            ))
          ) : (
            <span className="text-slate-300 text-[13px] px-2 py-1.5 font-medium">No tags yet — try the smart suggestions below!</span>
          )}
        </div>

        {/* Smart Suggestions */}
        {getSuggestedTags().length > 0 && (
          <div className="space-y-3 pt-3 border-t border-slate-50">
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
                  className="px-3 py-1.5 bg-white border-2 border-slate-100 hover:border-secondary/30 hover:bg-secondary/5 text-slate-500 hover:text-secondary rounded-xl text-[11px] font-bold transition-all duration-200 cursor-pointer"
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
