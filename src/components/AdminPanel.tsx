import React, { useState, useEffect, useRef } from 'react';
import { BrutalistInput } from './ui/BrutalistInput';
import type { QuestionnaireData } from './QuestionnaireFlow';

interface AdminPanelProps {
  currentUser: string;
  onLogout: () => void;
}

type User = {
  username: string;
  role: 'admin' | 'user';
};

// Section definitions with Spanish labels
const SECTIONS = [
  {
    id: 'basic',
    title: 'Información Básica',
    icon: '💍',
    fields: [
      { key: 'brideName', label: 'Nombre de la Novia' },
      { key: 'groomName', label: 'Nombre del Novio' },
      { key: 'nameDisplayPreference', label: 'Preferencia de Nombres' },
    ]
  },
  {
    id: 'dateLocation',
    title: 'Fecha y Lugar',
    icon: '📍',
    fields: [
      { key: 'weddingDate', label: 'Fecha de la Boda' },
      { key: 'ceremonyPlace', label: 'Lugar de la Ceremonia' },
      { key: 'ceremonyAddress', label: 'Dirección Ceremonia' },
      { key: 'receptionPlace', label: 'Lugar de la Recepción' },
      { key: 'receptionAddress', label: 'Dirección Recepción' },
    ]
  },
  {
    id: 'schedule',
    title: 'Horarios',
    icon: '⏰',
    fields: [
      { key: 'ceremonyTime', label: 'Hora Ceremonia' },
      { key: 'receptionTime', label: 'Hora Recepción' },
      { key: 'otherEvents', label: 'Otros Eventos' },
    ]
  },
  {
    id: 'family',
    title: 'Familia y Padrinos',
    icon: '👨‍👩‍👧‍👦',
    fields: [
      { key: 'brideMother', label: 'Mamá de la Novia' },
      { key: 'brideFather', label: 'Papá de la Novia' },
      { key: 'groomMother', label: 'Mamá del Novio' },
      { key: 'groomFather', label: 'Papá del Novio' },
      { key: 'padrinosAnillos', label: 'Padrinos de Anillos' },
      { key: 'padrinosLazo', label: 'Padrinos de Lazo' },
      { key: 'otherPadrinos', label: 'Otros Padrinos' },
    ]
  },
  {
    id: 'story',
    title: 'Nuestra Historia',
    icon: '💕',
    fields: [
      { key: 'dateMet', label: 'Fecha que se Conocieron' },
      { key: 'dateFirstDate', label: 'Primera Cita' },
      { key: 'dateEngagement', label: 'Fecha de Compromiso' },
      { key: 'storyMet', label: 'Cómo se Conocieron' },
      { key: 'storyFirstDate', label: 'Primera Cita' },
      { key: 'storyProposal', label: 'La Propuesta' },
    ]
  },
  {
    id: 'stats',
    title: 'Estadísticas',
    icon: '📊',
    fields: [
      { key: 'guestCount', label: 'Número de Invitados' },
      { key: 'daysTogether', label: 'Días Juntos' },
      { key: 'otherStats', label: 'Otras Estadísticas' },
    ]
  },
  {
    id: 'design',
    title: 'Diseño y Estilo',
    icon: '🎨',
    fields: [
      { key: 'designStyle', label: 'Estilo de Diseño' },
      { key: 'colorHarmony', label: 'Armonía de Colores' },
      { key: 'customColors', label: 'Colores Personalizados' },
      { key: 'withMusic', label: '¿Con Música?' },
      { key: 'musicStyle', label: 'Estilo/Canción' },
      { key: 'designNotes', label: 'Notas de Diseño' },
    ]
  },
  {
    id: 'rsvp',
    title: 'RSVP',
    icon: '📱',
    fields: [
      { key: 'rsvpPhone', label: 'Teléfono para Confirmar' },
      { key: 'rsvpDeadline', label: 'Fecha Límite' },
    ]
  },
  {
    id: 'additional',
    title: 'Información Adicional',
    icon: '✨',
    fields: [
      { key: 'instagram', label: 'Instagram' },
      { key: 'facebook', label: 'Facebook' },
      { key: 'hashtag', label: 'Hashtag' },
      { key: 'dressCode', label: 'Dress Code' },
      { key: 'specialMessage', label: 'Mensaje Especial' },
      { key: 'extraInfo', label: 'Información Extra' },
    ]
  },
];

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser, onLogout }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userData, setUserData] = useState<QuestionnaireData | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.username || !newUser.password) return alert('Completa los campos');
    
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      
      if (res.ok) {
        alert('Usuario creado');
        setNewUser({ username: '', password: '' });
        fetchUsers();
      } else {
        alert('Error al crear usuario');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewUser = async (username: string) => {
    setSelectedUser(username);
    setUserData(null);
    try {
        const res = await fetch(`/api/progress?username=${username}`);
        const data = await res.json();
        setUserData(data);
    } catch (err) {
        console.error(err);
    }
  };

  const handleDownloadPDF = () => {
    if (!printRef.current || !selectedUser) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return alert('Por favor permite las ventanas emergentes');
    
    const styles = `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; padding: 40px; color: #1a1a1a; }
        h1 { font-size: 28px; text-align: center; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 2px; }
        .subtitle { text-align: center; color: #666; margin-bottom: 40px; font-style: italic; }
        .section { margin-bottom: 32px; page-break-inside: avoid; }
        .section-title { font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #c9a87c; padding-bottom: 8px; margin-bottom: 16px; color: #c9a87c; }
        .field { margin-bottom: 12px; }
        .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 2px; }
        .field-value { font-size: 14px; line-height: 1.5; }
        .empty { color: #ccc; font-style: italic; }
        @media print { body { padding: 20px; } }
      </style>
    `;
    
    let sectionsHTML = '';
    SECTIONS.forEach(section => {
      const hasData = section.fields.some(f => userData?.[f.key as keyof QuestionnaireData]);
      if (!hasData) return;
      
      let fieldsHTML = '';
      section.fields.forEach(field => {
        const value = userData?.[field.key as keyof QuestionnaireData];
        if (value !== undefined && value !== null && value !== '') {
          const displayValue = typeof value === 'boolean' ? (value ? 'Sí' : 'No') : String(value);
          fieldsHTML += `
            <div class="field">
              <div class="field-label">${field.label}</div>
              <div class="field-value">${displayValue}</div>
            </div>
          `;
        }
      });
      
      if (fieldsHTML) {
        sectionsHTML += `
          <div class="section">
            <div class="section-title">${section.icon} ${section.title}</div>
            ${fieldsHTML}
          </div>
        `;
      }
    });
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Cuestionario - ${selectedUser}</title>
          ${styles}
        </head>
        <body>
          <h1>Cuestionario de Boda</h1>
          <p class="subtitle">${selectedUser}</p>
          ${sectionsHTML}
        </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 text-slate-900 dark:text-white font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10 border-b-2 border-slate-300 dark:border-slate-700 pb-4">
            <h1 className="text-3xl font-bold uppercase">Panel Admin</h1>
            <div className="flex items-center gap-4">
                <span>Hola, {currentUser}</span>
                <button onClick={onLogout} className="text-red-500 hover:underline text-sm uppercase">Salir</button>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Create User Section */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold uppercase mb-4 text-primary">Crear Nueva Pareja</h2>
                <div className="space-y-4">
                    <BrutalistInput 
                        label="Usuario (ej. boda2025)"
                        value={newUser.username}
                        onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    />
                    <BrutalistInput 
                        label="Contraseña"
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    />
                    <button 
                        onClick={handleCreateUser}
                        className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 uppercase font-bold tracking-widest hover:bg-primary hover:text-white transition-colors"
                    >
                        Crear Usuario
                    </button>
                </div>
            </div>

            {/* User List Section */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold uppercase mb-4">Parejas Registradas</h2>
                {loading ? <p>Cargando...</p> : (
                    <ul className="space-y-2">
                        {users.filter(u => u.role !== 'admin').map(user => (
                            <li key={user.username} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <span className="font-bold">{user.username}</span>
                                <button 
                                    onClick={() => handleViewUser(user.username)}
                                    className="text-xs bg-slate-200 dark:bg-slate-600 px-2 py-1 rounded uppercase hover:bg-primary hover:text-white transition-colors"
                                >
                                    Ver Respuestas
                                </button>
                            </li>
                        ))}
                         {users.filter(u => u.role !== 'admin').length === 0 && (
                            <li className="text-sm opacity-50 italic">No hay parejas registradas aún.</li>
                        )}
                    </ul>
                )}
            </div>
        </div>

        {/* Response Viewer Modal */}
        {selectedUser && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div ref={printRef} className="bg-white dark:bg-slate-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl p-6 relative">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold uppercase">
                                Respuestas de <span className="text-primary">{selectedUser}</span>
                            </h2>
                            <p className="text-sm opacity-60 mt-1">Cuestionario de Boda</p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={handleDownloadPDF}
                                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded text-sm uppercase font-bold hover:bg-primary/80 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">download</span>
                                PDF
                            </button>
                            <button 
                                onClick={() => setSelectedUser(null)}
                                className="text-slate-400 hover:text-red-500 material-symbols-outlined"
                            >
                                close
                            </button>
                        </div>
                    </div>

                    {userData && Object.keys(userData).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {SECTIONS.map(section => (
                                <SectionCard key={section.id} section={section} data={userData} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 opacity-50 italic">
                            Esta pareja aún no ha respondido el cuestionario.
                        </div>
                    )}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

// Section Card Component
const SectionCard = ({ section, data }: { section: typeof SECTIONS[0], data: QuestionnaireData }) => {
    const hasData = section.fields.some(f => data[f.key as keyof QuestionnaireData]);
    if (!hasData) return null;

    return (
        <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded border border-slate-200 dark:border-slate-600/30">
            <h3 className="font-bold uppercase text-sm tracking-widest mb-3 flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <span>{section.icon}</span>
                {section.title}
            </h3>
            <div className="space-y-3">
                {section.fields.map(field => {
                    const value = data[field.key as keyof QuestionnaireData];
                    if (value === undefined || value === null || value === '') return null;
                    
                    const displayValue = typeof value === 'boolean' ? (value ? 'Sí ✓' : 'No') : String(value);
                    
                    return (
                        <div key={field.key}>
                            <span className="text-[10px] uppercase tracking-wider opacity-50 block">{field.label}</span>
                            <p className="text-sm font-medium leading-snug">{displayValue}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
