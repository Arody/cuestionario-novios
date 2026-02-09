import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrutalistInput } from '../ui/BrutalistInput';
import type { QuestionnaireData } from '../QuestionnaireFlow';

interface FamilyInfoStepProps {
  onNext: (data: Partial<QuestionnaireData>) => void;
  data: QuestionnaireData;
}

export const FamilyInfoStep: React.FC<FamilyInfoStepProps> = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    brideMother: data.brideMother || '',
    brideFather: data.brideFather || '',
    groomMother: data.groomMother || '',
    groomFather: data.groomFather || '',
    padrinosAnillos: data.padrinosAnillos || '',
    padrinosLazo: data.padrinosLazo || '',
    otherPadrinos: data.otherPadrinos || ''
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
          La <span className="text-primary italic font-serif">Familia</span>
        </h2>
        <p className="opacity-60 text-sm font-mono uppercase tracking-widest">Padres y Padrinos</p>
      </motion.div>

      <div className="flex-1 flex flex-col gap-8 relative z-10 overflow-y-auto pb-20">
        
        <div className="space-y-4">
             <h3 className="font-bold uppercase tracking-widest text-sm border-b border-primary/20 pb-2">Padres de la Novia</h3>
             <BrutalistInput 
                label="Madre"
                name="brideMother"
                value={formData.brideMother}
                onChange={handleChange}
             />
             <BrutalistInput 
                label="Padre"
                name="brideFather"
                value={formData.brideFather}
                onChange={handleChange}
             />
        </div>

        <div className="space-y-4">
             <h3 className="font-bold uppercase tracking-widest text-sm border-b border-primary/20 pb-2">Padres del Novio</h3>
             <BrutalistInput 
                label="Madre"
                name="groomMother"
                value={formData.groomMother}
                onChange={handleChange}
             />
             <BrutalistInput 
                label="Padre"
                name="groomFather"
                value={formData.groomFather}
                onChange={handleChange}
             />
        </div>

        <div className="space-y-4">
             <h3 className="font-bold uppercase tracking-widest text-sm border-b border-primary/20 pb-2">Padrinos</h3>
             <BrutalistInput 
                label="De Anillos"
                name="padrinosAnillos"
                value={formData.padrinosAnillos}
                onChange={handleChange}
             />
             <BrutalistInput 
                label="De Lazo"
                name="padrinosLazo"
                value={formData.padrinosLazo}
                onChange={handleChange}
             />
             <BrutalistInput 
                label="Otros (opcional)"
                name="otherPadrinos"
                value={formData.otherPadrinos}
                onChange={handleChange}
             />
        </div>

      </div>

      <div className="pt-4 bg-background-light dark:bg-background-dark z-20">
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
