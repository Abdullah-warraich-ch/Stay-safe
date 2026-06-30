import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/stay-safe';

const hostelSchema = new mongoose.Schema({
  area: String,
  city: String,
}, { strict: false });
const Hostel = mongoose.models.Hostel || mongoose.model('Hostel', hostelSchema);

// Clean lists
const cleanAreas = {
  'Lahore': [
    'Johar Town', 'DHA Phase 1', 'DHA Phase 2', 'DHA Phase 3', 'DHA Phase 4', 'DHA Phase 5', 'DHA Phase 6', 'DHA Phase 7', 'DHA Phase 8',
    'Model Town', 'Gulberg I', 'Gulberg II', 'Gulberg III', 'Wapda Town', 'Faisal Town', 'Garden Town', 'Township', 'Allama Iqbal Town', 
    'Bahria Town', 'EME Society', 'Canal View', 'Sabzazar', 'Samanabad', 'Thokar Niaz Baig', 'Muslim Town', 'Raiwind Road', 
    'Tariq Garden', 'NFC Town', 'Valencia Town', 'Shadman', 'Ichhra', 'Baghban Pura', 'Mughal Pura', 'Cavalry Ground', 'Paragon City', 'Other'
  ],
  'Islamabad': [
    'Sector F-6', 'Sector F-7', 'Sector F-8', 'Sector F-10', 'Sector F-11', 
    'Sector G-6', 'Sector G-7', 'Sector G-8', 'Sector G-9', 'Sector G-10', 'Sector G-11', 'Sector G-13', 'Sector G-14',
    'Sector I-8', 'Sector I-9', 'Sector I-10', 'Sector I-11', 
    'Sector H-8', 'Sector H-11', 'Sector H-12', 'Sector H-13', 
    'Sector E-11', 'Sector D-12', 'Bahria Town', 'DHA Phase 1', 'DHA Phase 2', 'Bani Gala', 'PWD', 'Gulberg Greens', 'Other'
  ],
  'Rawalpindi': [
    'Saddar', 'Bahria Town Phase 1-6', 'Bahria Town Phase 7-8', 'Satellite Town',
    'Westridge', 'Chaklala Scheme 1', 'Chaklala Scheme 2', 'Chaklala Scheme 3', 
    'Askari (1-14)', 'Adiala Road', 'PWD', 'Commercial Market', '6th Road', 'Gulrez', 'Tench Bhata', 'Shamsabad', 'Other'
  ],
  'Karachi': [
    'DHA', 'Clifton', 'Gulshan-e-Iqbal', 'PECHS', 'Tariq Road', 'North Nazimabad', 'Saddar', 'Bahria Town Karachi', 
    'Korangi', 'Landhi', 'Malir', 'Nazimabad', 'Gulistan-e-Johar', 'Federal B Area', 'Other'
  ]
};

// Heuristics mapping
const heuristics = [
  { keywords: ['lums', 'defence', 'dha'], mapTo: 'DHA Phase 1', city: 'Lahore' }, // Defaulting DHA to Phase 1 for vague ones
  { keywords: ['ucp', 'johar', 'expo'], mapTo: 'Johar Town', city: 'Lahore' },
  { keywords: ['umt', 'township'], mapTo: 'Township', city: 'Lahore' },
  { keywords: ['barkat', 'garden', 'jevan', 'hana'], mapTo: 'Garden Town', city: 'Lahore' },
  { keywords: ['wapda'], mapTo: 'Wapda Town', city: 'Lahore' },
  { keywords: ['model'], mapTo: 'Model Town', city: 'Lahore' },
  { keywords: ['gulberg', 'mm alam', 'qaddafi'], mapTo: 'Gulberg III', city: 'Lahore' },
  { keywords: ['faisal', 'airline', 'revenue'], mapTo: 'Faisal Town', city: 'Lahore' },
  { keywords: ['muslim', 'wahdat', 'faiz'], mapTo: 'Muslim Town', city: 'Lahore' },
  { keywords: ['iqbal town', 'allama'], mapTo: 'Allama Iqbal Town', city: 'Lahore' },
  { keywords: ['valencia'], mapTo: 'Valencia Town', city: 'Lahore' },
  { keywords: ['bahria'], mapTo: 'Bahria Town', city: 'Lahore' },
  { keywords: ['raiwind', 'lake city'], mapTo: 'Raiwind Road', city: 'Lahore' },
  
  // Islamabad
  { keywords: ['i-8', 'faizabad', 'metro'], mapTo: 'Sector I-8', city: 'Islamabad' },
  { keywords: ['g-9', 'karachi company'], mapTo: 'Sector G-9', city: 'Islamabad' },
  { keywords: ['nust', 'h-12'], mapTo: 'Sector H-12', city: 'Islamabad' },
  { keywords: ['f-8'], mapTo: 'Sector F-8', city: 'Islamabad' },
  
  // Rawalpindi
  { keywords: ['satellite', 'commercial', '6th road', '7th road'], mapTo: 'Satellite Town', city: 'Rawalpindi' },
  { keywords: ['bahria'], mapTo: 'Bahria Town Phase 1-6', city: 'Rawalpindi' },
  { keywords: ['saddar', 'cantt'], mapTo: 'Saddar', city: 'Rawalpindi' },
];

function getCleanArea(area, city) {
  const cityCleanList = cleanAreas[city];
  if (!cityCleanList) return 'Other';
  
  // 1. Exact match check
  if (cityCleanList.includes(area)) return area;
  
  // 2. Case-insensitive exact match
  const lowerArea = area.toLowerCase();
  const matched = cityCleanList.find(c => c.toLowerCase() === lowerArea);
  if (matched) return matched;
  
  // 3. Apply Heuristics
  for (const h of heuristics) {
    if (h.city === city) {
      if (h.keywords.some(kw => lowerArea.includes(kw))) {
        return h.mapTo;
      }
    }
  }
  
  return 'Other';
}

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const hostels = await Hostel.find({});
    console.log(`Found ${hostels.length} hostels.`);

    let updatedCount = 0;

    for (const hostel of hostels) {
      if (hostel.area && hostel.city) {
        const cleanArea = getCleanArea(hostel.area, hostel.city);
        
        if (cleanArea !== hostel.area) {
          console.log(`[${hostel.city}] Updating: "${hostel.area}" -> "${cleanArea}"`);
          hostel.area = cleanArea;
          await hostel.save();
          updatedCount++;
        }
      }
    }

    console.log(`Finished. Updated ${updatedCount} hostels.`);
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

run();
