import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Users, 
  Play, 
  Plus, 
  Trash2, 
  Sparkles, 
  BookOpen, 
  Timer, 
  ShieldAlert, 
  Compass, 
  Check,
  Award
} from 'lucide-react';

export default function ScreenRegistration({ onOpenAdmin }) {
  const { startChallenge } = useGame();

  const [selectedTeam, setSelectedTeam] = useState('Equipe Alfa');
  const [members, setMembers] = useState(['', '', '']); // 3 padrão, até 6
  const [errorValidation, setErrorValidation] = useState('');

  const handleAddMember = () => {
    if (members.length < 6) {
      setMembers([...members, '']);
    }
  };

  const handleRemoveMember = (index) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const handleMemberChange = (index, value) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
    if (errorValidation) setErrorValidation('');
  };

  const handleStart = (e) => {
    e.preventDefault();
    const validMembers = members.map(m => m.trim()).filter(Boolean);

    if (validMembers.length === 0) {
      setErrorValidation('Cadastre ao menos 1 integrante da equipe para iniciar o desafio.');
      return;
    }

    startChallenge(selectedTeam, validMembers);
  };

  const isAlfa = selectedTeam === 'Equipe Alfa';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Cabeçalho de Boas-vindas */}
      <div className="text-center space-y-3 mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold uppercase tracking-widest text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          Desafio Acadêmico Híbrido em Tempo Real
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-tech tracking-tight text-white uppercase">
          Escape Room <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">ADM</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          Métodos e Técnicas de Pesquisa em Administração. Valide seu conhecimento epistemológico, decifre enigmas físicos no campus e dispute o topo do ranking!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Formulário de Cadastro */}
        <div className="md:col-span-7 bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-md">
          <form onSubmit={handleStart} className="space-y-6">
            
            {/* Escolha da Equipe */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                1. Selecione a sua Equipe
              </label>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Equipe Alfa */}
                <button
                  type="button"
                  onClick={() => setSelectedTeam('Equipe Alfa')}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                    isAlfa 
                      ? 'bg-cyan-950/60 border-cyan-500 glow-cyan scale-[1.02]' 
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-tech text-base sm:text-lg font-bold text-cyan-300">
                      Equipe Alfa
                    </span>
                    {isAlfa && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Trilha Estratégica Setzer & Filosofia
                  </span>
                </button>

                {/* Equipe Beta */}
                <button
                  type="button"
                  onClick={() => setSelectedTeam('Equipe Beta')}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                    !isAlfa 
                      ? 'bg-amber-950/60 border-amber-500 glow-amber scale-[1.02]' 
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-tech text-base sm:text-lg font-bold text-amber-300">
                      Equipe Beta
                    </span>
                    {!isAlfa && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Trilha Termodinâmica & Ciência
                  </span>
                </button>
              </div>
            </div>

            {/* Cadastro dos Integrantes */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  2. Integrantes do Grupo ({members.length}/6)
                </label>
                {members.length < 6 && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Adicionar
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {members.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-mono-code text-slate-500 w-5 text-right font-bold">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      value={member}
                      onChange={(e) => handleMemberChange(idx, e.target.value)}
                      placeholder={`Nome do participante ${idx + 1}...`}
                      className="flex-1 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                    />
                    {members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="p-2 text-slate-500 hover:text-rose-400 rounded-lg transition"
                        title="Remover participante"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {errorValidation && (
                <p className="text-xs font-semibold text-rose-400 mt-2">
                  {errorValidation}
                </p>
              )}
            </div>

            {/* Botão de Iniciar */}
            <div className="pt-2">
              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-bold font-tech uppercase tracking-wider text-base sm:text-lg flex items-center justify-center gap-2 shadow-2xl transition-all transform active:scale-98 ${
                  isAlfa
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 glow-cyan'
                    : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 glow-amber'
                }`}
              >
                <Play className="w-5 h-5 fill-current" />
                Iniciar Desafio ({selectedTeam})
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2">
                O cronômetro iniciará imediatamente ao clicar.
              </p>
            </div>

          </form>
        </div>

        {/* Card de Regras e Sistema de Pontuação */}
        <div className="md:col-span-5 space-y-4">
          
          <div className="bg-slate-900/80 border border-slate-800/80 p-5 sm:p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-amber-400" />
              Regras e Sistema de Pontos
            </h3>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  +1
                </div>
                <span>
                  <strong>Resposta Correta ou Código Válido:</strong> +1 ponto e desbloqueio imediato da próxima fase.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-rose-950 border border-rose-600 text-rose-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  -1
                </div>
                <span>
                  <strong>Erro Teórico ou Código Inválido:</strong> -1 ponto com penalidade e aviso na tela.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-600 text-cyan-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  +3
                </div>
                <span>
                  <strong>Sala 5 (Cofre Estratégico):</strong> Diagnóstico SWOT combinado correto concede +3 pontos e finaliza a missão.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <Timer className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>
                  <strong>Critério de Desempate:</strong> Maior pontuação total; em caso de empate, menor tempo total decorrido.
                </span>
              </li>
            </ul>
          </div>

          {/* Botão de Acesso do Professor */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-xs text-slate-500 hover:text-cyan-400 underline underline-offset-4 transition"
            >
              É o Professor da disciplina? Acesse o Painel de Monitoramento (/admin)
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
