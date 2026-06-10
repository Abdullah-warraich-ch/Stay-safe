'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SearchableSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option...",
  icon: Icon,
  required = false,
  error = "",
  disabled = false,
  className = "",
  defaultValue = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
    setSearchTerm("");
  };

  const defaultInputClass = "w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-10 outline-none text-slate-800 text-[14px] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200 cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed";
  const labelClass = "text-[13px] font-semibold text-slate-600 ml-0.5 tracking-wide";
  const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200";

  return (
    <div className={`space-y-1.5 relative ${className.includes('space-y-0') ? '' : 'space-y-1.5'}`} ref={containerRef}>
      {label && <label className={labelClass}>{label}</label>}

      <div className="relative group">
        {Icon && <Icon className={`${iconClass} ${isOpen ? 'text-primary' : ''}`} size={16} />}

        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`${defaultInputClass} ${className} ${isOpen && !className.includes('border-none') ? 'ring-2 ring-primary/20 border-primary/40' : ''} flex items-center`}
        >
          {value ? (
            <span className="text-slate-800">{value}</span>
          ) : (
            <span className="text-slate-400">{placeholder}</span>
          )}

          {options.includes(value) && !isOpen && (
            <CheckCircle2 size={15} className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500" />
          )}

          <ChevronDown
            size={16}
            className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`}
          />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-[100] left-0 right-0 top-[calc(100%+6px)] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden ss-zoom-in">
            {/* Search Input inside dropdown */}
            <div className="p-2 border-b border-slate-100 bg-slate-50/50">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg py-1.5 pl-8 pr-3 text-[13px] outline-none focus:border-primary/40 transition-all"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors flex items-center justify-between group
                      ${value === option
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-slate-700 hover:bg-primary/5 hover:text-primary'}`}
                  >
                    {option}
                    {value === option ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-[13px] text-slate-400 italic">No matches found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-[11px] text-red-500 font-medium ml-1">{error}</p>}
    </div>
  );
}
