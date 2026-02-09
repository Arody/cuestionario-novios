import React from 'react';
import { motion } from 'framer-motion';

interface CompletionStepProps {
  onLogout: () => void;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({ onLogout }) => {
  return (
    <div className="flex flex-col h-full px-6 py-12 items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 max-w-sm"
      >
        <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-white text-5xl">check</span>
        </div>

        <div>
            <h2 className="text-[2.5rem] font-bold uppercase leading-none tracking-tighter text-slate-900 dark:text-white mb-4">
                ¡Gracias!
            </h2>
            <p className="text-lg font-light text-slate-700 dark:text-gray-300">
                Sus respuestas han sido guardadas con éxito.
            </p>
            <p className="text-sm mt-4 opacity-60 font-mono">
                Estamos emocionados de ser parte de este día tan especial.
            </p>
        </div>

        <div className="pt-8">
            <button 
                onClick={onLogout}
                className="group relative w-full overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-surface-dark h-16 px-8 flex items-center justify-center gap-2 border border-transparent hover:border-primary transition-all duration-300 rounded"
            >
                <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                <span className="relative z-10 font-bold tracking-widest text-sm uppercase group-hover:translate-x-1 transition-transform">
                    Salir
                </span>
                <span className="material-symbols-outlined relative z-10 text-sm group-hover:translate-x-1 transition-transform">logout</span>
            </button>
        </div>
      </motion.div>
    </div>
  );
};
