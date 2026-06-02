'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';
import { cities, universitiesData, citiesData } from '@/data/citiesData';
import {
  ArrowLeft, ArrowRight, Loader2, Home, MapPin, ImagePlus, Zap, Check
} from 'lucide-react';

import StepBasicInfo from '@/components/create-listing/StepBasicInfo';
import StepLocation from '@/components/create-listing/StepLocation';
import StepMedia from '@/components/create-listing/StepMedia';
import StepAmenities from '@/components/create-listing/StepAmenities';

const STEPS = [
  { id: 1, title: 'Basic Info', subtitle: 'Name, type & pricing', icon: Home },
  { id: 2, title: 'Location', subtitle: 'City, area & nearby', icon: MapPin },
  { id: 3, title: 'Media', subtitle: 'Photos & tags', icon: ImagePlus },
  { id: 4, title: 'Finalize', subtitle: 'Amenities & review', icon: Zap },
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
  const [currentStep, setCurrentStep] = useState(1);

  // ── Form State ──
  const [formData, setFormData] = useState({
    name: '', description: '', city: '', area: '', address: '', phone: '',
  });
  const [mess, setMess] = useState({ available: false, price: '', compulsory: false });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [allCities] = useState(cities);
  const [availableAreas, setAvailableAreas] = useState([]);
  const [availableUniversities, setAvailableUniversities] = useState([]);
  const [hostelType, setHostelType] = useState('boys');
  const [howManySeaters, setHowManySeaters] = useState([
    { seater: '1-Seater', price: '', active: false },
    { seater: '2-Seater', price: '', active: false },
    { seater: '3-Seater', price: '', active: false },
    { seater: '4-Seater', price: '', active: false },
    { seater: '5-Seater', price: '', active: false },
  ]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [backupLight, setBackupLight] = useState('No');
  const [acType, setAcType] = useState('Non-AC');
  const [attachedBath, setAttachedBath] = useState('No');

  // ── Handlers ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'city') {
      setAvailableAreas(citiesData[value] || []);
      setAvailableUniversities(universitiesData[value] || []);
      setFormData(prev => ({ ...prev, city: value, area: '' }));
      setSelectedUniversities([]);
    }
  };

  const toggleAmenity = (id) => {
    setSelectedAmenities(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const toggleUniversity = (name) => {
    setSelectedUniversities(prev => prev.includes(name) ? prev.filter(u => u !== name) : [...prev, name]);
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (imageFiles.length + files.length > 8) { toast.error('Maximum 8 images allowed'); return; }
    setImageFiles(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddTag = (text) => {
    const t = text.trim();
    if (t && !tags.includes(t)) {
      if (tags.length >= 8) { toast.error('Maximum 8 tags'); return; }
      setTags(prev => [...prev, t]);
    }
  };
  const handleRemoveTag = (tag) => setTags(prev => prev.filter(t => t !== tag));
  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); if (tagInput.trim()) { handleAddTag(tagInput); setTagInput(''); } }
  };

  const getSuggestedTags = () => {
    const s = [];
    const type = hostelType === 'boys' ? 'Boys' : 'Girls';
    if (formData.city) { s.push(`Hostel in ${formData.city}`, `Best Hostel in ${formData.city}`); }
    if (formData.area) { s.push(`Hostel near ${formData.area}`, `${type} Hostel near ${formData.area}`, `Cheap Hostel in ${formData.area}`); }
    selectedUniversities.forEach(u => { const n = u.split('(')[0].trim(); s.push(`Hostel near ${n}`, `${type} Hostel near ${n}`); });
    return s.filter(x => !tags.includes(x));
  };

  // ── Validation ──
  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.name.trim()) { toast.error('Enter hostel name'); return false; }
      if (!formData.description.trim()) { toast.error('Enter description'); return false; }
      if (!formData.phone.trim()) { toast.error('Enter contact number'); return false; }
      const active = howManySeaters.filter(s => s.active);
      if (active.length === 0) { toast.error('Select at least one room type'); return false; }
      const missing = active.find(s => !s.price || Number(s.price) <= 0);
      if (missing) { toast.error(`Set price for ${missing.seater}`); return false; }
    }
    if (step === 2) {
      if (!formData.city) { toast.error('Select a city'); return false; }
      if (!formData.area) { toast.error('Select an area'); return false; }
      if (!formData.address.trim()) { toast.error('Enter full address'); return false; }
    }
    if (step === 3) {
      if (imageFiles.length < 2) { toast.error('Upload at least 2 photos'); return false; }
    }
    return true;
  };

  const goNext = () => { if (validateStep(currentStep)) setCurrentStep(prev => Math.min(prev + 1, 4)); };
  const goBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // ── Submit ──
  const createMutation = useMutation({
    mutationFn: async () => {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('city', formData.city);
      data.append('area', formData.area);
      data.append('address', formData.address);
      data.append('hostelType', hostelType);
      data.append('phone', formData.phone);
      data.append('capacity', JSON.stringify(howManySeaters.filter(s => s.active).map(s => ({ seater: s.seater, price: Number(s.price) }))));
      data.append('mess', JSON.stringify({ ...mess, price: Number(mess.price) || 0 }));
      data.append('ownerId', user.id);
      data.append('amenities', JSON.stringify(selectedAmenities));
      data.append('nearbyUniversities', JSON.stringify(selectedUniversities));
      data.append('tags', JSON.stringify(tags));
      data.append('backupLight', backupLight);
      data.append('wifi', selectedAmenities.includes('wifi') ? 'Yes' : 'No');
      data.append('acType', acType);
      data.append('attachedBath', attachedBath);
      imageFiles.forEach(f => data.append('images', f));
      const res = await fetch('/api/hostels', { method: 'POST', body: data });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to create listing');
      return result;
    },
    onSuccess: () => { toast.success('Hostel listed successfully!'); router.push('/dashboard'); },
    onError: (err) => { toast.error(err.message); },
  });

  const handleSubmit = () => {
    if (!validateStep(4)) return;
    createMutation.mutate();
  };

  // ── Step Progress ──
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen pb-px bg-white">
      {/* ── Header ── */}
      <div className="sticky top-0 z-30 bg-white px-15 py-5">
        <h1 className="text-2xl font-semibold text-secondary"><span className="text-primary">Stay Safe</span><span className="text-secondary">.</span></h1>
      </div>

      {/* ── Stepper ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        {/* Progress Bar */}
        <div className="relative h-1 bg-slate-100 rounded-full mb-6 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-secondary to-secondary/80 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isDone = currentStep > step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => { if (isDone) setCurrentStep(step.id); }}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 group ${isDone ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-secondary text-white shadow-lg shadow-secondary/25 scale-110'
                  : isDone ? 'bg-secondary/10 text-secondary'
                    : 'bg-slate-100 text-slate-400'
                  }`}>
                  {isDone ? <Check size={18} strokeWidth={3} /> : <Icon size={18} />}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors hidden sm:block ${isActive ? 'text-secondary' : isDone ? 'text-secondary/60' : 'text-slate-400'
                  }`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Step Content ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Step Title */}
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {STEPS[currentStep - 1].title}
          </h2>
          <p className="text-slate-500 text-[13px] mt-0.5">{STEPS[currentStep - 1].subtitle}</p>
        </div>

        {/* White Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-7">
          {currentStep === 1 && (
            <StepBasicInfo
              formData={formData} handleChange={handleChange}
              hostelType={hostelType} setHostelType={setHostelType}
              howManySeaters={howManySeaters} setHowManySeaters={setHowManySeaters}
              mess={mess} setMess={setMess}
            />
          )}
          {currentStep === 2 && (
            <StepLocation
              formData={formData} handleChange={handleChange}
              allCities={allCities} availableAreas={availableAreas}
              availableUniversities={availableUniversities}
              selectedUniversities={selectedUniversities} toggleUniversity={toggleUniversity}
            />
          )}
          {currentStep === 3 && (
            <StepMedia
              imageFiles={imageFiles} imagePreviews={imagePreviews}
              handleImageSelect={handleImageSelect} removeImage={removeImage}
              tags={tags} tagInput={tagInput} setTagInput={setTagInput}
              handleAddTag={handleAddTag} handleRemoveTag={handleRemoveTag}
              handleTagInputKeyDown={handleTagInputKeyDown} getSuggestedTags={getSuggestedTags}
            />
          )}
          {currentStep === 4 && (
            <StepAmenities
              selectedAmenities={selectedAmenities} toggleAmenity={toggleAmenity}
              formData={formData} hostelType={hostelType} howManySeaters={howManySeaters}
              mess={mess} imageFiles={imageFiles} selectedUniversities={selectedUniversities} tags={tags}
              backupLight={backupLight} setBackupLight={setBackupLight}
              acType={acType} setAcType={setAcType}
              attachedBath={attachedBath} setAttachedBath={setAttachedBath}
            />
          )}
        </div>

        {/* ── Navigation Buttons ── */}
        <div className="flex items-center justify-between mt-6 pb-10">
          <button
            type="button"
            onClick={() => currentStep === 1 ? router.back() : goBack()}
            className="px-5 py-3 rounded-xl text-[13px] font-semibold text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={goNext}
              className="px-7 py-3 rounded-xl font-bold text-white bg-secondary hover:brightness-110 transition-all duration-200 active:scale-[0.97] flex items-center gap-2 text-[13px] shadow-lg shadow-secondary/20 cursor-pointer"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={createMutation.isPending}
              className="px-8 py-3.5 rounded-xl font-bold text-white bg-secondary hover:brightness-110 transition-all duration-200 active:scale-[0.97] flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-[14px] shadow-lg shadow-secondary/20 cursor-pointer"
            >
              {createMutation.isPending ? (
                <><Loader2 className="animate-spin" size={18} /> Publishing...</>
              ) : (
                <><Check size={18} /> Publish Listing</>
              )}
            </button>
          )}
        </div>
      </div>

      {/* footer */}
      <div className="sticky bottom-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => currentStep === 1 ? router.back() : goBack()} className="p-2 rounded-xl hover:bg-slate-200 text-lg font-bold text-slate-800 tracking-tight transition-colors cursor-pointer">
              Back
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">List Your Hostel</h1>
              <p className="text-[11px] text-slate-400 font-medium">Step {currentStep} of {STEPS.length}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[12px] text-slate-400 font-semibold">
            <span className="text-secondary font-bold">{Math.round(progress)}%</span> Complete
          </div>
        </div>
      </div>
    </div>
  );
}
