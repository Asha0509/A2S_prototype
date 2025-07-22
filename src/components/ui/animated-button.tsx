
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  loading?: boolean;
  success?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  loading = false,
  success = false,
  className,
  disabled,
  ...props 
}) => {
  return (
    <Button
      className={cn(
        "transition-all duration-300 transform",
        "hover:scale-105 active:scale-95",
        "hover:shadow-lg",
        success && "bg-green-500 hover:bg-green-600",
        loading && "animate-pulse cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : success ? (
        <div className="flex items-center space-x-2">
          <span>✓</span>
          <span>Complete</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
