'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import SearchableSelect from '@/components/SearchableSelect';
import toast from 'react-hot-toast';
import { cities, universitiesData } from '@/data/citiesData';
import { citiesData } from '@/data/citiesData';
import {
  ArrowLeft, Upload, X, ImagePlus, Loader2, MapPin,
  Building2, Phone, Users, DollarSign, FileText, Home,
  Wifi, Car, ShowerHead, Utensils, Wind, Tv, Dumbbell,
  WashingMachine, ShieldCheck, Zap, Droplets, BookOpen,
  Lock, Cigarette, PawPrint, CookingPot, Bed, Footprints, School, Tag
} from 'lucide-react';

import { FaMale, FaFemale } from "react-icons/fa";



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
    hostelType: 'boys',
    phone: '',
    capacity: '',
  });

  const [mess, setMess] = useState({
    available: false,
    price: '',
    compulsory: false
  });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [allCities, setAllCities] = useState(cities);
  const [availableAreas, setAvailableAreas] = useState([]);
  const [availableUniversities, setAvailableUniversities] = useState([]);
  const [hostelType, setHostelType] = useState("boys");
  const [howManySeaters, setHowManySeaters] = useState([
    { seater: "1-Seater", price: "", active: false },
    { seater: "2-Seater", price: "", active: false },
    { seater: "3-Seater", price: "", active: false },
    { seater: "4-Seater", price: "", active: false },
    { seater: "5-Seater", price: "", active: false },
  ]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (tagText) => {
    const trimmed = tagText.trim();
    if (trimmed && !tags.includes(trimmed)) {
      if (tags.length >= 8) {
        toast.error('Maximum 8 tags allowed');
        return;
      }
      setTags(prev => [...prev, trimmed]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(prev => prev.filter(t => t !== tagToRemove));
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tagInput.trim()) {
        handleAddTag(tagInput);
        setTagInput('');
      }
    }
  };

  const getSuggestedTags = () => {
    const suggestions = [];
    const typeLabel = hostelType === 'boys' ? 'Boys' : 'Girls';

    if (formData.city) {
      suggestions.push(`Hostel in ${formData.city}`);
      suggestions.push(`Best Hostel in ${formData.city}`);
    }

    if (formData.area) {
      suggestions.push(`Hostel near ${formData.area}`);
      suggestions.push(`${typeLabel} Hostel near ${formData.area}`);
      suggestions.push(`Cheap Hostel in ${formData.area}`);
      suggestions.push(`Luxury Hostel in ${formData.area}`);
    }

    if (selectedUniversities && selectedUniversities.length > 0) {
      selectedUniversities.forEach(uni => {
        const uniName = uni.split('(')[0].trim();
        suggestions.push(`Hostel near ${uniName}`);
        suggestions.push(`${typeLabel} Hostel near ${uniName}`);
      });
    }

    return suggestions.filter(s => !tags.includes(s));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // When city changes, update available areas and universities
    if (name === 'city') {
      if (citiesData[value]) {
        setAvailableAreas(citiesData[value]);
      }
      if (universitiesData[value]) {
        setAvailableUniversities(universitiesData[value]);
      }
      setFormData(prev => ({ ...prev, city: value, area: '' }));
      setSelectedUniversities([]); // Reset selected universities on city change
    }
  };





  const toggleAmenity = (amenityId) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(a => a !== amenityId)
        : [...prev, amenityId]
    );
  };

  const toggleUniversity = (uniName) => {
    setSelectedUniversities(prev =>
      prev.includes(uniName)
        ? prev.filter(u => u !== uniName)
        : [...prev, uniName]
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
      data.append('hostelType', hostelType);
      data.append('phone', formData.phone);
      const activeSeaters = howManySeaters.filter(s => s.active).map(s => ({
        seater: s.seater,
        price: Number(s.price)
      }));

      data.append('capacity', JSON.stringify(activeSeaters));
      data.append('mess', JSON.stringify({
        ...mess,
        price: Number(mess.price) || 0
      }));

      data.append('ownerId', user.id);
      data.append('amenities', JSON.stringify(selectedAmenities));
      data.append('nearbyUniversities', JSON.stringify(selectedUniversities));
      data.append('tags', JSON.stringify(tags));

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
      router.push('/dashboard');
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
                <div className='flex gap-3'>
                  <button
                    type="button"
                    onClick={() => setHostelType("boys")}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-all ${hostelType === "boys" ? "border-secondary bg-secondary/10 text-secondary" : "border-slate-200 bg-white text-slate-700"
                      }`}
                  >
                    <FaMale className="inline mr-2" size={18} />
                    Boys
                  </button>
                  <button
                    type="button"
                    onClick={() => setHostelType("girls")}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-all ${hostelType === "girls" ? "border-secondary bg-secondary/10 text-secondary" : "border-slate-200 bg-white text-slate-700"
                      }`}
                  >
                    <FaFemale className="inline mr-2" size={18} />
                    Girls
                  </button>
                </div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className={labelClass}>Contact Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="phone" type="tel" placeholder="+92 300 1234567" className={`${inputClass} pl-10`} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Room Type (beds)</label>
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {howManySeaters.map((item, index) => (
                    <button
                      key={item.seater}
                      type="button"
                      onClick={() => {
                        const newSeaters = [...howManySeaters];
                        newSeaters[index].active = !newSeaters[index].active;
                        setHowManySeaters(newSeaters);
                      }}
                      className={`py-2.5 px-4 rounded-xl border text-[13px] font-semibold transition-all duration-200 ${item.active
                        ? "border-secondary bg-secondary/10 text-secondary"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                    >
                      {item.seater}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {howManySeaters.filter(s => s.active).map((item, index) => (
                    <div key={item.seater} className="relative group animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                        {item.seater} Price
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-[13px]">Rs.</div>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={item.price}
                          onChange={(e) => {
                            const newSeaters = [...howManySeaters];
                            const targetIdx = howManySeaters.findIndex(s => s.seater === item.seater);
                            newSeaters[targetIdx].price = e.target.value;
                            setHowManySeaters(newSeaters);
                          }}
                          className={`${inputClass} pl-10 h-11`}
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {howManySeaters.filter(s => s.active).length === 0 && (
                  <p className="text-[12px] text-slate-400 italic">Please select at least one room type.</p>
                )}
              </div>
            </div>

            {/* ── Mess Details ── */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Utensils size={18} className="text-secondary" /> Mess Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div>
                    <p className="text-[14px] font-bold text-slate-800">Mess Available</p>
                    <p className="text-[12px] text-slate-500">Check this if your hostel provides food/mess services.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMess(prev => ({ ...prev, available: !prev.available }))}
                    className={`relative w-11 h-6 rounded-full transition-all duration-300 ${mess.available ? 'bg-secondary' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${mess.available ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                {mess.available && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-1.5">
                      <label className={labelClass}>Mess Price (Monthly)</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-[13px]">Rs.</div>
                        <input
                          type="number"
                          placeholder="4,000"
                          value={mess.price}
                          onChange={(e) => setMess(prev => ({ ...prev, price: e.target.value }))}
                          className={`${inputClass} pl-10`}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className={labelClass}>Is Mess Compulsory?</label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setMess(prev => ({ ...prev, compulsory: true }))}
                          className={`flex-1 py-2.5 rounded-xl border text-[13px] font-semibold transition-all ${mess.compulsory ? 'border-secondary bg-secondary/10 text-secondary' : 'border-slate-200 bg-white text-slate-600'}`}
                        >
                          Yes, Compulsory
                        </button>
                        <button
                          type="button"
                          onClick={() => setMess(prev => ({ ...prev, compulsory: false }))}
                          className={`flex-1 py-2.5 rounded-xl border text-[13px] font-semibold transition-all ${!mess.compulsory ? 'border-secondary bg-secondary/10 text-secondary' : 'border-slate-200 bg-white text-slate-600'}`}
                        >
                          Optional
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Section: Location ── */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
                <MapPin size={18} className="text-secondary" /> Location Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <SearchableSelect
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                options={allCities}
                placeholder="Select City"
                icon={Building2}
                required
              />
              <SearchableSelect
                label="Area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                options={availableAreas}
                placeholder="Select Area"
                icon={MapPin}
                required
                disabled={!formData.city}
              />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Full Address</label>
              <input name="address" placeholder="House #, Street, Block..." className={inputClass} onChange={handleChange} required />
            </div>
          </div>

          {/* ── Section: Universities ── */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
            <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
              <School size={18} className="text-secondary" /> Nearby Universities
            </h3>
            <p className="text-[13px] text-slate-500 -mt-2">Select the universities closest to your hostel to help students find you.</p>

            {formData.city ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 min-h-[46px] p-2 bg-slate-50 rounded-xl border border-slate-100">
                  {selectedUniversities.length > 0 ? (
                    selectedUniversities.map(uni => (
                      <span key={uni} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-white rounded-lg text-[12px] font-semibold animate-in zoom-in duration-200">
                        {uni}
                        <button type="button" onClick={() => toggleUniversity(uni)} className="hover:bg-white/20 rounded-full p-0.5 transition-colors">
                          <X size={12} />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 text-[13px] px-2 py-1.5">No universities selected yet...</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                  {availableUniversities.map(uni => {
                    const isSelected = selectedUniversities.includes(uni);
                    return (
                      <button
                        key={uni}
                        type="button"
                        onClick={() => toggleUniversity(uni)}
                        className={`flex items-center text-left px-4 py-2.5 rounded-xl border text-[12px] transition-all duration-200 ${isSelected
                          ? 'bg-secondary/10 border-secondary/30 text-secondary font-bold'
                          : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                          }`}
                      >
                        {uni}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-8 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50/50">
                <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                  <MapPin size={20} className="text-slate-400" />
                </div>
                <p className="text-[13px] font-medium text-slate-500">Please select a city first to see available universities.</p>
              </div>
            )}
          </div>

          {/* ── Section: Search Tags ── */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
                <Tag size={18} className="text-secondary" /> Search Tags & Keywords
              </h3>
              <span className="text-[12px] text-slate-400 font-medium">
                {tags.length}/8 tags added
              </span>
            </div>
            <p className="text-[13px] text-slate-500 -mt-2">
              Add keywords or phrases that make your hostel easier to find. Students can search using these terms (e.g., "Boys Hostel near barkat market").
            </p>

            <div className="space-y-4">
              {/* Tag Input Field */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    placeholder="Type a custom tag and press Enter"
                    className={inputClass}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (tagInput.trim()) {
                      handleAddTag(tagInput);
                      setTagInput('');
                    }
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>

              {/* Added Tags Display */}
              <div className="flex flex-wrap gap-2 min-h-[46px] p-2.5 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in duration-300">
                {tags.length > 0 ? (
                  tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-white rounded-lg text-[12px] font-semibold animate-in zoom-in duration-200">
                      #{tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer">
                        <X size={12} />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-[13px] px-2 py-1.5">No tags added yet. Try the smart suggestions below or type your own!</span>
                )}
              </div>

              {/* Smart Suggestions */}
              {getSuggestedTags().length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-50">
                  <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Smart Suggestions</h4>
                  <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto pr-1">
                    {getSuggestedTags().slice(0, 10).map(suggestion => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => handleAddTag(suggestion)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-100 hover:border-secondary/30 hover:bg-secondary/5 text-slate-600 hover:text-secondary rounded-lg text-[11px] font-semibold transition-all duration-200 cursor-pointer"
                      >
                        + #{suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
      </div >
    </div >
  );
}
