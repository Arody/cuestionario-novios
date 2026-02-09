import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrutalistInput } from '../ui/BrutalistInput';
import { BrutalistTextarea } from '../ui/BrutalistTextarea';
import type { QuestionnaireData } from '../QuestionnaireFlow';

interface DesignStepProps {
  onNext: (data: Partial<QuestionnaireData>) => void;
  data: QuestionnaireData;
}

const DESIGN_STYLES = [
  { id: 'folklorico', label: 'Folklórico / Cultural', emoji: '🌸' },
  { id: 'clasico', label: 'Clásico / Elegante', emoji: '✨' },
  { id: 'minimalista', label: 'Minimalista / Moderno', emoji: '◻️' },
  { id: 'editorial', label: 'Editorial / Tipo Revista', emoji: '📰' },
  { id: 'romantico', label: 'Romántico / Delicado', emoji: '💕' },
  { id: 'bohemio', label: 'Bohemio / Rústico', emoji: '🌿' },
];

const COLOR_HARMONIES = [
  { id: 'terracota', label: 'Terracota & Arena', colors: ['#C06014', '#D4A574', '#F5E6D3'] },
  { id: 'sage', label: 'Sage & Crema', colors: ['#9CAF88', '#E8DFD8', '#C4B3A0'] },
  { id: 'blush', label: 'Blush & Oro Rosa', colors: ['#E8B4B8', '#EED6D3', '#D4AF37'] },
  { id: 'azulmarino', label: 'Azul Marino & Dorado', colors: ['#1E3A5F', '#D4AF37', '#F5F5F5'] },
  { id: 'lavanda', label: 'Lavanda & Plata', colors: ['#B8A9C9', '#C0C0C0', '#F8F4FF'] },
  { id: 'verde', label: 'Verde Bosque & Burgundy', colors: ['#2D5016', '#722F37', '#F5E6D3'] },
  { id: 'personalizado', label: 'Personalizado', colors: [] },
];

export const DesignStep: React.FC<DesignStepProps> = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    designStyle: data.designStyle || '',
    colorHarmony: data.colorHarmony || '',
    customColors: data.customColors || '',
    withMusic: data.withMusic ?? true,
    musicStyle: data.musicStyle || '',
    designNotes: data.designNotes || ''
  });

  const handleStyleSelect = (styleId: string) => {
    setFormData(prev => ({ ...prev, designStyle: styleId }));
  };

  const handleColorSelect = (colorId: string) => {
    setFormData(prev => ({ ...prev, colorHarmony: colorId }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = () => {
    onNext(formData);
  };

  return (
    <div className="flex flex-col h-full px-6 pb-8 pt-20">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <h2 className="text-[2.5rem] font-bold uppercase leading-[0.9] tracking-tighter text-slate-900 dark:text-white mb-2">
          Diseño <span className="text-primary italic font-serif">&</span> Estilo
        </h2>
        <p className="opacity-60 text-sm font-mono uppercase tracking-widest">Preferencias Visuales</p>
      </motion.div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto relative z-10 pb-4">
        
        {/* Design Style Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-70">
            Estilo de Diseño
          </label>
          <div className="grid grid-cols-2 gap-2">
            {DESIGN_STYLES.map(style => (
              <button
                key={style.id}
                type="button"
                onClick={() => handleStyleSelect(style.id)}
                className={`p-3 border rounded text-left transition-all duration-200 ${
                  formData.designStyle === style.id 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-slate-200 dark:border-white/10 hover:border-primary/50'
                }`}
              >
                <span className="text-lg mr-2">{style.emoji}</span>
                <span className="text-sm font-medium">{style.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Color Harmony Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-70">
            Armonía de Colores
          </label>
          <div className="space-y-2">
            {COLOR_HARMONIES.map(harmony => (
              <button
                key={harmony.id}
                type="button"
                onClick={() => handleColorSelect(harmony.id)}
                className={`w-full p-3 border rounded flex items-center gap-3 transition-all duration-200 ${
                  formData.colorHarmony === harmony.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-slate-200 dark:border-white/10 hover:border-primary/50'
                }`}
              >
                <div className="flex gap-1">
                  {harmony.colors.length > 0 ? (
                    harmony.colors.map((color, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                    ))
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-dashed border-slate-400 flex items-center justify-center text-xs">?</div>
                  )}
                </div>
                <span className="text-sm font-medium">{harmony.label}</span>
              </button>
            ))}
          </div>
        </div>

        {formData.colorHarmony === 'personalizado' && (
          <BrutalistInput 
            label="Describe tus colores preferidos"
            name="customColors"
            value={formData.customColors}
            onChange={handleChange}
            placeholder="Ej: Rosa pastel, dorado, verde olivo..."
          />
        )}

        {/* Music Preference */}
        <div className="p-4 border border-slate-200 dark:border-white/10 rounded">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox"
              name="withMusic"
              checked={formData.withMusic}
              onChange={handleChange}
              className="w-5 h-5 accent-primary"
            />
            <span className="font-medium">🎵 Quiero música en mi invitación</span>
          </label>
        </div>

        {formData.withMusic && (
          <BrutalistInput 
            label="Estilo o canción preferida"
            name="musicStyle"
            value={formData.musicStyle}
            onChange={handleChange}
            placeholder="Ej: Nuestra canción es 'Perfect' de Ed Sheeran..."
          />
        )}

        <BrutalistTextarea
          label="Notas adicionales sobre el diseño"
          name="designNotes"
          value={formData.designNotes}
          onChange={handleChange}
          placeholder="¿Algún detalle especial que quieras incluir? ¿Referencias de Pinterest?"
        />

      </div>

      <div className="mt-auto pt-4">
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
