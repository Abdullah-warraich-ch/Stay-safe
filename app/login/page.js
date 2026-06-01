import AuthForm from "@/components/AuthForm";
import { GuestRoute } from "@/components/ProtectedRoute";

export const metadata = {
  title: 'Log In',
  description: 'Log in to your Stay Safe account to manage your hostel listings, saved properties, and more.',
};

export default function LoginPage() {
  return (
    <GuestRoute>
      <AuthForm mode="login" />
    </GuestRoute>
  );
}
