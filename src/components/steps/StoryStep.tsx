import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrutalistInput, BrutalistTextarea } from '../ui/BrutalistInput';
import type { QuestionnaireData } from '../QuestionnaireFlow';

interface StoryStepProps {
  onNext: (data: Partial<QuestionnaireData>) => void;
  data: QuestionnaireData;
}

export const StoryStep: React.FC<StoryStepProps> = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    dateMet: data.dateMet || '',
    dateFirstDate: data.dateFirstDate || '',
    dateEngagement: data.dateEngagement || '',
    storyMet: data.storyMet || '',
    storyFirstDate: data.storyFirstDate || '',
    storyProposal: data.storyProposal || ''
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-[3rem] font-bold uppercase leading-[0.95] tracking-tighter text-slate-900 dark:text-white">
          Historia de <br />
          <span className="italic font-serif text-primary text-[3.5rem] ml-4">Amor</span>
        </h2>
      </motion.div>

      <div className="flex-1 relative z-10 overflow-y-auto pb-20 flex flex-col gap-10">
        
       {/* Decorative Image overlay */}
       <div className="w-full h-40 overflow-hidden rounded grayscale opacity-60">
          <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop&sat=-100" className="w-full h-full object-cover" />
       </div>

        <div className="space-y-6">
             <h3 className="font-bold uppercase tracking-widest text-sm border-b border-primary/20 pb-2">Fechas Importantes</h3>
             <BrutalistInput 
                label="¿Cuándo se conocieron?"
                name="dateMet"
                type="date"
                value={formData.dateMet}
                onChange={handleChange}
             />
             <BrutalistInput 
                label="¿Cuándo fue su primera cita?"
                name="dateFirstDate"
                type="date"
                value={formData.dateFirstDate}
                onChange={handleChange}
             />
             <BrutalistInput 
                label="¿Cuándo se comprometieron?"
                name="dateEngagement"
                type="date"
                value={formData.dateEngagement}
                onChange={handleChange}
             />
        </div>

        <div className="space-y-8">
             <h3 className="font-bold uppercase tracking-widest text-sm border-b border-primary/20 pb-2">Los Detalles</h3>
             <BrutalistTextarea 
                label="¿Cómo se conocieron realmente?"
                name="storyMet"
                value={formData.storyMet}
                onChange={handleChange}
                placeholder="Cuéntanos la versión oficial..."
                rows={4}
             />
             <BrutalistTextarea 
                label="¿Cómo fue la propuesta?"
                name="storyProposal"
                value={formData.storyProposal}
                onChange={handleChange}
                placeholder="¿Fue sorpresa? ¿Lloraron?..."
                rows={4}
             />
             <BrutalistTextarea 
                label="Detalles de la primera cita (opcional)"
                name="storyFirstDate"
                value={formData.storyFirstDate}
                onChange={handleChange}
                rows={3}
             />
        </div>

      </div>

      <div className="pt-4 bg-background-light dark:bg-background-dark z-20">
        <button 
           onClick={handleSubmit}
           className="group relative w-full overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-surface-dark h-16 px-8 flex items-center justify-between border border-transparent hover:border-primary transition-all duration-300 rounded"
        >
           <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
           <span className="relative z-10 font-bold tracking-widest text-sm uppercase group-hover:translate-x-2 transition-transform">Continuar</span>
           <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">east</span>
        </button>
      </div>
    </div>
  );
};
