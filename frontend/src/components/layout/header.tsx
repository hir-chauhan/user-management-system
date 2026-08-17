import { useState } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { ThemeSwitch } from '@/components/ui/theme-switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { RoleBadge } from '@/components/common/badge';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { LogOut, User as UserIcon } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useNavigate } from '@tanstack/react-router';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = 'User Management', subtitle }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false);
    logout();
    navigate({ to: '/login' });
  };

  const getInitials = (first?: string, last?: string) => {
    return `${(first || 'U')[0]}${(last || 'S')[0]}`.toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 backdrop-blur px-3 sm:px-6">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <SidebarTrigger className="-ml-1 shrink-0" />
        <div className="min-w-0">
          <h1 className="text-base sm:text-xl font-bold tracking-tight text-foreground truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground hidden sm:block truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>

    
      <div className="flex items-center gap-3">
        <ThemeSwitch />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full ring-1 ring-border hover:ring-primary"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                  {getInitials(user?.firstName, user?.lastName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
                <div className="pt-1.5">
                  <RoleBadge role={user?.role} className="text-[10px]" />
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive cursor-pointer gap-2"
              onClick={() => setLogoutDialogOpen(true)}
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

  
      <ConfirmDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        title="Confirm Logout"
        description="Are you sure you want to log out? You'll need to sign in again to access your account."
        confirmText="Log out"
        cancelText="Cancel"
        variant="destructive"
        icon={<LogOut className="h-4 w-4" />}
        iconType="warning"
        onConfirm={handleConfirmLogout}
      />
    </header>
  );
}
