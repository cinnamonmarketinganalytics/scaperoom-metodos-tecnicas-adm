import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Header from './components/Header';
import Toast from './components/Toast';
import ModalAdminAuth from './components/ModalAdminAuth';
import ScreenRegistration from './components/screens/ScreenRegistration';
import ScreenRoomGeneral from './components/screens/ScreenRoomGeneral';
import ScreenRoom5Swot from './components/screens/ScreenRoom5Swot';
import ScreenVictory from './components/screens/ScreenVictory';
import ScreenAdmin from './components/screens/ScreenAdmin';

function AppContent() {
  const { status, currentRoom } = useGame();
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('game'); // 'game' | 'admin'

  // Checar se a URL contém /admin ou #admin
  useEffect(() => {
    const checkAdminPath = () => {
      if (window.location.pathname.includes('/admin') || window.location.hash.includes('admin')) {
        setIsAdminModalOpen(true);
      }
    };
    checkAdminPath();
    window.addEventListener('popstate', checkAdminPath);
    return () => window.removeEventListener('popstate', checkAdminPath);
  }, []);

  const handleAdminSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminModalOpen(false);
    setViewMode('admin');
  };

  const handleExitAdmin = () => {
    setViewMode('game');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Toast Flutuante de Pontuação e Avisos */}
      <Toast />

      {/* Header Fixo com Timer e Progresso (apenas durante o jogo ou na vitória) */}
      {viewMode === 'game' && <Header onOpenAdmin={() => setIsAdminModalOpen(true)} />}

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {viewMode === 'admin' && isAdminAuthenticated ? (
          <ScreenAdmin onExitAdmin={handleExitAdmin} />
        ) : (
          <>
            {status === 'idle' && (
              <ScreenRegistration onOpenAdmin={() => setIsAdminModalOpen(true)} />
            )}

            {status === 'running' && currentRoom >= 1 && currentRoom <= 4 && (
              <ScreenRoomGeneral roomNumber={currentRoom} />
            )}

            {status === 'running' && currentRoom === 5 && (
              <ScreenRoom5Swot />
            )}

            {(status === 'completed' || currentRoom === 6) && (
              <ScreenVictory onOpenAdmin={() => setIsAdminModalOpen(true)} />
            )}
          </>
        )}
      </main>

      {/* Rodapé Acadêmico */}
      <footer className="py-6 border-t border-slate-900 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Escape Room Híbrido &bull; Métodos e Técnicas de Pesquisa em Administração
          </span>
          <button
            type="button"
            onClick={() => setIsAdminModalOpen(true)}
            className="hover:text-cyan-400 underline underline-offset-2 transition"
          >
            Painel do Docente (/admin)
          </button>
        </div>
      </footer>

      {/* Modal de Autenticação do Professor */}
      <ModalAdminAuth
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={handleAdminSuccess}
      />

    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
