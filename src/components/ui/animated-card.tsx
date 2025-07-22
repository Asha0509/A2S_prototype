
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  hover = true,
  onClick
}) => {
  return (
    <Card
      className={cn(
        "transition-all duration-300 cursor-pointer",
        hover && "hover:scale-105 hover:shadow-lg transform",
        "animate-fade-in",
        onClick && "active:scale-95",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};

export { CardContent, CardHeader };
