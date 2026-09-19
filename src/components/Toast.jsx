import React from 'react';
import { useGame } from '../context/GameContext';
import { AlertTriangle, CheckCircle, Info, Sparkles } from 'lucide-react';

export default function Toast() {
  const { toast } = useGame();

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed top-24 sm:top-28 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 animate-bounce">
      <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border shadow-2xl backdrop-blur-md ${
        isError 
          ? 'bg-rose-950/95 border-rose-500 text-rose-100 glow-red' 
          : isSuccess 
            ? 'bg-emerald-950/95 border-emerald-500 text-emerald-100 glow-emerald' 
            : 'bg-slate-900/95 border-cyan-500 text-cyan-100 glow-cyan'
      }`}>
        <div className="flex-shrink-0">
          {isError && <AlertTriangle className="w-6 h-6 text-rose-400 animate-pulse" />}
          {isSuccess && <CheckCircle className="w-6 h-6 text-emerald-400" />}
          {!isError && !isSuccess && <Info className="w-6 h-6 text-cyan-400" />}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {toast.points && (
              <span className={`px-2 py-0.5 rounded text-xs font-black uppercase font-mono-code ${
                isError 
                  ? 'bg-rose-600 text-white' 
                  : isSuccess 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-cyan-600 text-white'
              }`}>
                {toast.points} {toast.points.includes('Ponto') ? '' : 'PONTOS'}
              </span>
            )}
            <span className="font-tech tracking-wider text-xs uppercase opacity-80">
              {isError ? 'Penalidade Aplicada' : isSuccess ? 'Progresso Concluído' : 'Notificação'}
            </span>
          </div>
          <p className="text-sm font-semibold mt-0.5 max-w-sm sm:max-w-md">
            {toast.message}
          </p>
        </div>
      </div>
    </div>
  );
}
