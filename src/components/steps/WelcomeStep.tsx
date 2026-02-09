import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col h-full px-6 pb-8 pt-20">
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center relative">
        {/* Brutalist Typography Layout */}
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[4.5rem] font-bold uppercase leading-[0.85] tracking-tighter mix-blend-difference z-20 relative text-slate-900 dark:text-white"
          >
            <span className="block">Nues</span>
            <span className="block ml-12 italic font-serif text-primary">tra</span>
            <span className="block -mt-2">Histo</span>
            <span className="block text-right text-transparent text-stroke-1 dark:text-stroke-white text-stroke-black opacity-30">ria</span>
          </motion.h1>
          
          {/* Image with Brutalist crop */}
          <motion.div 
            initial={{ opacity: 1, scale: 1, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute top-1/2 -translate-y-1/2 right-0 w-[65%] aspect-[3/4] z-10 overflow-hidden grayscale contrast-125 brightness-90 rounded border border-white/10 shadow-2xl"
          >
            <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-[10s] hover:scale-110 ease-linear" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=1974&auto=format&fit=crop&sat=-100')" }}
            >
            </div>
            {/* Color Accent Overlay */}
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
          </motion.div>
        </div>

        {/* Subtitle / Context */}
        <div className="mt-12 max-w-[70%] z-20 relative">
          <div className="w-8 h-1 bg-primary mb-4"></div>
          <p className="text-lg leading-tight font-light text-slate-700 dark:text-gray-300">
            Un viaje interactivo antes del <span className="font-serif italic text-primary">gran día</span>.
          </p>
          <p className="text-xs mt-2 opacity-50 font-mono uppercase tracking-widest">
            Est. 2026 • Boda
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto pt-8 z-20">
        <div className="flex items-center justify-between gap-4">
          <button 
            onClick={onNext}
            className="group relative flex-1 overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-surface-dark h-16 px-8 flex items-center justify-between border border-transparent hover:border-primary transition-all duration-300 rounded"
          >
            <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
            <span className="relative z-10 font-bold tracking-widest text-sm uppercase group-hover:translate-x-2 transition-transform">Comenzar</span>
            <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">east</span>
          </button>
        </div>
        <p className="text-center text-[10px] uppercase tracking-[0.2em] opacity-40 mt-6 font-medium">
             Por favor, activa el sonido
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none z-0"></div>
    </div>
  );
};
