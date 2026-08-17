import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RoleBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  role?: 'Admin' | 'User' | string;
}

export function RoleBadge({ role, className, ...props }: RoleBadgeProps) {
  const isAdmin = role === 'Admin';

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md px-2.5 py-0.5 text-xs font-semibold border',
        isAdmin
          ? 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
          : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
        className
      )}
      {...props}
    >
      {role || 'User'}
    </span>
  );
}

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'Active' | 'Inactive' | string;
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const isActive = status === 'Active';

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md px-2.5 py-0.5 text-xs font-semibold border transition-colors',
        isActive
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
          : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
        className
      )}
      {...props}
    >
      {status || 'Active'}
    </span>
  );
}
