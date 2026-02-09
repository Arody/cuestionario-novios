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
      }, 1500); // Much faster - 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 px-3 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs backdrop-blur-sm">
            <span className="material-symbols-outlined !text-[14px] text-green-400 dark:text-green-600">check_circle</span>
            <span className="font-medium">Proceso guardado</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
