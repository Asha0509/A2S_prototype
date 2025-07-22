
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps?: string[];
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  steps,
  className
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="h-2" />
      {steps && (
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          {steps.map((step, index) => (
            <span 
              key={index}
              className={cn(
                "transition-colors duration-200",
                index < currentStep && "text-primary font-medium",
                index === currentStep - 1 && "text-foreground font-medium"
              )}
            >
              {step}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
