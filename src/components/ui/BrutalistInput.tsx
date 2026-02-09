import React from 'react';

interface BrutalistInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

export const BrutalistInput: React.FC<BrutalistInputProps> = ({ 
  label, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-bold uppercase tracking-widest opacity-60">
        {label}
      </label>
      <input 
        className="bg-transparent border-b border-slate-300 dark:border-white/20 py-2 text-lg font-light focus:outline-none focus:border-primary transition-colors placeholder:opacity-30"
        {...props}
      />
    </div>
  );
};

interface BrutalistTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    className?: string;
  }
  
  export const BrutalistTextarea: React.FC<BrutalistTextareaProps> = ({ 
    label, 
    className = '', 
    ...props 
  }) => {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <label className="text-xs font-bold uppercase tracking-widest opacity-60">
          {label}
        </label>
        <textarea 
          className="bg-transparent border border-slate-300 dark:border-white/20 p-4 text-lg font-light focus:outline-none focus:border-primary transition-colors placeholder:opacity-30 rounded-sm resize-none min-h-[150px]"
          {...props}
        />
      </div>
    );
  };
