import React, { ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'staggered';
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  threshold = 0.1,
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold,
    delay,
    triggerOnce: true,
  });

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out`;
    const durationClass = `duration-${duration}`;
    
    switch (animation) {
      case 'fadeIn':
        return cn(
          baseClasses,
          durationClass,
          isVisible ? 'opacity-100' : 'opacity-0'
        );
      case 'slideUp':
        return cn(
          baseClasses,
          durationClass,
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        );
      case 'slideLeft':
        return cn(
          baseClasses,
          durationClass,
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        );
      case 'slideRight':
        return cn(
          baseClasses,
          durationClass,
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        );
      case 'scaleIn':
        return cn(
          baseClasses,
          durationClass,
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        );
      default:
        return cn(
          baseClasses,
          durationClass,
          isVisible ? 'opacity-100' : 'opacity-0'
        );
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(getAnimationClasses(), className)}
    >
      {children}
    </div>
  );
};