import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroductionStepProps {
  onComplete: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const INTRO_SLIDES = [
  {
    id: 1,
    title: 'Bienvenidos',
    subtitle: 'A su cuestionario de boda',
    bullets: [],
    showAudio: false
  },
  {
    id: 2,
    title: '¿Por qué este cuestionario?',
    subtitle: '',
    bullets: [
      'Queremos que su invitación sea única y especial',
      'Cada detalle cuenta para crear algo memorable',
      'Sus respuestas nos ayudarán a plasmar su historia'
    ],
    showAudio: false
  },
  {
    id: 3,
    title: 'Tómense su tiempo',
    subtitle: '',
    bullets: [
      'Lean cada pregunta con calma',
      'Reflexionen juntos sobre cada respuesta',
      'No hay prisa — pueden pausar y continuar después',
      'Sus respuestas se guardan automáticamente'
    ],
    showAudio: false
  },
  {
    id: 4,
    title: 'Antes de comenzar...',
    subtitle: 'Les invitamos a escuchar música mientras llenan el cuestionario',
    bullets: [],
    showAudio: true
  }
];

export const IntroductionStep: React.FC<IntroductionStepProps> = ({ onComplete, audioRef }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const slide = INTRO_SLIDES[currentSlide];
  const isLastSlide = currentSlide === INTRO_SLIDES.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      onComplete();
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handleEnableAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setAudioEnabled(true);
      }).catch(() => {
        console.log('Audio autoplay blocked');
        setAudioEnabled(true); // Continue anyway
      });
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center px-6 py-12 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="max-w-md space-y-8"
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-[3rem] font-bold uppercase leading-[0.9] tracking-tighter text-slate-900 dark:text-white">
              {slide.title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={i === slide.title.split(' ').length - 1 ? 'text-primary italic font-serif' : ''}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </h1>
            {slide.subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.6 }}
                className="mt-4 text-sm font-mono uppercase tracking-widest"
              >
                {slide.subtitle}
              </motion.p>
            )}
          </motion.div>

          {/* Bullets */}
          {slide.bullets.length > 0 && (
            <div className="space-y-4 text-left">
              {slide.bullets.map((bullet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.2, type: 'spring', stiffness: 500 }}
                    className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"
                  />
                  <p className="text-base opacity-80">{bullet}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Audio Section */}
          {slide.showAudio && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-6 pt-4"
            >
              {!audioEnabled ? (
                <button
                  onClick={handleEnableAudio}
                  className="group mx-auto flex items-center gap-3 bg-primary/10 border border-primary text-primary px-6 py-4 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="material-symbols-outlined text-2xl"
                  >
                    music_note
                  </motion.span>
                  <span className="font-bold uppercase tracking-wide text-sm">Activar Música</span>
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-3 text-primary"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                    className="material-symbols-outlined text-2xl"
                  >
                    radio_button_checked
                  </motion.span>
                  <span className="text-sm font-mono uppercase tracking-widest">Reproduciendo...</span>
                </motion.div>
              )}
              
              <p className="text-xs opacity-40 italic">
                (Opcional — pueden continuar sin música)
              </p>
            </motion.div>
          )}

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 pt-4">
            {INTRO_SLIDES.map((_, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  scale: i === currentSlide ? 1.3 : 1,
                  backgroundColor: i === currentSlide ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)'
                }}
                className="w-2 h-2 rounded-full bg-white/20"
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 w-full max-w-sm"
      >
        <button
          onClick={handleNext}
          className="group relative w-full overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-surface-dark h-16 px-8 flex items-center justify-center gap-2 border border-transparent hover:border-primary transition-all duration-300 rounded"
        >
          <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full opacity-10" />
          <span className="relative z-10 font-bold tracking-widest text-sm uppercase">
            {isLastSlide ? 'Comenzar Cuestionario' : 'Continuar'}
          </span>
          <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">
            {isLastSlide ? 'play_arrow' : 'east'}
          </span>
        </button>
        
        {!isLastSlide && (
          <button
            onClick={() => setCurrentSlide(INTRO_SLIDES.length - 1)}
            className="mt-4 text-xs opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest"
          >
            Saltar Introducción
          </button>
        )}
      </motion.div>
    </div>
  );
};
