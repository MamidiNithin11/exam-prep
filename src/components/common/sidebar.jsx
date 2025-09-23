'use client'

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  GraduationCap, 
  Home, 
  Bookmark, 
  Search, 
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { User as UserEntity } from "@/entities/User";
import { Toaster } from 'sonner';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);

useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await UserEntity.me();
      setUser(userData);
    } catch (error) {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    await UserEntity.logout();
    window.location.href = createPageUrl("Landing");
  };

  // Don't show sidebar on landing page or if user is not logged in
  if (currentPageName === "Landing" || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster richColors />
        {children}
      </div>
    );
  }

  const navigationItems = [
    {
      title: "Dashboard",
      url: createPageUrl("Dashboard"),
      icon: Home,
    },
    {
      title: "My Bookmarks", 
      url: createPageUrl("Bookmarks"),
      icon: Bookmark,
    },
    {
      title: "Search",
      url: createPageUrl("Search"),
      icon: Search,
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Toaster richColors />
        
        <Sidebar className="w-80 bg-white border-r border-gray-200">
          {/* Header Section */}
          <SidebarHeader className="p-6 border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">ExamPrep</h2>
                <p className="text-sm text-gray-500">Genius</p>
              </div>
            </div>
          </SidebarHeader>
          
          {/* Navigation Content */}
          <SidebarContent className="px-4 py-6">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link 
                          to={item.url}
                          className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-200 ${
                            location.pathname === item.url
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium text-base">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Footer Section */}
          <SidebarFooter className="border-t border-gray-100 p-4 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.full_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {user?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <h1 className="text-lg font-bold">ExamPrep Genius</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}