import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrutalistInput, BrutalistTextarea } from '../ui/BrutalistInput';
import type { QuestionnaireData } from '../QuestionnaireFlow';

interface TimeScheduleStepProps {
  onNext: (data: Partial<QuestionnaireData>) => void;
  data: QuestionnaireData;
}

export const TimeScheduleStep: React.FC<TimeScheduleStepProps> = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    ceremonyTime: data.ceremonyTime || '',
    receptionTime: data.receptionTime || '',
    otherEvents: data.otherEvents || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          Los <span className="text-primary italic font-serif">Horarios</span>
        </h2>
        <p className="opacity-60 text-sm font-mono uppercase tracking-widest">Del Evento</p>
      </motion.div>

      <div className="flex-1 flex flex-col gap-8 relative z-10">
        
        <div className="grid grid-cols-2 gap-4">
             <BrutalistInput 
                label="Ceremonia"
                name="ceremonyTime"
                type="time"
                value={formData.ceremonyTime}
                onChange={handleChange}
             />
             <BrutalistInput 
                label="Recepción"
                name="receptionTime"
                type="time"
                value={formData.receptionTime}
                onChange={handleChange}
             />
        </div>

        <BrutalistTextarea
           label="Otros eventos o detalles del protocolo"
           name="otherEvents"
           value={formData.otherEvents}
           onChange={handleChange}
           placeholder="Ej. Cóctel de bienvenida a las 6:00 PM, Cena a las 8:00 PM..."
           rows={4}
        />
        
        <div className="p-4 border-l-2 border-primary bg-primary/5 text-sm opacity-80">
            Es importante definir los horarios para que los invitados lleguen a tiempo a cada momento importante.
        </div>

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
