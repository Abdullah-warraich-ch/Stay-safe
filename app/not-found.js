import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist. Return to Rehloo to find verified hostels in Pakistan.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-9xl font-bold text-primary animate-pulse">404</h1>
        <h2 className="text-3xl font-semibold text-slate-900">Oops! Page not found</h2>
        <p className="text-slate-500 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
