import React from 'react';
import { cn } from '../../lib/utils';

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false
}) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const variantClasses = {
    primary: "bg-amber-900 text-blue-gray900 hover:bg-amber-700/80",
    secondary: "bg-transparent text-amber-900 border-2 border-amber-900 hover:bg-amber-50"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </button>
  );
};

export default StyledButton;