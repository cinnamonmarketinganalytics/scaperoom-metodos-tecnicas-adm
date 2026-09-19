import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Clock, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  RotateCcw, 
  Sparkles,
  Share2
} from 'lucide-react';

export default function ScreenVictory({ onOpenAdmin }) {
  const { 
    teamName, 
    score, 
    errorsCount, 
    correctCount, 
    members, 
    elapsedTime, 
    formatTime,
    returnToHome
  } = useGame();

  const isAlfa = teamName?.toLowerCase().includes('alfa');

  const triggerConfetti = () => {
    try {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  };

  useEffect(() => {
    triggerConfetti();
    const interval = setInterval(triggerConfetti, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-14 text-center">
      {/* Badge de Conclusão */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 glow-emerald animate-pulse">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        Missão Concluída com Honra!
      </div>

      <h1 className="text-3xl sm:text-6xl font-black font-tech uppercase text-white tracking-tight mb-2">
        Parabéns, <span className={isAlfa ? 'text-cyan-400' : 'text-amber-400'}>{teamName}</span>!
      </h1>
      <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8">
        Vocês desvendaram todos os enigmas epistemológicos, superaram os desafios físicos no campus e decifraram o Cofre Estratégico com maestria.
      </p>

      {/* Card Central com os Resultados */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-md relative overflow-hidden">
        
        {/* Glow decorativo de fundo */}
        <div className={`absolute -top-24 -left-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isAlfa ? 'bg-cyan-500' : 'bg-amber-500'
        }`} />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none bg-emerald-500" />

        <div className="relative z-10 space-y-8">
          
          {/* Métricas Principais: Pontuação e Tempo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Pontuação Final */}
            <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center ${
              score >= 0 
                ? 'bg-emerald-950/40 border-emerald-700/60 glow-emerald' 
                : 'bg-rose-950/40 border-rose-700/60 glow-red'
            }`}>
              <Trophy className="w-8 h-8 text-amber-400 mb-2 animate-bounce" />
              <span className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                Pontuação Final
              </span>
              <span className="font-mono-code text-4xl sm:text-5xl font-black text-white my-1">
                {score}
              </span>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
                Pontos Conquistados
              </span>
            </div>

            {/* Tempo Total */}
            <div className="p-6 rounded-2xl border bg-slate-950/80 border-slate-800 flex flex-col items-center justify-center">
              <Clock className="w-8 h-8 text-cyan-400 mb-2" />
              <span className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                Tempo Total Decorrido
              </span>
              <span className="font-mono-code text-4xl sm:text-5xl font-black text-slate-100 my-1">
                {formatTime(elapsedTime)}
              </span>
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
                Cronômetro Congelado
              </span>
            </div>

          </div>

          {/* Estatísticas de Acertos e Erros */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-800">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-600 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xl font-bold font-mono-code text-white block">
                  {correctCount}
                </span>
                <span className="text-xs text-slate-400">Resoluções Corretas</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-600 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xl font-bold font-mono-code text-white block">
                  {errorsCount}
                </span>
                <span className="text-xs text-slate-400">Tentativas Incorretas</span>
              </div>
            </div>
          </div>

          {/* Integrantes Registrados */}
          {members && members.length > 0 && (
            <div className="text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                <Users className="w-4 h-4 text-slate-400" />
                <span>Integrantes da {teamName}:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {members.map((name, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={returnToHome}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Voltar ao Início (Escolher Equipe)
            </button>
            <button
              type="button"
              onClick={triggerConfetti}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition"
            >
              Comemorar Novamente 🎉
            </button>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 font-bold text-xs uppercase tracking-wider transition"
            >
              Painel do Professor
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
