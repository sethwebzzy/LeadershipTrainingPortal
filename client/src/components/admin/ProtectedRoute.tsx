import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}