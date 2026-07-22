import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, type Role } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  requireRole,
}: {
  children: ReactNode;
  requireRole?: Role;
}) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-teal-400" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  // admin can access everything; editor only where allowed
  if (requireRole === "admin" && role !== "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
