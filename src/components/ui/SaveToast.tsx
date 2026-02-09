import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SaveToastProps {
  show: boolean;
  onHide: () => void;
}

export const SaveToast: React.FC<SaveToastProps> = ({ show, onHide }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[90vw]"
        >
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-4 rounded-lg shadow-2xl flex items-start gap-3 border border-primary/20">
            <div className="flex-shrink-0">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
                className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-white text-lg">check</span>
              </motion.span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm uppercase tracking-wide mb-1">
                ✨ Progreso guardado
              </p>
              <p className="text-xs opacity-70 leading-relaxed">
                Si cierras el navegador, puedes volver con tu usuario y contraseña para continuar donde lo dejaste.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
