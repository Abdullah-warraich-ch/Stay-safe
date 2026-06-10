import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Hostel from '@/models/Hostel';
import User from '@/models/User';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const hostel = await Hostel.findById(id).populate('owner', 'name email phone');

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

    const hostel = await Hostel.findByIdAndDelete(id);

    if (!hostel) {
      return NextResponse.json(
        { success: false, error: 'Hostel not found' },
        { status: 404 }
      );
    }

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
    
    // For minimum code and easier form handling, we can accept JSON instead of FormData for updates if we are not updating images,
    // OR we can just use the same FormData. Since CreateListing uses FormData, let's parse it.
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

