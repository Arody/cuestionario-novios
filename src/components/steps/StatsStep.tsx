import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrutalistInput } from '../ui/BrutalistInput';
import type { QuestionnaireData } from '../QuestionnaireFlow';

interface StatsStepProps {
  onNext: (data: Partial<QuestionnaireData>) => void;
  data: QuestionnaireData;
}

export const StatsStep: React.FC<StatsStepProps> = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    guestCount: data.guestCount || '',
    daysTogether: data.daysTogether || '',
    otherStats: data.otherStats || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onNext(formData);
  };

  return (
    <div className="flex flex-col h-full px-6 pb-8 pt-20">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h2 className="text-[3rem] font-bold uppercase leading-[0.9] tracking-tighter text-slate-900 dark:text-white mb-2">
          Datos <span className="text-primary italic font-serif">Curiosos</span>
        </h2>
        <p className="opacity-60 text-sm font-mono uppercase tracking-widest">Estadísticas</p>
      </motion.div>

      <div className="flex-1 flex flex-col gap-8 relative z-10">
        
        <div className="grid grid-cols-2 gap-4">
             <BrutalistInput 
                label="No. Invitados"
                name="guestCount"
                type="number"
                value={formData.guestCount}
                onChange={handleChange}
             />
             <BrutalistInput 
                label="Días Juntos"
                name="daysTogether"
                type="number"
                value={formData.daysTogether}
                onChange={handleChange}
                placeholder="Aprox."
             />
        </div>

        <BrutalistInput 
           label="¿Otras estadísticas divertidas?"
           name="otherStats"
           value={formData.otherStats}
           onChange={handleChange}
           placeholder="Ej: 5 viajes, 2 perros, 1000 cafés..."
        />
      </div>

      <div className="mt-auto pt-8">
        <button 
           onClick={handleSubmit}
           className="group relative w-full overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-surface-dark h-16 px-8 flex items-center justify-between border border-transparent hover:border-primary transition-all duration-300 rounded"
        >
           <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
           <span className="relative z-10 font-bold tracking-widest text-sm uppercase group-hover:translate-x-2 transition-transform">Siguiente</span>
           <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">east</span>
        </button>
      </div>
    </div>
  );
};
