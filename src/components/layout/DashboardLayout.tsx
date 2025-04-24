
import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  Menu,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { mockUsers } from "@/data/mockData";

const DashboardLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // For demo purposes, we'll use the jobseeker user
  const user = mockUsers[0];

  const sidebarLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      label: "My Applications",
      href: "/dashboard/applications",
      icon: FileText,
    },
    {
      label: "Saved Jobs",
      href: "/dashboard/saved-jobs",
      icon: Briefcase,
    },
  ];
  
  const employerLinks = [
    {
      label: "Dashboard",
      href: "/employer",
      icon: Home,
    },
    {
      label: "Profile",
      href: "/employer/profile",
      icon: User,
    },
    {
      label: "Job Listings",
      href: "/employer/jobs",
      icon: Briefcase,
    },
    {
      label: "Applications",
      href: "/employer/applications",
      icon: FileText,
    },
    {
      label: "Candidates",
      href: "/employer/candidates",
      icon: Users,
    },
  ];
  
  const adminLinks = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: Home,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      label: "Jobs",
      href: "/admin/jobs",
      icon: Briefcase,
    },
    {
      label: "Reports",
      href: "/admin/reports",
      icon: FileText,
    },
  ];

  const links = user.role === "employer" 
    ? employerLinks 
    : user.role === "admin" 
    ? adminLinks 
    : sidebarLinks;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 h-16 border-b bg-background flex items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-brand-blue">
              Talent<span className="text-brand-indigo">Reach</span>
            </span>
          </Link>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
              {user.name.charAt(0)}
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
            </div>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar (Desktop) */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 border-r bg-background pt-16 transition-transform duration-300 ease-in-out md:static md:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-6 space-y-4">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                    location.pathname === link.href &&
                      "bg-primary/10 text-primary font-medium"
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link to="/logout">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </Button>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
