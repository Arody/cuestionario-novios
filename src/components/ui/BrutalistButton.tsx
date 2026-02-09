import React from 'react';
import { motion } from "framer-motion";

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'icon';
  className?: string;
  icon?: string;
}

export const BrutalistButton: React.FC<BrutalistButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  ...props 
}) => {
  if (variant === 'icon') {
    return (
      <button 
        className={`size-16 flex items-center justify-center border border-slate-300 dark:border-white/20 rounded hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group ${className}`}
        {...props}
      >
        <span className={`material-symbols-outlined opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all`}>
          {icon || 'arrow_forward'}
        </span>
      </button>
    );
  }

  return (
    <button 
      className={`group relative flex-1 overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-surface-dark h-16 px-8 flex items-center justify-between border border-transparent hover:border-primary transition-all duration-300 rounded ${className}`}
      {...props}
    >
      <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
      <span className="relative z-10 font-bold tracking-widest text-sm uppercase group-hover:translate-x-2 transition-transform">
        {children}
      </span>
      {icon && (
        <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">
          {icon}
        </span>
      )}
    </button>
  );
};
