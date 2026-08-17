import * as React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './sidebar';
import { Header } from './header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  currentPath?: string;
}

export function DashboardLayout({
  children,
  title = 'User Management',
  subtitle = 'Manage registered users, roles, and status',
  currentPath = '/users',
}: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar currentPath={currentPath} />
      <SidebarInset className="flex flex-col min-h-screen w-full min-w-0 bg-muted/20">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full min-w-0 mx-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
