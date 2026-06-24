'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import toast from 'react-hot-toast';
import { cities, universitiesData, citiesData } from '@/data/citiesData';
import {
  ArrowRight, Loader2, Home, MapPin, ImagePlus, Zap, Check, FileText, Phone, Bed, Utensils
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import StepLocation from '@/components/dashboard/create-listing/StepLocation';
import StepMedia from '@/components/dashboard/create-listing/StepMedia';
import StepAmenities from '@/components/dashboard/create-listing/StepAmenities';
import StepTitle from '@/components/dashboard/create-listing/StepTitle';
import StepDescription from '@/components/dashboard/create-listing/StepDescription';
import StepContact from '@/components/dashboard/create-listing/StepContact';
import StepRooms from '@/components/dashboard/create-listing/StepRooms';
import StepMess from '@/components/dashboard/create-listing/StepMess';

const STEPS = [
  { id: 1, title: 'Hostel Name', subtitle: 'Name and hostel type', icon: Home },
  { id: 2, title: 'Description', subtitle: 'Explain your hostel', icon: FileText },
  { id: 3, title: 'Contact', subtitle: 'Phone number for students', icon: Phone },
  { id: 4, title: 'Rooms', subtitle: 'Room types and pricing', icon: Bed },
  { id: 5, title: 'Mess', subtitle: 'Food service details', icon: Utensils },
  { id: 6, title: 'Location', subtitle: 'City, area and nearby', icon: MapPin },
  { id: 7, title: 'Media', subtitle: 'Photos and tags', icon: ImagePlus },
  { id: 8, title: 'Finalize', subtitle: 'Amenities and review', icon: Zap },
];

export default function CreateListingPage() {
  return (
    <ProtectedRoute>
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <CreateListingContent />
      </React.Suspense>
    </ProtectedRoute>
  );
}

function CreateListingContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState('next');

  const slideVariants = {
    enter: (dir) => ({
      x: dir === 'next' ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir === 'next' ? -20 : 20,
      opacity: 0,
    }),
  };

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

  React.useEffect(() => {
    if (id) {
      fetch(`/api/hostels/${id}`).then(res => res.json()).then(res => {
        if (res.success) {
          const h = res.data;
          setFormData({ name: h.name, description: h.description, city: h.city, area: h.area, address: h.address, phone: h.phone });
          setHostelType(h.hostelType);
          setAvailableAreas(citiesData[h.city] || []);
          setAvailableUniversities(universitiesData[h.city] || []);
          setMess(h.mess || { available: false, price: '', compulsory: false });
          setSelectedAmenities(h.amenities || []);
          setSelectedUniversities(h.nearbyUniversities || []);
          setTags(h.tags || []);
          setBackupLight(h.backupLight || 'No');
          setAcType(h.acType || 'Non-AC');
          setAttachedBath(h.attachedBath || 'No');
          if (h.capacity) {
            setHowManySeaters(prev => prev.map(p => {
               const found = h.capacity.find(c => c.seater === p.seater);
               return found ? { ...p, active: true, price: found.price } : p;
            }));
          }
          if (h.images) {
            setImagePreviews(h.images.map(img => img.url));
          }
        }
      });
    }
  }, [id]);

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
    console.log("HandleImage",imageFiles);
    
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    console.log("RemoveImage",imageFiles);
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
    }
    if (step === 2) {
      if (!formData.description.trim()) { toast.error('Enter description'); return false; }
    }
    if (step === 3) {
      if (!formData.phone.trim()) { toast.error('Enter contact number'); return false; }
    }
    if (step === 4) {
      const active = howManySeaters.filter(s => s.active);
      if (active.length === 0) { toast.error('Select at least one room type'); return false; }
      const missing = active.find(s => !s.price || Number(s.price) <= 0);
      if (missing) { toast.error(`Set price for ${missing.seater}`); return false; }
    }
    if (step === 5) {
      if (mess.available && (!mess.price || Number(mess.price) <= 0)) { toast.error('Enter mess price or disable mess service'); return false; }
    }
    if (step === 6) {
      if (!formData.city) { toast.error('Select a city'); return false; }
      if (!formData.area) { toast.error('Select an area'); return false; }
      if (!formData.address.trim()) { toast.error('Enter full address'); return false; }
    }
    if (step === 7) {
      if (!id && imageFiles.length < 2) { toast.error('Upload at least 2 photos'); return false; }
    }
    return true;
  };

  const goNext = () => {
    if (validateStep(currentStep)) {
      setDirection('next');
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };
  const goBack = () => {
    setDirection('back');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

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
      const url = id ? `/api/hostels/${id}` : '/api/hostels';
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, { method, body: data });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || `Failed to ${id ? 'update' : 'create'} listing`);
      return result;
    },
    onSuccess: () => { toast.success(`Hostel ${id ? 'updated' : 'listed'} successfully!`); router.push('/dashboard'); },
    onError: (err) => { toast.error(err.message); },
  });

  const handleSubmit = () => {
    for (let step = 1; step < STEPS.length; step += 1) {
      if (!validateStep(step)) {
        setDirection(step > currentStep ? 'next' : 'back');
        setCurrentStep(step);
        return;
      }
    }
    createMutation.mutate();
  };

  // ── Step Progress ──
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-dvh bg-white">
      {/* ── Header ── */}
      <div className="sticky top-0 z-30 bg-white px-15 py-5">
        <h1 className="text-2xl font-semibold text-primary"><span className="text-primary">Rehloo</span><span className="text-primary">.</span></h1>
      </div>



      {/* ── Step Content ── */}
      <div className="max-w-2xl mx-auto px-5 sm:px-6 pt-8 pb-28">


        {/* White Card */}
        <div className="bg-white  relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'tween', duration: 0.25, ease: 'easeInOut' },
                opacity: { duration: 0.2 },
              }}
            >
              {currentStep === 1 && (
                <StepTitle
                  formData={formData} handleChange={handleChange}
                  hostelType={hostelType} setHostelType={setHostelType}
                />
              )}
              {currentStep === 2 && (
                <StepDescription formData={formData} handleChange={handleChange} />
              )}
              {currentStep === 3 && (
                <StepContact formData={formData} handleChange={handleChange} />
              )}
              {currentStep === 4 && (
                <StepRooms howManySeaters={howManySeaters} setHowManySeaters={setHowManySeaters} />
              )}
              {currentStep === 5 && (
                <StepMess mess={mess} setMess={setMess} />
              )}
              {currentStep === 6 && (
                <StepLocation
                  formData={formData} handleChange={handleChange}
                  allCities={allCities} availableAreas={availableAreas}
                  availableUniversities={availableUniversities}
                  selectedUniversities={selectedUniversities} toggleUniversity={toggleUniversity}
                />
              )}
              {currentStep === 7 && (
                <StepMedia
                  imageFiles={imageFiles} imagePreviews={imagePreviews}
                  handleImageSelect={handleImageSelect} removeImage={removeImage}
                  tags={tags} tagInput={tagInput} setTagInput={setTagInput}
                  handleAddTag={handleAddTag} handleRemoveTag={handleRemoveTag}
                  handleTagInputKeyDown={handleTagInputKeyDown} getSuggestedTags={getSuggestedTags}
                />
              )}
              {currentStep === 8 && (
                <StepAmenities
                  selectedAmenities={selectedAmenities} toggleAmenity={toggleAmenity}
                  formData={formData} hostelType={hostelType} howManySeaters={howManySeaters}
                  mess={mess} imageFiles={imageFiles} selectedUniversities={selectedUniversities} tags={tags}
                  backupLight={backupLight} setBackupLight={setBackupLight}
                  acType={acType} setAcType={setAcType}
                  attachedBath={attachedBath} setAttachedBath={setAttachedBath}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>


      </div>

      {/* footer */}
      <div className="fixed inset-x-0 bottom-[-1px] z-30 bg-white">
        <div className='absolute top-0 h-[4px] bg-primary/10 w-full'></div>
        <div className={` absolute top-0 h-[4px] bg-primary rounded-r-lg transition-all duration-300 ease-in-out`} style={{ width: `${Math.ceil(progress)}%` }}></div>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => currentStep === 1 ? router.back() : goBack()} className="px-2 py-2 rounded-lg hover:bg-slate-100 text-[15px] font-semibold text-slate-900 underline underline-offset-2 transition-colors cursor-pointer">
              Back
            </button>
            {/* <div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">List Your Hostel</h1>
              <p className="text-[11px] text-slate-400 font-medium">Step {currentStep} of {STEPS.length}</p>
            </div> */}
          </div>

          <div className="flex items-center gap-1 text-[12px] text-slate-400 font-semibold">

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={goNext}
                className="px-7 py-3.5 rounded-lg font-semibold text-white bg-slate-950 hover:bg-slate-800 transition-all duration-200 active:scale-[0.98] flex items-center gap-2 text-[15px] cursor-pointer"
              >
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={createMutation.isPending}
                className="px-8 py-3.5 rounded-lg font-semibold text-white bg-slate-950 hover:bg-slate-800 transition-all duration-200 active:scale-[0.98] flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-[15px] cursor-pointer"
              >
                {createMutation.isPending ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> {id ? 'Updating...' : 'Publishing...'}</>
                ) : (
                  <><Check size={18} /> {id ? 'Update Listing' : 'Publish Listing'}</>
                )}

                
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
