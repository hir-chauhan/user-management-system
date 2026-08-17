import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Users, LayoutDashboard, Shield } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentPath?: string;
}

export function AppSidebar({ currentPath = "/users" }: SidebarProps) {
  const navigate = useNavigate();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "User Management",
      href: "/users",
      icon: Users,
    },
  ];

  return (
    <Sidebar collapsible="icon">
    
      <SidebarHeader className="h-16 border-b border-sidebar-border px-4 flex flex-row items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
          <Shield className="h-5 w-5" />
        </div>
        <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
          <h2 className="text-base font-bold tracking-tight text-sidebar-foreground">
            NexaAdmin
          </h2>
          <p className="text-xs text-muted-foreground">Admin Portal</p>
        </div>
      </SidebarHeader>

      
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => navigate({ to: item.href })}
                      tooltip={item.title}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer",
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20 font-semibold dark:bg-primary/20 dark:text-blue-400 dark:border-primary/30"
                          : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          isActive
                            ? "text-primary dark:text-blue-400"
                            : "text-muted-foreground",
                        )}
                      />
                      <span className="truncate">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export { AppSidebar as Sidebar };
