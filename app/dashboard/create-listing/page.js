'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { cities } from '@/data/citiesData';
import { citiesData } from '@/data/citiesData';
import {
  ArrowLeft, Upload, X, ImagePlus, Loader2, MapPin,
  Building2, Phone, Users, DollarSign, FileText, Home,
  Wifi, Car, ShowerHead, Utensils, Wind, Tv, Dumbbell,
  WashingMachine, ShieldCheck, Zap, Droplets, BookOpen,
  Lock, Cigarette, PawPrint, CookingPot, Bed, Footprints
} from 'lucide-react';

const AMENITIES = [
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'parking', label: 'Parking', icon: Car },
  { id: 'ac', label: 'Air Conditioning', icon: Wind },
  { id: 'tv', label: 'TV / Lounge', icon: Tv },
  { id: 'laundry', label: 'Laundry', icon: WashingMachine },
  { id: 'gym', label: 'Gym', icon: Dumbbell },
  { id: 'kitchen', label: 'Kitchen', icon: CookingPot },
  { id: 'meals', label: 'Meals Included', icon: Utensils },
  { id: 'geyser', label: 'Geyser / Hot Water', icon: Droplets },
  { id: 'electricity', label: '24/7 Electricity', icon: Zap },
  { id: 'security', label: 'Security / CCTV', icon: ShieldCheck },
  { id: 'study_room', label: 'Study Room', icon: BookOpen },
  { id: 'attached_bath', label: 'Attached Bathroom', icon: ShowerHead },
  { id: 'furnished', label: 'Furnished Rooms', icon: Bed },
  { id: 'locker', label: 'Personal Locker', icon: Lock },
  { id: 'no_smoking', label: 'No Smoking', icon: Cigarette },
  { id: 'pets_allowed', label: 'Pets Allowed', icon: PawPrint },
  { id: 'terrace', label: 'Terrace / Rooftop', icon: Footprints },
];

export default function CreateListingPage() {
  return (
    <ProtectedRoute>
      <CreateListingContent />
    </ProtectedRoute>
  );
}

function CreateListingContent() {
  const { user } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    area: '',
    address: '',
    price: '',
    hostelType: 'boys',
    phone: '',
    capacity: '',
  });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // When city changes, update available areas
    if (name === 'city' && citiesData[value]) {
      setAvailableAreas(citiesData[value]);
      setFormData(prev => ({ ...prev, city: value, area: '' }));
    }
  };

  const toggleAmenity = (amenityId) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(a => a !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = imageFiles.length + files.length;

    if (totalImages > 8) {
      toast.error('Maximum 8 images allowed');
      return;
    }

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImageFiles(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Submit mutation
  const createMutation = useMutation({
    mutationFn: async () => {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('city', formData.city);
      data.append('area', formData.area);
      data.append('address', formData.address);
      data.append('price', formData.price);
      data.append('hostelType', formData.hostelType);
      data.append('phone', formData.phone);
      data.append('capacity', formData.capacity);
      data.append('ownerId', user.id);
      data.append('amenities', JSON.stringify(selectedAmenities));

      imageFiles.forEach(file => {
        data.append('images', file);
      });

      const response = await fetch('/api/hostels', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to create listing');
      return result;
    },
    onSuccess: () => {
      toast.success('Hostel listed successfully!');
      setTimeout(() => router.push('/dashboard'), 1500);
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageFiles.length < 2) {
      toast.error('Please upload at least 2 images');
      return;
    }
    createMutation.mutate();
  };

  const inputClass = "w-full bg-white border border-slate-200 rounded-xl py-3 px-4 outline-none text-slate-800 text-[14px] placeholder:text-slate-400 focus:ring-2 focus:ring-secondary/20 focus:border-secondary/40 transition-all duration-200";
  const labelClass = "text-[13px] font-semibold text-slate-600 tracking-wide";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 sm:px-10 lg:px-20 py-4">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
              <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Stay Safe<span className="text-secondary">.</span></h1>
          </div>
          <p className="text-[13px] text-slate-500 hidden sm:block"></p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-10 lg:px-20 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">List Your Hostel</h2>
          <p className="text-slate-500 text-sm mt-1">Fill in the details below to get your hostel listed on Stay Safe.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ── Section: Basic Info ── */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
            <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
              <Home size={18} className="text-secondary" /> Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className={labelClass}>Hostel Name</label>
                <input name="name" placeholder="e.g. Al-Noor Boys Hostel" className={inputClass} onChange={handleChange} required />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Hostel Type</label>
                <select name="hostelType" className={inputClass} onChange={handleChange} value={formData.hostelType}>
                  <option value="boys">Boys Hostel</option>
                  <option value="girls">Girls Hostel</option>
                  <option value="co-ed">Co-Ed</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Describe your hostel, rooms, environment..."
                className={`${inputClass} resize-none`}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className={labelClass}>Monthly Price (PKR)</label>
                <div className="">
                  {/* <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /> */}
                  <input name="price" type="number" placeholder="8,000" className={`${inputClass}`} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Capacity (beds)</label>
                <div className="relative">
                  <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="capacity" type="number" placeholder="20" className={`${inputClass} pl-10`} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Contact Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="phone" type="tel" placeholder="+92 300 1234567" className={`${inputClass} pl-10`} onChange={handleChange} required />
                </div>
              </div>
            </div>
          </div>

          {/* ── Section: Location ── */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
            <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
              <MapPin size={18} className="text-secondary" /> Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className={labelClass}>City</label>
                <select name="city" className={inputClass} onChange={handleChange} value={formData.city} required>
                  <option value="">Select City</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Area</label>
                <select name="area" className={inputClass} onChange={handleChange} value={formData.area} required disabled={!formData.city}>
                  <option value="">Select Area</option>
                  {availableAreas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Full Address</label>
              <input name="address" placeholder="House #, Street, Block..." className={inputClass} onChange={handleChange} required />
            </div>
          </div>

          {/* ── Section: Images ── */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
                <ImagePlus size={18} className="text-secondary" /> Photos
              </h3>
              <span className="text-[12px] text-slate-400 font-medium">
                {imageFiles.length}/8 uploaded • Min 2 required
              </span>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-slate-200">
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-2 bg-white/90 rounded-full text-red-500 hover:bg-white transition-colors cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  {index === 0 && (
                    <span className="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Cover
                    </span>
                  )}
                </div>
              ))}

              {/* Add Image Button */}
              {imageFiles.length < 8 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-200 hover:border-secondary/40 bg-slate-50 hover:bg-secondary/5 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group"
                >
                  <Upload size={22} className="text-slate-400 group-hover:text-secondary transition-colors" />
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-secondary transition-colors">Add Photo</span>
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

          {/* ── Section: Amenities ── */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
            <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
              <Zap size={18} className="text-secondary" /> Amenities
            </h3>
            <p className="text-[13px] text-slate-500 -mt-2">Select all that apply to your hostel.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {AMENITIES.map(({ id, label, icon: Icon }) => {
                const isSelected = selectedAmenities.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleAmenity(id)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-[13px] font-medium transition-all duration-200 cursor-pointer ${isSelected
                      ? 'bg-secondary/10 border-secondary/30 text-secondary'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="flex items-center justify-end gap-8 pt-4 pb-12">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 rounded-xl text-[14px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="px-8 py-3.5 rounded-xl font-bold text-white bg-secondary hover:brightness-110 transition-all duration-200 active:scale-[0.98] flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-[14px] shadow-md shadow-secondary/15 cursor-pointer"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Uploading...
                </>
              ) : (
                'Publish Listing'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
