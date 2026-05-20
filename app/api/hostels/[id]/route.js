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

