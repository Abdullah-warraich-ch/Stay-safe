import mongoose from 'mongoose';
try { process.loadEnvFile('.env'); } catch(e) {}
import Hostel from './models/Hostel.js';
import slugify from 'slugify';

async function updateSlugs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    const hostels = await Hostel.find({ slug: { $exists: false } });
    console.log(`Found ${hostels.length} hostels without a slug.`);

    let updated = 0;
    for (const hostel of hostels) {
      let baseSlug = slugify(`${hostel.name} ${hostel.area} ${hostel.city}`, { lower: true, strict: true });
      let slug = baseSlug;
      let counter = 1;
      while (await Hostel.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      
      console.log(`Setting slug: ${slug}`);
      hostel.slug = slug;
      await hostel.save();
      updated++;
    }

    console.log(`Successfully updated ${updated} hostels with slugs.`);
    process.exit(0);
  } catch (error) {
    console.error("Error updating slugs:", error);
    process.exit(1);
  }
}

updateSlugs();
