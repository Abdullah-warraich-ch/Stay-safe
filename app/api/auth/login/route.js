import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

// @desc    Auth user & get token
// @route   POST /api/auth/login
export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
