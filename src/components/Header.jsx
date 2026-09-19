import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  Clock, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Shield, 
  CheckCircle2, 
  Lock, 
  Flame,
  Users,
  Settings
} from 'lucide-react';

export default function Header({ onOpenAdmin }) {
  const { 
    teamName, 
    currentRoom, 
    score, 
    elapsedTime, 
    formatTime, 
    status,
    soundEnabled,
    setSoundEnabled 
  } = useGame();

  if (status === 'idle') {
    return null;
  }

  const isAlfa = teamName?.toLowerCase().includes('alfa');
  const accentColor = isAlfa ? 'cyan' : 'amber';

  const roomNames = [
    { num: 1, label: 'Gênese' },
    { num: 2, label: 'Matrizes' },
    { num: 3, label: 'Labirinto' },
    { num: 4, label: 'Observação' },
    { num: 5, label: 'Cofre SWOT' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        {/* Linha Superior: Equipe, Timer, Pontuação e Controles */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Badge da Equipe */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold tracking-wide border ${
              isAlfa 
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60 glow-cyan' 
                : 'bg-amber-950/80 text-amber-300 border-amber-700/60 glow-amber'
            }`}>
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{teamName}</span>
            </div>
          </div>

          {/* Cronômetro Digital Contínuo */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-lg bg-slate-900 border border-slate-800 shadow-inner font-mono-code text-base sm:text-xl font-bold">
            <Clock className={`w-4 h-4 sm:w-5 sm:h-5 ${status === 'running' ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
            <span className={status === 'completed' ? 'text-emerald-400' : 'text-slate-100'}>
              {formatTime(elapsedTime)}
            </span>
          </div>

          {/* Pontuação e Botões de Ação */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Badge de Pontuação */}
            <div className={`flex items-center gap-1 sm:gap-1.5 px-3 py-1 rounded-lg border font-bold text-xs sm:text-sm transition-all ${
              score > 0 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 glow-emerald' 
                : score < 0 
                  ? 'bg-rose-950/80 text-rose-300 border-rose-700/60 glow-red' 
                  : 'bg-slate-900 text-slate-300 border-slate-700'
            }`}>
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>Score:</span>
              <span className="font-mono-code text-sm sm:text-base font-extrabold">{score}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 hidden sm:inline">pts</span>
            </div>

            {/* Alternador de Som */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Desativar Som" : "Ativar Som"}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
            </button>

            {/* Painel do Professor */}
            <button
              type="button"
              onClick={onOpenAdmin}
              title="Acesso do Professor"
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Linha Inferior: Barra de Progresso das 5 Salas */}
        <div className="mt-2 sm:mt-3 pt-2 border-t border-slate-900">
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {roomNames.map((room) => {
              const isDone = currentRoom > room.num || status === 'completed';
              const isCurrent = currentRoom === room.num && status !== 'completed';
              const isLocked = currentRoom < room.num;

              return (
                <div 
                  key={room.num}
                  className={`flex flex-col items-center justify-center py-1 sm:py-1.5 px-1 rounded-md text-[10px] sm:text-xs font-semibold transition-all border ${
                    isDone 
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60' 
                      : isCurrent 
                        ? isAlfa 
                          ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500 shadow-sm shadow-cyan-500/20 scale-[1.02]'
                          : 'bg-amber-950/70 text-amber-300 border-amber-500 shadow-sm shadow-amber-500/20 scale-[1.02]'
                        : 'bg-slate-900/50 text-slate-600 border-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {isDone ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : isCurrent ? (
                      <Flame className={`w-3 h-3 animate-pulse ${isAlfa ? 'text-cyan-400' : 'text-amber-400'}`} />
                    ) : (
                      <Lock className="w-3 h-3 text-slate-600" />
                    )}
                    <span className="hidden sm:inline">Sala {room.num}</span>
                    <span className="sm:hidden">S{room.num}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 truncate max-w-full hidden md:block">
                    {room.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </header>
  );
}
