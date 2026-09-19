import React, { useState, useEffect } from 'react';
import { db, doc, onSnapshot, getTeamDocRef } from '../../firebase';
import { useGame } from '../../context/GameContext';
import { 
  ShieldCheck, 
  RotateCcw, 
  Clock, 
  Trophy, 
  AlertTriangle, 
  Users, 
  ArrowLeft, 
  CheckCircle2, 
  Flame, 
  Activity,
  Award,
  Layers,
  Trash2
} from 'lucide-react';

export default function ScreenAdmin({ onExitAdmin }) {
  const { resetSession, resetAllSessions, formatTime } = useGame();

  const [alfaData, setAlfaData] = useState(null);
  const [betaData, setBetaData] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [confirmResetTeam, setConfirmResetTeam] = useState(null);

  // Atualizar relógio em tempo real a cada segundo para calcular o tempo decorrido de ambas as equipes
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Escutar Firestore em tempo real para 'alfa' e 'beta'
  useEffect(() => {
    const unsubAlfa = onSnapshot(doc(db, "sessions", "alfa"), (snap) => {
      if (snap.exists()) {
        setAlfaData(snap.data());
      } else {
        setAlfaData({
          teamName: 'Equipe Alfa',
          status: 'idle',
          currentRoom: 1,
          score: 0,
          errorsCount: 0,
          members: []
        });
      }
    }, (err) => {
      console.warn("Erro ao ouvir equipe Alfa:", err);
    });

    const unsubBeta = onSnapshot(doc(db, "sessions", "beta"), (snap) => {
      if (snap.exists()) {
        setBetaData(snap.data());
      } else {
        setBetaData({
          teamName: 'Equipe Beta',
          status: 'idle',
          currentRoom: 1,
          score: 0,
          errorsCount: 0,
          members: []
        });
      }
    }, (err) => {
      console.warn("Erro ao ouvir equipe Beta:", err);
    });

    return () => {
      unsubAlfa();
      unsubBeta();
    };
  }, []);

  const computeElapsed = (session) => {
    if (!session || session.status === 'idle' || !session.startedAt) return '00:00:00';
    if (session.status === 'completed' && session.completedAt) {
      return formatTime(Math.floor((session.completedAt - session.startedAt) / 1000));
    }
    return formatTime(Math.floor((now - session.startedAt) / 1000));
  };

  const handleReset = async (teamKey) => {
    if (teamKey === 'all') {
      await resetAllSessions();
    } else {
      await resetSession(teamKey);
    }
    setConfirmResetTeam(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Barra de Topo do Admin */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-950/90 border border-cyan-700/60 rounded-xl text-cyan-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-tech text-white uppercase tracking-tight">
                Painel do Professor
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-700/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Firestore
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Monitoramento em tempo real do Escape Room | Métodos & Técnicas ADM
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setConfirmResetTeam('all')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-700/60 text-xs font-bold uppercase tracking-wider transition glow-red shadow-lg transform active:scale-95"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            Apagar Todas as Tentativas
          </button>

          <button
            type="button"
            onClick={onExitAdmin}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold uppercase tracking-wider transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Jogo
          </button>
        </div>
      </div>

      {/* Cards de Monitoramento das Duas Equipes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10">
        
        {/* CARD EQUIPE ALFA */}
        <div className="bg-slate-900/90 border-2 border-cyan-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 animate-pulse" />
              <h2 className="text-xl font-black font-tech text-cyan-300 uppercase tracking-wide">
                Equipe Alfa
              </h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              alfaData?.status === 'completed'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : alfaData?.status === 'running'
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-600 animate-pulse'
                  : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}>
              {alfaData?.status === 'completed' ? 'Missão Concluída' : alfaData?.status === 'running' ? 'Em Andamento' : 'Aguardando Início'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
            
            {/* Sala Atual */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sala Atual</span>
              </div>
              <span className="text-xl sm:text-2xl font-black font-tech text-white">
                {alfaData?.status === 'completed' ? '5 (Concluída)' : `Sala ${alfaData?.currentRoom || 1}`}
              </span>
            </div>

            {/* Tempo Decorrido */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cronômetro</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold font-mono-code text-cyan-300">
                {computeElapsed(alfaData)}
              </span>
            </div>

            {/* Pontuação */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Pontuação</span>
              </div>
              <span className={`text-xl sm:text-2xl font-bold font-mono-code ${
                (alfaData?.score ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {alfaData?.score ?? 0} pts
              </span>
            </div>

            {/* Quantidade de Erros */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Erros Cometidos</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold font-mono-code text-rose-400">
                {alfaData?.errorsCount ?? 0}
              </span>
            </div>

          </div>

          {/* Integrantes */}
          <div className="mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Integrantes ({alfaData?.members?.length || 0}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {alfaData?.members && alfaData.members.length > 0 ? (
                alfaData.members.map((m, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-slate-950 text-xs text-slate-300 border border-slate-800">
                    {m}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-600 italic">Nenhum integrante cadastrado</span>
              )}
            </div>
          </div>

          {/* Botão de Reset */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setConfirmResetTeam('alfa')}
              className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-800/80 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Resetar Sessão da Equipe Alfa
            </button>
          </div>
        </div>

        {/* CARD EQUIPE BETA */}
        <div className="bg-slate-900/90 border-2 border-amber-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400 animate-pulse" />
              <h2 className="text-xl font-black font-tech text-amber-300 uppercase tracking-wide">
                Equipe Beta
              </h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              betaData?.status === 'completed'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : betaData?.status === 'running'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-600 animate-pulse'
                  : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}>
              {betaData?.status === 'completed' ? 'Missão Concluída' : betaData?.status === 'running' ? 'Em Andamento' : 'Aguardando Início'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
            
            {/* Sala Atual */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Sala Atual</span>
              </div>
              <span className="text-xl sm:text-2xl font-black font-tech text-white">
                {betaData?.status === 'completed' ? '5 (Concluída)' : `Sala ${betaData?.currentRoom || 1}`}
              </span>
            </div>

            {/* Tempo Decorrido */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Cronômetro</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold font-mono-code text-amber-300">
                {computeElapsed(betaData)}
              </span>
            </div>

            {/* Pontuação */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Pontuação</span>
              </div>
              <span className={`text-xl sm:text-2xl font-bold font-mono-code ${
                (betaData?.score ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {betaData?.score ?? 0} pts
              </span>
            </div>

            {/* Quantidade de Erros */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Erros Cometidos</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold font-mono-code text-rose-400">
                {betaData?.errorsCount ?? 0}
              </span>
            </div>

          </div>

          {/* Integrantes */}
          <div className="mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Integrantes ({betaData?.members?.length || 0}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {betaData?.members && betaData.members.length > 0 ? (
                betaData.members.map((m, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-slate-950 text-xs text-slate-300 border border-slate-800">
                    {m}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-600 italic">Nenhum integrante cadastrado</span>
              )}
            </div>
          </div>

          {/* Botão de Reset */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setConfirmResetTeam('beta')}
              className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-800/80 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Resetar Sessão da Equipe Beta
            </button>
          </div>
        </div>

      </div>

      {/* Modal de Confirmação de Reset */}
      {confirmResetTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-white text-base font-tech">Confirmar Reset</h3>
            </div>
            <p className="text-xs text-slate-300">
              {confirmResetTeam === 'all' ? (
                <span>
                  Tem certeza que deseja <strong>apagar e zerar as tentativas de AMBAS as equipes</strong> (Alfa e Beta)? Todos os placares, erros, tempos e salas serão reiniciados a zero.
                </span>
              ) : (
                <span>
                  Tem certeza que deseja resetar completamente a sessão da <strong>Equipe {confirmResetTeam.toUpperCase()}</strong>? O placar, timer e sala serão reiniciados a zero.
                </span>
              )}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmResetTeam(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleReset(confirmResetTeam)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider"
              >
                {confirmResetTeam === 'all' ? 'Sim, Apagar Tudo' : 'Sim, Resetar Sessão'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
