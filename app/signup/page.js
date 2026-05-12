'use client';

import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState('student'); // 'student' or 'owner'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Role:', role);
    console.log('Form Data:', formData);
    // Logic for backend call will go here
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8  overflow-hidden">
      {/* Background Decorative Elements */}
      {/* <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-primary/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[60%] bg-secondary/5 blur-[120px] rounded-full"></div> */}

      {/* Main Card */}
      <div className="bg-white w-full max-w-[500px] rounded-[2rem] shadow-2xl shadow-slate-200/50 relative z-10 overflow-hidden border border-slate-100 ss-zoom-in">

        {/* Close Button */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300 cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Create Account</h1>
            <p className="text-slate-500">Join Stay Safe to find your perfect home</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Role Selector */}
            <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-8">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${role === 'student' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Hostel Internee
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
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-primary/30 focus:bg-white transition-all duration-300 text-slate-900"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-primary/30 focus:bg-white transition-all duration-300 text-slate-900"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+92 300 1234567"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-primary/30 focus:bg-white transition-all duration-300 text-slate-900"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-primary/30 focus:bg-white transition-all duration-300 text-slate-900 text-sm"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Confirm</label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-primary/30 focus:bg-white transition-all duration-300 text-slate-900 text-sm"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 active:scale-[0.98] mt-4 ${role === 'student' ? 'bg-primary shadow-primary/20 hover:bg-amber-500' : 'bg-secondary shadow-secondary/20 hover:bg-crimson-600'}`}
            >
              Sign Up as {role === 'student' ? 'Internee' : 'Owner'}
            </button>

            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?
              <button type="button" className="text-primary font-bold ml-1 hover:underline cursor-pointer">Log In</button>
            </p>
          </form>
        </div>
      </div>
      <div style={{ backgroundImage: "url('https://houstels-pk-images.s3.ap-south-1.amazonaws.com/blogs/prod/24/images/whatsapp-image-2025-11-10-at-20337-pm-1762767943-FuxCWtnF.jpeg')", width: "100%", height: "100%" }}>

      </div>
    </div>
  );
}
