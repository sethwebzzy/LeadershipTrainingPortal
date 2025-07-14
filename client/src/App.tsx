import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminStudents from "@/pages/admin/students";
import AdminAdmissions from "@/pages/admin/admissions";
import AdminCourses from "@/pages/admin/courses";
import AdminServices from "@/pages/admin/services";
import AdminPayments from "@/pages/admin/payments";
import AdminMessages from "@/pages/admin/messages";
import AdminSettings from "@/pages/admin/settings";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard">
        <ProtectedRoute>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/students">
        <ProtectedRoute>
          <AdminLayout>
            <AdminStudents />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/admissions">
        <ProtectedRoute>
          <AdminLayout>
            <AdminAdmissions />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/courses">
        <ProtectedRoute>
          <AdminLayout>
            <AdminCourses />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/services">
        <ProtectedRoute>
          <AdminLayout>
            <AdminServices />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/payments">
        <ProtectedRoute>
          <AdminLayout>
            <AdminPayments />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/messages">
        <ProtectedRoute>
          <AdminLayout>
            <AdminMessages />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/settings">
        <ProtectedRoute>
          <AdminLayout>
            <AdminSettings />
          </AdminLayout>
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
