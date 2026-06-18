import AuthForm from "@/components/auth/AuthForm";
import { GuestRoute } from "@/components/layout/ProtectedRoute";

export const metadata = {
  title: 'Sign Up',
  description: 'Create a free Rehloo account to list your hostel, save favorites, and find verified student accommodation in Pakistan.',
};

export default function SignUpPage() {
  return (
    <GuestRoute>
      <AuthForm mode="signup" />
    </GuestRoute>
  );
}
