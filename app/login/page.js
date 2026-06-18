import AuthForm from "@/components/auth/AuthForm";
import { GuestRoute } from "@/components/layout/ProtectedRoute";

export const metadata = {
  title: 'Log In',
  description: 'Log in to your Rehloo account to manage your hostel listings, saved properties, and more.',
};

export default function LoginPage() {
  return (
    <GuestRoute>
      <AuthForm mode="login" />
    </GuestRoute>
  );
}
