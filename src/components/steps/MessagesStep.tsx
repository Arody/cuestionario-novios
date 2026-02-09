import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrutalistInput, BrutalistTextarea } from '../ui/BrutalistInput';
import type { QuestionnaireData } from '../QuestionnaireFlow';

interface MessagesStepProps {
  onNext: (data: Partial<QuestionnaireData>) => void;
  data: QuestionnaireData;
}

export const MessagesStep: React.FC<MessagesStepProps> = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    instagram: data.instagram || '',
    facebook: data.facebook || '',
    hashtag: data.hashtag || '',
    specialMessage: data.specialMessage || '',
    dressCode: data.dressCode || '',
    extraInfo: data.extraInfo || ''
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-6"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-60 block mb-2">Detalles Finales</span>
        <h2 className="text-[2.5rem] font-bold uppercase leading-none text-slate-900 dark:text-white">
          Lo que <span className="text-primary font-serif italic">hace falta</span>
        </h2>
      </motion.div>

      <div className="flex-1 flex flex-col gap-6 relative z-10 overflow-y-auto pb-20">
        
        <div className="space-y-4">
            <h3 className="font-bold uppercase tracking-widest text-sm border-b border-primary/20 pb-2">Redes Sociales</h3>
            <div className="grid grid-cols-2 gap-4">
                 <BrutalistInput label="Instagram" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@..." className="!gap-1"/>
                 <BrutalistInput label="Facebook" name="facebook" value={formData.facebook} onChange={handleChange} className="!gap-1"/>
            </div>
            <BrutalistInput label="Hashtag de la boda" name="hashtag" value={formData.hashtag} onChange={handleChange} placeholder="#Boda..."/>
        </div>

        <div className="space-y-4">
            <h3 className="font-bold uppercase tracking-widest text-sm border-b border-primary/20 pb-2">Extra</h3>
             <BrutalistInput 
                label="Código de Vestimenta"
                name="dressCode"
                value={formData.dressCode}
                onChange={handleChange}
             />
             <BrutalistTextarea 
                label="Mensaje especial para invitados"
                name="specialMessage"
                value={formData.specialMessage}
                onChange={handleChange}
                rows={3}
             />
             <BrutalistTextarea 
                label="Información adicional importante"
                name="extraInfo"
                value={formData.extraInfo}
                onChange={handleChange}
                rows={2}
             />
        </div>
      </div>

      <div className="pt-4 bg-background-light dark:bg-background-dark z-20">
        <button 
           onClick={handleSubmit}
           className="group relative w-full overflow-hidden bg-primary text-white h-16 px-8 flex items-center justify-center gap-2 border border-transparent rounded shadow-lg shadow-primary/20"
        >
           <span className="relative z-10 font-bold tracking-widest text-sm uppercase">Finalizar</span>
           <span className="material-symbols-outlined relative z-10">check</span>
        </button>
      </div>
    </div>
  );
};
