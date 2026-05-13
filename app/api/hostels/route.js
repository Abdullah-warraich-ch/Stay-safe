import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Hostel from '@/models/Hostel';
import cloudinary from '@/lib/cloudinary';

// @desc    Create a new hostel listing
// @route   POST /api/hostels
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    // Extract fields
    const name = formData.get('name');
    const description = formData.get('description');
    const city = formData.get('city');
    const area = formData.get('area');
    const address = formData.get('address');
    const price = formData.get('price');
    const hostelType = formData.get('hostelType');
    const phone = formData.get('phone');
    const capacity = JSON.parse(formData.get('capacity') || '[]');
    const ownerId = formData.get('ownerId');
    const amenities = JSON.parse(formData.get('amenities') || '[]');
    const mess = JSON.parse(formData.get('mess') || '{"available":false,"price":0,"compulsory":false}');
    const location = JSON.parse(formData.get('location') || '{"lat":null,"lng":null}');

    // Get all image files
    const imageFiles = formData.getAll('images');

    // Validate minimum/maximum images
    if (!imageFiles || imageFiles.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please upload at least 2 images' },
        { status: 400 }
      );
    }
    if (imageFiles.length > 8) {
      return NextResponse.json(
        { success: false, error: 'Maximum 8 images allowed' },
        { status: 400 }
      );
    }

    // Upload images to Cloudinary
    const uploadedImages = [];

    for (const file of imageFiles) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary using a promise wrapper
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'stay-safe/hostels',
            resource_type: 'image',
            transformation: [
              { width: 1200, height: 800, crop: 'limit', quality: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      uploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    }

    // Derive display price from minimum room price
    const displayPrice = capacity.length > 0 
      ? Math.min(...capacity.map(c => c.price)) 
      : (Number(price) || 0);

    // Create hostel
    const hostel = await Hostel.create({
      name,
      description,
      city,
      area,
      address,
      price: displayPrice,
      hostelType,
      phone,
      capacity,
      mess,
      location,
      amenities,
      images: uploadedImages,
      owner: ownerId,
    });

    return NextResponse.json(
      { success: true, data: hostel },
      { status: 201 }
    );
  } catch (error) {
    console.error('Hostel creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
