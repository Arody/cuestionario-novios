import React from 'react';

interface BrutalistTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const BrutalistTextarea: React.FC<BrutalistTextareaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="relative">
      <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">
        {label}
      </label>
      <textarea
        {...props}
        rows={4}
        className={`w-full bg-transparent border border-slate-300 dark:border-white/20 px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors placeholder:opacity-40 rounded resize-none ${className}`}
      />
    </div>
  );
};
