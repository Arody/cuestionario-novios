import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrutalistInput } from '../ui/BrutalistInput';
import type { QuestionnaireData } from '../QuestionnaireFlow';

interface DateLocationStepProps {
  onNext: (data: Partial<QuestionnaireData>) => void;
  data: QuestionnaireData;
}

export const DateLocationStep: React.FC<DateLocationStepProps> = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    weddingDate: data.weddingDate || '',
    ceremonyPlace: data.ceremonyPlace || '',
    ceremonyAddress: data.ceremonyAddress || '',
    receptionPlace: data.receptionPlace || '',
    receptionAddress: data.receptionAddress || '',
    isSameLocation: data.isSameLocation || false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = () => {
    if (!formData.weddingDate) {
        alert("Por favor selecciona una fecha");
        return;
    }
    onNext(formData);
  };

  return (
    <div className="flex flex-col h-full px-6 pb-8 pt-20">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h2 className="text-[3.5rem] font-bold uppercase leading-[0.9] tracking-tighter text-slate-900 dark:text-white mb-2">
          La <span className="text-primary italic font-serif">Fecha</span>
        </h2>
        <h2 className="text-[3.5rem] font-bold uppercase leading-[0.9] tracking-tighter text-transparent text-stroke-1 text-stroke-black dark:text-stroke-white opacity-30 text-right">
          & El Lugar
        </h2>
      </motion.div>

      <div className="flex-1 flex flex-col gap-8 relative z-10 overflow-y-auto pb-20">
        
        {/* Cinematic Image Strip */}
        <div className="w-full h-32 overflow-hidden rounded border border-white/10 grayscale opacity-80 shrink-0">
             <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop&sat=-100" className="w-full h-full object-cover" />
        </div>

        <BrutalistInput 
          label="¿Cuándo será la boda?"
          name="weddingDate"
          type="date"
          value={formData.weddingDate}
          onChange={handleChange}
        />

        <div className="space-y-4">
             <h3 className="font-bold uppercase tracking-widest text-sm border-b border-primary/20 pb-2">Ceremonia</h3>
             <BrutalistInput 
                label="Nombre del lugar"
                name="ceremonyPlace"
                value={formData.ceremonyPlace}
                onChange={handleChange}
                placeholder="Ej. Parroquia San José"
             />
             <BrutalistInput 
                label="Dirección completa"
                name="ceremonyAddress"
                value={formData.ceremonyAddress}
                onChange={handleChange}
                placeholder="Calle, Número, Ciudad"
             />
        </div>

        <div className="flex items-center gap-3 py-2">
            <input 
                type="checkbox" 
                id="isSameLocation"
                name="isSameLocation"
                checked={formData.isSameLocation}
                onChange={handleChange}
                className="size-5 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isSameLocation" className="text-sm uppercase tracking-wide opacity-80">
                La recepción es en el mismo lugar
            </label>
        </div>

        {!formData.isSameLocation && (
            <div className="space-y-4">
                <h3 className="font-bold uppercase tracking-widest text-sm border-b border-primary/20 pb-2">Recepción</h3>
                <BrutalistInput 
                    label="Nombre del salón/lugar"
                    name="receptionPlace"
                    value={formData.receptionPlace}
                    onChange={handleChange}
                    placeholder="Ej. Hacienda Las Nubes"
                />
                <BrutalistInput 
                    label="Dirección completa"
                    name="receptionAddress"
                    value={formData.receptionAddress}
                    onChange={handleChange}
                    placeholder="Calle, Número, Ciudad"
                />
            </div>
        )}

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
