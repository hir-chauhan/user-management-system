import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RoleBadge, StatusBadge } from '@/components/common/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from '../types';
import { Mail, Phone, ShieldCheck, Calendar, Hash, CheckCircle2 } from 'lucide-react';

interface UserViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

export function UserViewDialog({
  open,
  onOpenChange,
  user,
}: UserViewDialogProps) {

  if (!user) return null;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const getInitials = (first: string, last: string) => {
    return `${(first || 'U')[0]}${(last || 'S')[0]}`.toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">User Details</DialogTitle>
          <DialogDescription>
            Detailed information about this user account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-1">
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border">
            <Avatar className="h-12 w-12 border-2 border-primary/20 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-base">
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold truncate">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <RoleBadge role={user.role} />
                <StatusBadge status={user.status} />
              </div>
            </div>
          </div>

         
          <div className="grid grid-cols-1 gap-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between p-2.5 rounded-md bg-muted/20 border gap-2">
              <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                <Hash className="h-3.5 w-3.5" />
                <span>User ID</span>
              </div>
              <span className="font-mono text-[11px] text-foreground select-all truncate">
                {user._id}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-md bg-muted/20 border gap-2">
              <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                <Mail className="h-3.5 w-3.5" />
                <span>Email</span>
              </div>
              <span className="font-medium text-foreground truncate">{user.email}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-md bg-muted/20 border gap-2">
              <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                <Phone className="h-3.5 w-3.5" />
                <span>Phone</span>
              </div>
              <span className="font-medium text-foreground truncate">
                {user.phone || 'Not provided'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-md bg-muted/20 border gap-2">
              <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Role</span>
              </div>
              <span className="font-medium text-foreground">{user.role}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-md bg-muted/20 border gap-2">
              <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Status</span>
              </div>
              <span className="font-medium text-foreground">{user.status}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-md bg-muted/20 border gap-2">
              <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                <Calendar className="h-3.5 w-3.5" />
                <span>Created At</span>
              </div>
              <span className="font-medium text-foreground text-[11px] sm:text-xs">
                {formatDate(user.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
