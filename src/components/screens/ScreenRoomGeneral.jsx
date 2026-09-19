import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ROOMS_CONFIG } from '../../data/gameData';
import { 
  CheckCircle2, 
  MapPin, 
  KeyRound, 
  ArrowRight, 
  HelpCircle, 
  Sparkles, 
  AlertCircle,
  Binary,
  Compass,
  Cpu,
  Eye,
  ShieldCheck
} from 'lucide-react';

const iconMap = {
  Binary,
  Compass,
  Cpu,
  Eye,
  ShieldCheck
};

export default function ScreenRoomGeneral({ roomNumber }) {
  const { 
    teamName, 
    answeredTheory, 
    submitTheoreticalAnswer, 
    submitRoomCode,
    isShaking 
  } = useGame();

  const teamKey = teamName?.toLowerCase().includes('alfa') ? 'alfa' : 'beta';
  const isAlfa = teamKey === 'alfa';
  const roomData = ROOMS_CONFIG[roomNumber];
  const teamRoomData = roomData?.[teamKey];

  const [selectedOption, setSelectedOption] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [submittingTheory, setSubmittingTheory] = useState(false);
  const [submittingCode, setSubmittingCode] = useState(false);

  if (!roomData || !teamRoomData) {
    return <div className="p-8 text-center text-rose-400">Erro: Sala não configurada.</div>;
  }

  const isTheoryCompleted = answeredTheory[roomNumber] === true;
  const RoomIcon = iconMap[roomData.iconName] || Binary;

  const handleConfirmTheory = async (e) => {
    e.preventDefault();
    if (!selectedOption || submittingTheory) return;
    setSubmittingTheory(true);
    await submitTheoreticalAnswer(roomNumber, selectedOption);
    setSubmittingTheory(false);
  };

  const handleConfirmCode = async (e) => {
    e.preventDefault();
    if (!enteredCode.trim() || submittingCode) return;
    setSubmittingCode(true);
    await submitRoomCode(roomNumber, enteredCode);
    setSubmittingCode(false);
  };

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 sm:py-10 transition-transform ${isShaking ? 'animate-shake' : ''}`}>
      
      {/* Cabeçalho da Sala */}
      <div className="mb-6 sm:mb-8 text-center space-y-2">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
          isAlfa 
            ? 'bg-cyan-950/60 text-cyan-300 border-cyan-700/60' 
            : 'bg-amber-950/60 text-amber-300 border-amber-700/60'
        }`}>
          <RoomIcon className="w-3.5 h-3.5" />
          Fase {roomNumber} de 5
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-tech text-white uppercase tracking-tight">
          {roomData.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          {roomData.subtitle}
        </p>
      </div>

      <div className="space-y-6">
        
        {/* PARTE 1: Enigma Epistemológico Teórico */}
        <div className={`p-5 sm:p-7 rounded-2xl border transition-all ${
          isTheoryCompleted 
            ? 'bg-slate-900/60 border-emerald-800/60' 
            : 'bg-slate-900/90 border-slate-800 shadow-xl'
        }`}>
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold flex items-center justify-center text-slate-300 font-mono-code">
                1
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-200 uppercase tracking-wider">
                Desafio Teórico Fundamental (+1 pt)
              </h3>
            </div>
            {isTheoryCompleted && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-700/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Validado (+1)
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed mb-5">
            {teamRoomData.question}
          </p>

          {!isTheoryCompleted ? (
            <form onSubmit={handleConfirmTheory} className="space-y-4">
              <div className="space-y-2.5">
                {teamRoomData.options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? isAlfa
                            ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-md shadow-cyan-500/10'
                            : 'bg-amber-950/80 border-amber-500 text-white shadow-md shadow-amber-500/10'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-950'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`theory-${roomNumber}`}
                        value={option}
                        checked={isSelected}
                        onChange={() => setSelectedOption(option)}
                        className="hidden"
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        isSelected 
                          ? isAlfa 
                            ? 'border-cyan-400 bg-cyan-400' 
                            : 'border-amber-400 bg-amber-400' 
                          : 'border-slate-600 bg-transparent'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Atenção: respostas erradas deduzem 1 ponto do placar da equipe!
                </span>
                <button
                  type="submit"
                  disabled={!selectedOption || submittingTheory}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition transform active:scale-95 shadow-lg ${
                    isAlfa
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed glow-cyan'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed glow-amber'
                  }`}
                >
                  {submittingTheory ? 'Validando...' : 'Confirmar Resposta'}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs sm:text-sm text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>Resposta confirmada: <strong>{teamRoomData.correctAnswer}</strong>. Siga para a pista física abaixo.</span>
            </div>
          )}
        </div>

        {/* PARTE 2: Pista Física & Validador de Código */}
        {isTheoryCompleted ? (
          <div className="space-y-6 animate-fade-in">
            {/* Card da Pista Física */}
            <div className={`p-5 sm:p-6 rounded-2xl border ${
              isAlfa 
                ? 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border-cyan-600/50 glow-cyan' 
                : 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border-amber-600/50 glow-amber'
            }`}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-cyan-400">
                <MapPin className="w-4 h-4 animate-bounce" />
                <span>Enigma de Campo (Local Oculto no Campus)</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-2 leading-relaxed">
                {teamRoomData.fieldClue}
              </h4>
              <p className="text-xs text-slate-400">
                Decifre o enigma acima para descobrir onde investigar no campus e encontrar o código físico lacrado.
              </p>
            </div>

            {/* Validador de Código */}
            <div className="p-5 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold flex items-center justify-center text-slate-300 font-mono-code">
                  2
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyan-400" />
                  Validador de Código da Sala {roomNumber} (+1 pt)
                </h3>
              </div>

              <form onSubmit={handleConfirmCode} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Digite o Código Encontrado:
                  </label>
                  <input
                    type="text"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value.toUpperCase())}
                    placeholder="DIGITE-O-CODIGO-AQUI"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 font-mono-code text-base sm:text-lg tracking-widest text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 uppercase transition"
                  />
                  <p className="text-[11px] font-mono-code text-cyan-400/90 mt-1.5 font-semibold">
                    {teamRoomData.codeHint}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    Código incorreto deduz 1 ponto do placar.
                  </span>
                  <button
                    type="submit"
                    disabled={!enteredCode.trim() || submittingCode}
                    className={`px-6 py-3 rounded-xl font-bold font-tech text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition transform active:scale-95 shadow-xl ${
                      isAlfa
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed glow-cyan'
                        : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed glow-amber'
                    }`}
                  >
                    <span>{submittingCode ? 'Checando...' : 'Desbloquear Próxima Sala'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-2">
            <KeyRound className="w-8 h-8 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Pista de Campo Bloqueada
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Responda corretamente à questão teórica acima para liberar as coordenadas físicas da pista e o validador de acesso.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
