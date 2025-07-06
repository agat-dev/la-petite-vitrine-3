import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface MaxWidthContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-3xl",      // 768px
  md: "max-w-4xl",      // 896px
  lg: "max-w-5xl",      // 1024px
  xl: "max-w-6xl",      // 1152px
  "2xl": "max-w-7xl",   // 1280px
  "3xl": "max-w-[1600px]", // 1600px
  "4xl": "max-w-[2400px]", // 2400px
  full: "max-w-none",
};

export const MaxWidthContainer = ({ 
  children, 
  className, 
  maxWidth = "4xl" 
}: MaxWidthContainerProps) => {
  return (
    <div className={cn(
      "w-full mx-auto px-4 sm:px-6 lg:px-8",
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  );
};
