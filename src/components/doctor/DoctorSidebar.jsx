import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Calendar, Video, User, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DoctorSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, logout } = useAuth();
  
  const navItems = [
    {
      title: "Dashboard",
      href: "/doctor/dashboard",
      icon: Home,
    },
    {
      title: "Appointments",
      href: "/doctor/appointments",
      icon: Calendar,
    },
    {
      title: "Home Visits",
      href: "/doctor/home-visits",
      icon: Home,
    },
    {
      title: "Telehealth",
      href: "/doctor/telehealth",
      icon: Video,
    },
    {
      title: "Settings",
      href: "/doctor/settings",
      icon: Settings,
    },
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  if (!user) return null;

  return (
    <div className="hidden md:flex flex-col h-screen w-64 bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-6 border-b">
        <Link to="/doctor/dashboard" className="flex items-center gap-2 font-semibold text-lg">
          <span className="text-primary">HealthConnect</span>
        </Link>
      </div>
      
      {user && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback className="bg-primary text-white">
                  {getInitials(user.name)}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Main Menu
        </p>
        <nav className="space-y-1 mt-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 font-normal",
                pathname === item.href && "bg-primary/10 text-primary font-medium"
              )}
              asChild
            >
              <Link to={item.href}>
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
        
        <div className="pt-6 mt-6 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;
