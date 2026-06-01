import { ProtectedRoute } from '@/components/ProtectedRoute';
import DashboardContent from '@/components/DashboardClient';

export const metadata = {
    title: 'Dashboard',
    description: 'Manage your hostel listings, view analytics, and update your Stay Safe profile from your personal dashboard.',
};

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}