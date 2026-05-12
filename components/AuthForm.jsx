'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, Star, Loader2, ArrowRight, MapPin, School, Building2, CheckCircle2 } from 'lucide-react';
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
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const cityRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    workOrStudy: '',
    password: '',
    confirmPassword: ''
  });

  // Handle outside click for city suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setShowCitySuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'city') {
      if (value.trim()) {
        const filtered = cities.filter(c => 
          c.toLowerCase().includes(value.toLowerCase())
        );
        setCitySuggestions(filtered);
        setShowCitySuggestions(true);
      } else {
        setCitySuggestions([]);
        setShowCitySuggestions(false);
      }
    }
  };

  const handleCitySelect = (cityName) => {
    setFormData({ ...formData, city: cityName });
    setShowCitySuggestions(false);
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
        login(data.data); // Save user to context/localStorage
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

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden relative">
      
      {/* Mobile Close Button */}
      <Link
        href="/"
        className="lg:hidden absolute top-6 right-6 p-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-900 shadow-lg z-50 transition-all duration-300"
      >
        <X size={20} />
      </Link>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto custom-scrollbar bg-white relative z-10 flex flex-col items-center py-12 px-4 sm:px-10 lg:px-16">
        
        <div className="w-full max-w-[500px] ss-zoom-in my-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-slate-500">
              {isLogin ? 'Login to manage your safe home' : 'Join Stay Safe to find your perfect home'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                {/* Role Selector */}
                <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-8">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${role === 'student' ? 'bg-white text-secondary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Hostel Boarder
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('owner')}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${role === 'owner' ? 'bg-white text-secondary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Hostel Owner
                  </button>
                </div>

                {/* Name Input */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-secondary transition-colors" size={18} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Ali Ahmed"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-secondary/30 focus:bg-white transition-all duration-300 text-slate-900"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-secondary transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="ali.ahmed@example.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-secondary/30 focus:bg-white transition-all duration-300 text-slate-900"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Input */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-secondary transition-colors" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+92 300 1234567"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-secondary/30 focus:bg-white transition-all duration-300 text-slate-900 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* City Input with Autocomplete */}
                <div className="space-y-1.5 relative" ref={cityRef}>
                  <label className="text-sm font-semibold text-slate-700 ml-1">City</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-secondary transition-colors" size={18} />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      placeholder="Type to search..."
                      autoComplete="off"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-secondary/30 focus:bg-white transition-all duration-300 text-slate-900 text-sm"
                      onChange={handleChange}
                      onFocus={() => formData.city && setShowCitySuggestions(true)}
                      required
                    />
                    {cities.includes(formData.city) && (
                      <CheckCircle2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                    )}

                    {/* Suggestions Dropdown */}
                    {showCitySuggestions && citySuggestions.length > 0 && (
                      <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                          {citySuggestions.map((cityName) => (
                            <button
                              key={cityName}
                              type="button"
                              onClick={() => handleCitySelect(cityName)}
                              className="w-full text-left px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-secondary transition-colors flex items-center justify-between group"
                            >
                              {cityName}
                              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!isLogin && role === 'student' && (
              /* Work/Study Input - Only for Boarders */
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">University / Workplace</label>
                <div className="relative group">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-secondary transition-colors" size={18} />
                  <input
                    type="text"
                    name="workOrStudy"
                    placeholder="UMT, NUST, GTechSources..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-secondary/30 focus:bg-white transition-all duration-300 text-slate-900"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            <div className={isLogin ? "space-y-1.5" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-secondary transition-colors" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-secondary/30 focus:bg-white transition-all duration-300 text-slate-900 text-sm"
                    onChange={handleChange}
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Confirm</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-secondary transition-colors" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-secondary/30 focus:bg-white transition-all duration-300 text-slate-900 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-semibold text-secondary hover:underline">Forgot Password?</button>
              </div>
            )}

            <button
              type="submit"
              disabled={authMutation.isPending}
              className="w-full py-4 rounded-2xl font-bold text-white shadow-lg shadow-secondary/20 bg-secondary hover:bg-crimson-600 transition-all duration-300 active:scale-[0.98] mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {authMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  {isLogin ? 'Log In' : 'Create Account'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-slate-500 mt-6 pb-8">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Link href={isLogin ? '/signup' : '/login'} className="text-secondary font-bold ml-1 hover:underline cursor-pointer">
                {isLogin ? 'Sign Up' : 'Log In'}
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Testimonial Image */}
      <div 
        className="hidden lg:block lg:w-1/2 h-screen relative bg-slate-900"
        style={{ 
          backgroundImage: "url('https://houstels-pk-images.s3.ap-south-1.amazonaws.com/blogs/prod/24/images/whatsapp-image-2025-11-10-at-20337-pm-1762767943-FuxCWtnF.jpeg')", 
          backgroundPosition: "center", 
          backgroundSize: "cover", 
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        <Link
          href="/"
          className="absolute top-8 right-8 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 cursor-pointer z-30 border border-white/20"
        >
          <X size={24} />
        </Link>

        <div className="absolute bottom-12 left-12 right-12 text-white z-20 max-w-lg">
          <div className="mb-6 relative">
            <h2 className="text-3xl sm:text-4xl font-bold leading-[1.2] mb-8 tracking-tight drop-shadow-xl text-white">
              <span className="text-secondary">&ldquo;</span>
              {isLogin 
                ? "Manage your listings and connect with boarders more efficiently than ever before." 
                : "I found the perfect hostel in just 2 days after joining Stay Safe. The verification badge made all the difference."}
              <span className="text-secondary">&rdquo;</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-black text-white shadow-lg border-2 border-white/10 group-hover:scale-105 transition-transform duration-300">
              AB
            </div>
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold text-white tracking-wide">Abubakar Butt</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-slate-100/90">Hostel Boarder • UMT Lahore</p>
                <div className="bg-secondary p-0.5 rounded-full shadow-sm">
                   <Star size={8} className="fill-white text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
