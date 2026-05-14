import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Hostel from '@/models/Hostel';

export async function GET(req) {
  try {
    await connectDB();
    
    // Get ownerId from query params
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get('ownerId');

    if (!ownerId) {
      return NextResponse.json(
        { success: false, error: 'Owner ID is required' },
        { status: 400 }
      );
    }

    const hostels = await Hostel.find({ owner: ownerId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: hostels });
  } catch (error) {
    console.error('Fetch my hostels error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hostels' },
      { status: 500 }
    );
  }
}
