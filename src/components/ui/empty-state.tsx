
import React from 'react';
import { cn } from '@/lib/utils';
import { AnimatedButton } from './animated-button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-6 text-center",
      "animate-fade-in",
      className
    )}>
      {icon && (
        <div className="mb-4 text-muted-foreground scale-150 opacity-50">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <AnimatedButton onClick={onAction}>
          {actionLabel}
        </AnimatedButton>
      )}
    </div>
  );
};
