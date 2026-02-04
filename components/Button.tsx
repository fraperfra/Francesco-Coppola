import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  fullWidth?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  href,
  ...props 
}) => {
  // Enhanced base styles:
  // - scale-105 on hover (slight enlargement)
  // - -translate-y-1 on hover (lift effect)
  // - active:scale-95 (click press effect)
  // - transition-all duration-300 for smooth animation
  const baseStyles = "cursor-pointer px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 text-center flex items-center justify-center gap-2 tracking-wide";
  
  const variants = {
    // Brighter hover + strong colored shadow
    primary: "bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30 hover:shadow-2xl hover:shadow-brand-600/50",
    
    // Deep blue hover + strong shadow
    secondary: "bg-brand-900 hover:bg-brand-800 text-white shadow-lg shadow-brand-900/30 hover:shadow-2xl hover:shadow-brand-900/50",
    
    // Outline with inverse fill on hover
    outline: "border-2 border-white text-white hover:bg-white hover:text-brand-900 hover:shadow-lg hover:border-white shadow-sm backdrop-blur-sm",
    
    // White card style button with deep shadow on hover
    white: "bg-white text-brand-900 hover:bg-brand-50 shadow-lg shadow-slate-200/50 hover:shadow-2xl"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button 
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
};