import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import DashboardContent from '@/components/dashboard/DashboardClient';

export const metadata = {
    title: 'Dashboard',
    description: 'Manage your hostel listings, view analytics, and update your Rehloo profile from your personal dashboard.',
};

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}