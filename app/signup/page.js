'use client';

import AuthForm from "@/components/AuthForm";
import { GuestRoute } from "@/components/ProtectedRoute";

export default function SignUpPage() {
  return (
    <GuestRoute>
      <AuthForm mode="signup" />
    </GuestRoute>
  );
}
