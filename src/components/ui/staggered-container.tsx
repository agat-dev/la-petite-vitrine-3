import React, { ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../lib/utils';

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: 'slideUp' | 'fadeIn' | 'scaleIn';
}

export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({
  children,
  className,
  staggerDelay = 100,
  animation = 'slideUp',
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const getAnimationClasses = (index: number) => {
    const delay = index * staggerDelay;
    const baseClasses = `transition-all ease-out duration-600`;
    
    switch (animation) {
      case 'slideUp':
        return cn(
          baseClasses,
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          `delay-[${delay}ms]`
        );
      case 'fadeIn':
        return cn(
          baseClasses,
          isVisible ? 'opacity-100' : 'opacity-0',
          `delay-[${delay}ms]`
        );
      case 'scaleIn':
        return cn(
          baseClasses,
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          `delay-[${delay}ms]`
        );
      default:
        return cn(
          baseClasses,
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          `delay-[${delay}ms]`
        );
    }
  };

  return (
    <div ref={elementRef} className={className}>
      {React.Children.map(children, (child, index) => (
        <div className={getAnimationClasses(index)}>
          {child}
        </div>
      ))}
    </div>
  );
};