import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrutalistInput } from '../ui/BrutalistInput';
import type { QuestionnaireData } from '../QuestionnaireFlow';

interface RsvpStepProps {
  onNext: (data: Partial<QuestionnaireData>) => void;
  data: QuestionnaireData;
}

export const RsvpStep: React.FC<RsvpStepProps> = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    rsvpPhone: data.rsvpPhone || '',
    rsvpDeadline: data.rsvpDeadline || ''
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
          Confir <br />
          <span className="text-primary italic font-serif">mación</span>
        </h2>
        <p className="opacity-60 text-sm font-mono uppercase tracking-widest">RSVP</p>
      </motion.div>

      <div className="flex-1 flex flex-col gap-8 relative z-10">
        
        <BrutalistInput 
           label="WhatsApp para confirmar"
           name="rsvpPhone"
           type="tel"
           value={formData.rsvpPhone}
           onChange={handleChange}
           placeholder="+52 ..."
        />

        <BrutalistInput 
           label="Fecha límite de confirmación"
           name="rsvpDeadline"
           type="date"
           value={formData.rsvpDeadline}
           onChange={handleChange}
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
