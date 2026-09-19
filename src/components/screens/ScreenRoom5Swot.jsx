import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ROOMS_CONFIG } from '../../data/gameData';
import { 
  ShieldAlert, 
  MapPin, 
  Calculator, 
  Send, 
  Flame
} from 'lucide-react';

export default function ScreenRoom5Swot() {
  const { 
    teamName, 
    submitSwotDiagnostic, 
    isShaking 
  } = useGame();

  const teamKey = teamName?.toLowerCase().includes('alfa') ? 'alfa' : 'beta';
  const isAlfa = teamKey === 'alfa';
  const swotData = ROOMS_CONFIG[5]?.[teamKey];

  const [answers, setAnswers] = useState({
    diag1: '',
    diag2: '',
    diag3: ''
  });
  const [submitting, setSubmitting] = useState(false);

  if (!swotData) {
    return <div className="p-8 text-center text-rose-400">Erro: Sala 5 não configurada.</div>;
  }

  const handleSelectAnswer = (diagId, value) => {
    setAnswers(prev => ({ ...prev, [diagId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answers.diag1 || !answers.diag2 || !answers.diag3 || submitting) return;
    setSubmitting(true);
    await submitSwotDiagnostic(answers);
    setSubmitting(false);
  };

  const isFormComplete = answers.diag1 && answers.diag2 && answers.diag3;

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 sm:py-10 transition-transform ${isShaking ? 'animate-shake' : ''}`}>
      
      {/* Cabeçalho da Sala 5 */}
      <div className="mb-6 sm:mb-8 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-950/70 text-rose-300 border border-rose-700/60 animate-pulse">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          Fase Final Decisiva: Desafio do Cofre (+3 pts)
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-tech text-white uppercase tracking-tight">
          Sala 5: O Cofre Estratégico
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Diagnóstico Quantitativo e Matriz SWOT Combinada (Forças, Fraquezas, Oportunidades e Ameaças)
        </p>
      </div>

      {/* Pista de Campo Física (Enigma) */}
      <div className={`p-5 sm:p-7 rounded-2xl border mb-6 ${
        isAlfa 
          ? 'bg-gradient-to-br from-cyan-950/50 via-slate-900 to-slate-900 border-cyan-500 glow-cyan' 
          : 'bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-900 border-amber-500 glow-amber'
      }`}>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-cyan-400">
          <MapPin className="w-4 h-4 animate-bounce" />
          <span>Missão de Campo: O Enigma dos 4 Quadrantes</span>
        </div>
        <h3 className="text-base sm:text-xl font-bold text-white mb-2 leading-relaxed">
          {swotData.fieldClue}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Decifre o local, encontre os valores numéricos dos 4 quadrantes da Matriz e utilize seus conhecimentos acadêmicos para determinar os 3 diagnósticos estratégicos abaixo.
        </p>
      </div>

      {/* Formulário dos 3 Diagnósticos Estratégicos */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/90 border border-slate-800 p-5 sm:p-8 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm sm:text-base font-bold text-slate-200 uppercase tracking-wider">
              Diagnósticos Estratégicos do Cofre
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/60">
            Vale +3 Pontos
          </span>
        </div>

        <div className="space-y-6">
          {swotData.diagnostics.map((diag) => (
            <div key={diag.id} className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold text-slate-100">
                  {diag.label}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {diag.options.map((opt) => {
                  const isSelected = answers[diag.id] === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected 
                          ? isAlfa
                            ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-sm shadow-cyan-500/10'
                            : 'bg-amber-950/80 border-amber-500 text-white shadow-sm shadow-amber-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={diag.id}
                        value={opt.value}
                        checked={isSelected}
                        onChange={() => handleSelectAnswer(diag.id, opt.value)}
                        className="hidden"
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        isSelected 
                          ? isAlfa ? 'border-cyan-400 bg-cyan-400' : 'border-amber-400 bg-amber-400' 
                          : 'border-slate-600'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Botão Final de Submissão */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 text-center sm:text-left">
              O cronômetro será congelado no exato instante da confirmação bem-sucedida.
            </span>

            <button
              type="submit"
              disabled={!isFormComplete || submitting}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold font-tech text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all transform active:scale-95 shadow-2xl ${
                isAlfa
                  ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed glow-cyan'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed glow-amber'
              }`}
            >
              <Send className="w-5 h-5" />
              <span>{submitting ? 'Processando Diagnóstico...' : 'Enviar Diagnóstico Estratégico e Finalizar'}</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
