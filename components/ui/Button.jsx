import React from 'react';

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-300 cursor-pointer select-none active:scale-[0.97]';

  const variants = {
    primary: 'bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110',
    primary: 'bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110',
    outline: 'bg-transparent border border-slate-200 text-slate-600 hover:border-primary hover:text-primary',
    ghost: 'bg-transparent text-slate-500 hover:text-primary hover:text-primary/80',
    dark: 'bg-slate-800 text-white hover:bg-slate-700',
  };

  const sizes = {
    xs: 'text-xs px-4 py-2.5 rounded-xl',
    sm: 'text-sm px-5 py-2.5 rounded-full',
    md: 'text-sm px-8 py-3',
    lg: 'text-base px-10 py-4',
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
