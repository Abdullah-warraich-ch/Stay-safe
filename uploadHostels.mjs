import fs from 'fs';
import mongoose from 'mongoose';
import Hostel from './models/Hostel.js';
import { citiesData } from './data/citiesData.js';

// Configuration
const MONGO_URI = "mongodb+srv://staysafefindahostel:%40bduII%40h%402%40%402@cluster0.8emy4xq.mongodb.net/stay-safe?appName=Cluster0";
const OWNER_ID = '6a031918f05706bfbe410011';
const CITIES_FILE_PATH = './data/citiesData.js';

const inputFile = process.argv[2];
if (!inputFile) {
  console.error("❌ Please provide a JSON file path.");
  console.error("Usage: node uploadHostels.mjs <path-to-scraped-data.json>");
  process.exit(1);
}

async function uploadData() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB.");

    // 2. Read Input Data
    const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    console.log(`📦 Found ${data.length} records to process.`);
    
    const newAreas = {};
    
    // 3. Normalize Data & Prepare for SEO
    const normalizedData = data.map(hostel => {
      const city = hostel.city;
      const area = hostel.area;
      
      // A. Track missing areas
      if (!citiesData[city] || !citiesData[city].includes(area)) {
        if (!newAreas[city]) newAreas[city] = new Set();
        newAreas[city].add(area);
      }

      // B. SEO Optimizations
      // Generate rich tags for search index
      const seoTags = [
        hostel.hostelType,
        area,
        city,
        `${hostel.hostelType} hostel in ${area}`,
        `hostel near ${area}`,
        "affordable",
        "student accommodation"
      ];

      // Generate SEO friendly description if missing or short
      let description = hostel.description;
      if (!description || description.length < 50) {
        description = `Looking for a comfortable ${hostel.hostelType} hostel in ${area}, ${city}? ${hostel.name} offers premium facilities, high-speed WiFi, and 24/7 security. Perfect for students and professionals looking for affordable accommodation in ${city}.`;
      }

      // C. Normalize capacities (Room Types)
      const basePrice = hostel.price || 15000;
      const capacity = hostel.capacity && hostel.capacity.length > 0 ? hostel.capacity : [
        { seater: "1 Seater", price: basePrice + 5000 },
        { seater: "2 Seater", price: basePrice + 2000 },
        { seater: "3 Seater", price: basePrice },
        { seater: "4 Seater", price: basePrice - 2000 > 0 ? basePrice - 2000 : basePrice }
      ];

      // D. Normalize Amenities
      const amenities = hostel.amenities && hostel.amenities.length > 0 ? hostel.amenities : [
        "High-Speed WiFi", "Laundry", "24/7 Security", "Daily Cleaning", "Backup Generator", "Filtered Water", "Geyser"
      ];

      return {
        ...hostel,
        owner: OWNER_ID,
        description: description,
        tags: Array.from(new Set([...(hostel.tags || []), ...seoTags])), // Merge existing with new
        capacity: capacity,
        amenities: amenities,
        wifi: hostel.wifi || 'Yes',
        acType: hostel.acType || 'Non-AC',
        backupLight: hostel.backupLight || 'Yes',
        attachedBath: hostel.attachedBath || 'Yes',
        phone: hostel.phone && hostel.phone !== "Not available" ? hostel.phone : "N/A",
      };
    });

    // 4. Inject Missing Areas into citiesData.js
    const citiesToUpdate = Object.keys(newAreas);
    if (citiesToUpdate.length > 0) {
      console.log(`🗺️  Found missing areas for: ${citiesToUpdate.join(', ')}. Updating citiesData.js...`);
      
      let citiesFileContent = fs.readFileSync(CITIES_FILE_PATH, 'utf8');
      
      for (const city of citiesToUpdate) {
        const addedAreas = Array.from(newAreas[city]);
        
        // Build the string to inject: 'Area 1', 'Area 2'
        const areasString = addedAreas.map(a => `'${a}'`).join(', ');

        // Regex to find the end of the specific city array and inject new areas before ].sort()
        // It looks for the city name, then any content until it hits ].sort()
        const regex = new RegExp(`('${city}'|"${city}")\\s*:\\s*\\[([\\s\\S]*?)\\]\\.sort\\(\\)`);
        
        citiesFileContent = citiesFileContent.replace(regex, (match, p1, p2) => {
          // If the array is not empty, ensure we add a comma before our new areas
          const separator = p2.trim().length > 0 && !p2.trim().endsWith(',') ? ',' : '';
          return `${p1}: [${p2}${separator}\n    ${areasString}\n  ].sort()`;
        });
      }

      fs.writeFileSync(CITIES_FILE_PATH, citiesFileContent, 'utf8');
      console.log("✅ Successfully injected missing areas into citiesData.js");
    } else {
      console.log("🗺️  No missing areas found. citiesData.js is up to date.");
    }

    // 5. Insert or Update into MongoDB
    console.log("💾 Saving data to MongoDB...");
    const bulkOps = normalizedData.map(hostel => {
      // Remove any _id that might have come from the JSON to avoid immutable field errors on update
      const { _id, ...hostelData } = hostel;
      return {
        updateOne: {
          filter: { name: hostel.name, city: hostel.city, area: hostel.area },
          update: { $set: hostelData },
          upsert: true
        }
      };
    });
    
    const result = await Hostel.bulkWrite(bulkOps);
    console.log(`✅ Database synced successfully!`);
    console.log(`   - New Hostels Added: ${result.upsertedCount}`);
    console.log(`   - Existing Hostels Updated: ${result.modifiedCount}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error processing upload:", error);
    process.exit(1);
  }
}

uploadData();
