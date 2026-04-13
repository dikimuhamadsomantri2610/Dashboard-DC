import ProtectedRoute from "@/components/common/ProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function AppDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <DashboardLayout>{children}</DashboardLayout>
        </ProtectedRoute>
    );
}
