import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrutalistInput } from '../ui/BrutalistInput';

interface LoginStepProps {
  onLogin: (username: string, role: string) => void;
}

export const LoginStep: React.FC<LoginStepProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.username, data.role);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full px-6 pt-20 pb-8 items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-8"
      >
        <div className="text-center">
            <h1 className="text-[3rem] font-bold uppercase leading-none tracking-tighter text-slate-900 dark:text-white">
              Cuestionario <br />
              <span className="text-primary italic font-serif text-[2.5rem]">Boda</span>
            </h1>
            <p className="mt-4 text-sm font-mono uppercase tracking-widest opacity-60">Acceso Privado</p>
        </div>

        <div className="space-y-4">
          <BrutalistInput 
            label="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Introduce tu usuario"
          />
          <BrutalistInput 
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && (
            <div className="p-3 bg-red-500/10 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-wide text-center">
                {error}
            </div>
        )}

        <button 
           onClick={handleLogin}
           disabled={loading}
           className="group relative w-full overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-surface-dark h-16 px-8 flex items-center justify-center gap-2 border border-transparent hover:border-primary transition-all duration-300 rounded disabled:opacity-50"
        >
           <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
           <span className="relative z-10 font-bold tracking-widest text-sm uppercase">
               {loading ? 'Entrando...' : 'Ingresar'}
           </span>
        </button>
      </motion.div>
      
      {/* Branding Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <p className="text-xs font-mono uppercase tracking-[0.3em] opacity-40">
          Arody Fajardo Fotografía
        </p>
      </motion.div>
    </div>
  );
};
