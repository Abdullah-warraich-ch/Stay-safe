'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, Star, Loader2, ArrowRight, MapPin, School, CheckCircle2 } from 'lucide-react';
import SearchableSelect from './SearchableSelect';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { cities } from '@/data/citiesData';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

export default function AuthForm({ mode = 'signup' }) {
  const router = useRouter();
  const { login } = useAuth();
  const isLogin = mode === 'login';

  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    workOrStudy: '',
    password: '',
    confirmPassword: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  // Mutation for Auth (Login or Signup)
  const authMutation = useMutation({
    mutationFn: async (userData) => {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `${isLogin ? 'Login' : 'Registration'} failed`);
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');

      if (isLogin) {
        login(data.data); // Save user to context/cookies
      }

      setTimeout(() => {
        router.push(isLogin ? '/dashboard' : '/login');
      }, 1500);
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (!cities.includes(formData.city)) {
        toast.error('Please select a city from the recommended list');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
    }

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        workOrStudy: role === 'student' ? formData.workOrStudy : undefined,
        password: formData.password,
        role: role === 'student' ? 'student' : 'owner'
      };

    authMutation.mutate(payload);
  };

  // Shared input class
  const inputClass = "w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none text-slate-800 text-[14px] placeholder:text-slate-400 focus:ring-2 focus:ring-secondary/20 focus:border-secondary/40 transition-all duration-200";
  const labelClass = "text-[13px] font-semibold text-slate-600 ml-0.5 tracking-wide";
  const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-secondary transition-colors duration-200";

  return (
    <div className="flex min-h-screen overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #fafafa 0%, #f1f5f9 50%, #f8fafc 100%)' }}>

      {/* Mobile Close Button */}
      <Link
        href="/"
        className="lg:hidden absolute top-5 right-5 p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 shadow-md z-50 transition-all duration-300 hover:shadow-lg hover:scale-105"
      >
        <X size={18} />
      </Link>

      {/* ─── Left Side — Form ─── */}
      <div className="w-full lg:w-[52%] h-screen flex flex-col relative z-10">

        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 sm:px-10 lg:px-14 py-4">
          <Link href="/" className="inline-block">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Stay Safe<span className="text-secondary">.</span></h2>
          </Link>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-10 lg:px-14 py-8">
        <div className="w-full max-w-[460px] mx-auto ss-zoom-in">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-slate-500 text-sm mt-1.5">
              {isLogin
                ? 'Enter your credentials to access your dashboard'
                : 'Join thousands finding their perfect hostel'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                {/* Role Selector */}
                <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-300 cursor-pointer ${role === 'student'
                      ? 'bg-white text-secondary shadow-sm ring-1 ring-slate-200/50'
                      : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >
                    Hostel Boarder
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('owner')}
                    className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-300 cursor-pointer ${role === 'owner'
                      ? 'bg-white text-secondary shadow-sm ring-1 ring-slate-200/50'
                      : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >
                    Hostel Owner
                  </button>
                </div>

                {/* Name Input */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Full Name</label>
                  <div className="relative group">
                    <User className={iconClass} size={16} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Ali Ahmed"
                      className={inputClass}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className={labelClass}>Email Address</label>
              <div className="relative group">
                <Mail className={iconClass} size={16} />
                <input
                  type="email"
                  name="email"
                  placeholder="ali.ahmed@example.com"
                  className={inputClass}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Input */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Phone Number</label>
                  <div className="relative group">
                    <Phone className={iconClass} size={16} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+92 300 1234567"
                      className={inputClass}
                      onChange={handleChange}
                      required
                    />
                  </div>
                          {/* City Input with Searchable Select */}
                <SearchableSelect
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  options={cities}
                  placeholder="Select your city..."
                  icon={MapPin}
                  required
                />        </div>
              </div>
            )}

            {!isLogin && role === 'student' && (
              /* Work/Study Input - Only for Boarders */
              <div className="space-y-1.5">
                <label className={labelClass}>University / Workplace</label>
                <div className="relative group">
                  <School className={iconClass} size={16} />
                  <input
                    type="text"
                    name="workOrStudy"
                    placeholder="UMT, NUST, GTechSources..."
                    className={inputClass}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            <div className={isLogin ? "space-y-1.5" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
              <div className="space-y-1.5">
                <label className={labelClass}>Password</label>
                <div className="relative group">
                  <Lock className={iconClass} size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Min. 8 characters"
                    className={`${inputClass} pr-11`}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className={labelClass}>Confirm Password</label>
                  <div className="relative group">
                    <ShieldCheck className={iconClass} size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      className={inputClass}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex justify-end -mt-1">
                <button type="button" className="text-[12px] font-semibold text-secondary hover:underline cursor-pointer">Forgot Password?</button>
              </div>
            )}

            <button
              type="submit"
              disabled={authMutation.isPending}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-secondary hover:brightness-110 transition-all duration-200 active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer text-[14px] shadow-md shadow-secondary/15"
            >
              {authMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Processing...
                </>
              ) : (
                <>
                  {isLogin ? 'Log In' : 'Create Account'}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-[13px] text-slate-500 mt-4 pb-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Link href={isLogin ? '/signup' : '/login'} className="text-secondary font-bold ml-1 hover:underline cursor-pointer">
                {isLogin ? 'Sign Up' : 'Log In'}
              </Link>
            </p>
          </form>
        </div>
        </div>
      </div>

      {/* ─── Right Side — Visual Panel ─── */}
      <div className="hidden lg:flex lg:w-[48%] h-screen relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://houstels-pk-images.s3.ap-south-1.amazonaws.com/blogs/prod/24/images/whatsapp-image-2025-11-10-at-20337-pm-1762767943-FuxCWtnF.jpeg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-secondary/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>

        {/* Subtle grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}></div>

        {/* Close Button */}
        <Link
          href="/"
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 backdrop-blur-md text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-pointer z-30 border border-white/10"
        >
          <X size={20} />
        </Link>

        {/* Floating Badge */}
        <div className="absolute top-6 left-6 z-20 ss-slide-up">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
            <ShieldCheck size={14} className="text-secondary" />
            <span className="text-[12px] font-semibold text-white/90">Verified & Secure</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="absolute top-20 left-6 right-6 z-20 ss-slide-up-d1">
          <div className="flex gap-3">
            {[
              { label: 'Active Users', value: '2.4K+' },
              { label: 'Hostels Listed', value: '850+' },
              { label: 'Cities', value: '4' },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 bg-white/[0.07] backdrop-blur-sm rounded-xl p-3 border border-white/[0.08]">
                <p className="text-white font-bold text-lg leading-tight">{stat.value}</p>
                <p className="text-white/50 text-[11px] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Testimonial */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
          <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.1]">
            {/* Stars */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-secondary text-secondary" />
              ))}
            </div>

            <p className="text-white/90 text-[15px] leading-relaxed font-medium mb-5">
              {isLogin
                ? "Manage your listings and connect with boarders more efficiently than ever before."
                : "I found the perfect hostel in just 2 days after joining Stay Safe. The verification badge made all the difference."}
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center text-sm font-black text-white shadow-lg">
                AB
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-white">Abubakar Butt</h3>
                <p className="text-[12px] text-white/60">Hostel Boarder • UMT Lahore</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
