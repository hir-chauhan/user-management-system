import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: 'destructive' | 'default';
  icon?: React.ReactNode;
  iconType?: 'warning' | 'danger' | 'info';
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'destructive',
  icon,
  iconType = 'warning',
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-5 sm:p-6 rounded-2xl">
        <DialogHeader className="space-y-2 text-left">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                iconType === 'warning' &&
                  'bg-amber-100 text-amber-600 dark:bg-amber-950/70 dark:text-amber-400',
                iconType === 'danger' &&
                  'bg-rose-100 text-rose-600 dark:bg-rose-950/70 dark:text-rose-400',
                iconType === 'info' &&
                  'bg-blue-100 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400'
              )}
            >
              <AlertTriangle className="h-5 w-5" />
            </div>
            <DialogTitle className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-end gap-2.5 sm:gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 sm:flex-initial text-xs sm:text-sm px-4 h-9"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={variant}
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              'gap-2 flex-1 sm:flex-initial text-xs sm:text-sm px-4 h-9 font-medium shadow-xs',
              variant === 'destructive' &&
                'bg-rose-600 hover:bg-rose-700 text-white dark:bg-rose-600 dark:hover:bg-rose-700'
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : icon ? (
              icon
            ) : null}
            <span>{confirmText}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
