import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  iconClassName?: string;
  descriptionClassName?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName = 'text-muted-foreground',
  descriptionClassName = 'text-muted-foreground',
  className,
}: StatCardProps) {
  return (
    <Card className={cn('hover:shadow-xs transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-4 pb-1 sm:pb-2 gap-1">
        <CardTitle className="text-[11px] sm:text-xs font-medium text-muted-foreground truncate">
          {title}
        </CardTitle>
        <Icon className={cn('h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0', iconClassName)} />
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
        <div className="text-xl sm:text-2xl font-bold tracking-tight">{value}</div>
        {description && (
          <p className={cn('text-[10px] sm:text-[11px] mt-0.5 truncate', descriptionClassName)}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
