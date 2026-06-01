import AuthForm from "@/components/AuthForm";
import { GuestRoute } from "@/components/ProtectedRoute";

export const metadata = {
  title: 'Sign Up',
  description: 'Create a free Stay Safe account to list your hostel, save favorites, and find verified student accommodation in Pakistan.',
};

export default function SignUpPage() {
  return (
    <GuestRoute>
      <AuthForm mode="signup" />
    </GuestRoute>
  );
}
