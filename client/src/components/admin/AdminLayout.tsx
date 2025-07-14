import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  BookOpen, 
  Heart, 
  CreditCard, 
  MessageSquare, 
  Settings,
  Menu,
  LogOut,
  User
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/students", icon: Users, label: "Students" },
  { href: "/admin/admissions", icon: UserCheck, label: "Admissions" },
  { href: "/admin/courses", icon: BookOpen, label: "Courses" },
  { href: "/admin/services", icon: Heart, label: "Services" },
  { href: "/admin/payments", icon: CreditCard, label: "Payments" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-college-dark">Leadership JOYCEP</h1>
        <p className="text-sm text-college-gray">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive 
                      ? "bg-college-green text-white hover:bg-green-600" 
                      : "text-college-gray hover:text-college-dark hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-college-green rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-college-dark">{user?.username}</p>
            <p className="text-xs text-college-gray">Administrator</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:z-50">
        <SidebarContent />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-college-dark">Leadership JOYCEP</h1>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}