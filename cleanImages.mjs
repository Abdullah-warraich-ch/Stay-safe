import mongoose from 'mongoose';
import Hostel from './models/Hostel.js';

const MONGO_URI = "mongodb+srv://staysafefindahostel:%40bduII%40h%402%40%402@cluster0.8emy4xq.mongodb.net/stay-safe?appName=Cluster0";

const isAvatar = (url) =>
  !url ||
  url.includes('w36-h36') ||
  url.includes('p-rp-mo') ||
  url.includes('/a/ACg8oc') ||
  url.includes('/a-/ALV-Uj');

async function cleanImages() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const hostels = await Hostel.find({ 'images.0': { $exists: true } });
  console.log(`📦 Checking ${hostels.length} hostels for avatar images...`);

  let cleaned = 0;
  for (const hostel of hostels) {
    const original = hostel.images.length;
    const filtered = hostel.images.filter(img => !isAvatar(img.url));
    if (filtered.length < original) {
      hostel.images = filtered;
      await hostel.save();
      console.log(`  🧹 "${hostel.name}": ${original} → ${filtered.length} images (removed ${original - filtered.length})`);
      cleaned++;
    }
  }

  console.log(`\n✅ Done! Cleaned avatar images from ${cleaned} hostel(s).`);
  process.exit(0);
}

cleanImages().catch(e => { console.error('❌ Error:', e.message); process.exit(1); });
