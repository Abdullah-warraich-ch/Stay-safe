import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import Hostel from '@/models/Hostel';
import User from '@/models/User';
import cloudinary from '@/lib/cloudinary';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { slug: id };

    const hostel = await Hostel.findOne(query).populate('owner', 'name email phone');

    if (!hostel) {
      return NextResponse.json(
        { success: false, error: 'Hostel not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: hostel });
  } catch (error) {
    console.error('Fetch hostel detail error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hostel details' },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');
    if (!userCookie) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const user = JSON.parse(userCookie.value);
    const userId = user.id || user._id;

    const hostel = await Hostel.findById(id);

    if (!hostel) {
      return NextResponse.json(
        { success: false, error: 'Hostel not found' },
        { status: 404 }
      );
    }

    if (hostel.owner.toString() !== userId) {
      return NextResponse.json({ success: false, error: 'Forbidden. You do not own this listing.' }, { status: 403 });
    }

    await Hostel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      data: hostel,
      message: 'Hostel deleted successfully',
    });
  } catch (error) {
    console.error('Delete hostel error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete hostel' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');
    if (!userCookie) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const user = JSON.parse(userCookie.value);
    const userId = user.id || user._id;

    const existingHostel = await Hostel.findById(id);
    if (!existingHostel) {
      return NextResponse.json({ success: false, error: 'Hostel not found' }, { status: 404 });
    }

    if (existingHostel.owner.toString() !== userId) {
      return NextResponse.json({ success: false, error: 'Forbidden. You do not own this listing.' }, { status: 403 });
    }
    
    const formData = await req.formData();
    
    const updateData = {};
    if (formData.has('name')) updateData.name = formData.get('name');
    if (formData.has('description')) updateData.description = formData.get('description');
    if (formData.has('city')) updateData.city = formData.get('city');
    if (formData.has('area')) updateData.area = formData.get('area');
    if (formData.has('address')) updateData.address = formData.get('address');
    if (formData.has('hostelType')) updateData.hostelType = formData.get('hostelType');
    if (formData.has('phone')) updateData.phone = formData.get('phone');
    if (formData.has('backupLight')) updateData.backupLight = formData.get('backupLight');
    if (formData.has('wifi')) updateData.wifi = formData.get('wifi');
    if (formData.has('acType')) updateData.acType = formData.get('acType');
    if (formData.has('attachedBath')) updateData.attachedBath = formData.get('attachedBath');
    
    if (formData.has('capacity')) updateData.capacity = JSON.parse(formData.get('capacity'));
    if (formData.has('amenities')) updateData.amenities = JSON.parse(formData.get('amenities'));
    if (formData.has('nearbyUniversities')) updateData.nearbyUniversities = JSON.parse(formData.get('nearbyUniversities'));
    if (formData.has('mess')) updateData.mess = JSON.parse(formData.get('mess'));
    if (formData.has('tags')) updateData.tags = JSON.parse(formData.get('tags'));
    
    if (updateData.capacity && updateData.capacity.length > 0) {
      updateData.price = Math.min(...updateData.capacity.map(c => c.price));
    }

    // ── Handle images ──
    // existingImages = JSON array of { url, publicId } objects the user chose to keep
    const existingImages = formData.has('existingImages')
      ? JSON.parse(formData.get('existingImages'))
      : null;

    // New image files uploaded by the user
    const newImageFiles = formData.getAll('images').filter(f => f && typeof f !== 'string' && f.size > 0);

    if (existingImages !== null || newImageFiles.length > 0) {
      const keptImages = existingImages || [];

      // Upload new images to Cloudinary
      const uploadedImages = [];
      for (const file of newImageFiles) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'stay-safe/hostels',
              resource_type: 'image',
              transformation: [
                { width: 1200, height: 800, crop: 'fill', quality: 'auto', fetch_format: 'auto' },
                { overlay: 'text:Arial_100_bold:Stay%20Safe', color: "white", opacity: 20, gravity: "center" }
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

      updateData.images = [...keptImages, ...uploadedImages];
    }

    const hostel = await Hostel.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!hostel) {
      return NextResponse.json({ success: false, error: 'Hostel not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: hostel });
  } catch (error) {
    console.error('Update hostel error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update hostel' }, { status: 500 });
  }
}

