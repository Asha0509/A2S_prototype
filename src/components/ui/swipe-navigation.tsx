import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SwipeNavigationProps {
  children: React.ReactNode[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
  autoSwipe?: boolean;
  swipeThreshold?: number;
}

export const SwipeNavigation: React.FC<SwipeNavigationProps> = ({
  children,
  currentIndex,
  onIndexChange,
  className,
  showDots = true,
  showArrows = false,
  autoSwipe = false,
  swipeThreshold = 50
}) => {
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoSwipe) return;
    
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % children.length;
      onIndexChange(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, children.length, autoSwipe, onIndexChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDeltaX(currentX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0 && currentIndex > 0) {
        onIndexChange(currentIndex - 1);
      } else if (deltaX < 0 && currentIndex < children.length - 1) {
        onIndexChange(currentIndex + 1);
      }
    }
    
    setDeltaX(0);
    setIsDragging(false);
  };

  const handleMouseStart = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDeltaX(e.clientX - startX);
  };

  const handleMouseEnd = () => {
    if (!isDragging) return;
    
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0 && currentIndex > 0) {
        onIndexChange(currentIndex - 1);
      } else if (deltaX < 0 && currentIndex < children.length - 1) {
        onIndexChange(currentIndex + 1);
      }
    }
    
    setDeltaX(0);
    setIsDragging(false);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < children.length - 1) {
      onIndexChange(currentIndex + 1);
    }
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Navigation Container */}
      <div
        ref={containerRef}
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? deltaX : 0}px))`
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseStart}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseEnd}
        onMouseLeave={handleMouseEnd}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Arrow Navigation */}
      {showArrows && (
        <>
          <Button
            size="icon"
            variant="ghost"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm"
            onClick={goToNext}
            disabled={currentIndex === children.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </>
      )}

      {/* Dot Indicators */}
      {showDots && children.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex 
                  ? "bg-primary w-6" 
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
              )}
              onClick={() => onIndexChange(index)}
            />
          ))}
        </div>
      )}

      {/* Swipe Hint */}
      {children.length > 1 && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-muted-foreground">
            Swipe to navigate
          </div>
        </div>
      )}
    </div>
  );
};