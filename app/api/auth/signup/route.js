import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

// @desc    Register user
// @route   POST /api/auth/signup
export async function POST(req) {
  try {
    await connectDB();
    const { name, email, phone, password, role, city, workOrStudy } = await req.json();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
      city,
      workOrStudy
    });

    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
