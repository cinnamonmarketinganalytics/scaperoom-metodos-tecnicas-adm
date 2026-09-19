import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { getTeamDocRef, setDoc, updateDoc, onSnapshot } from '../firebase';
import { ROOMS_CONFIG } from '../data/gameData';
import { playCorrectSound, playErrorSound, playVictorySound } from '../utils/soundEffects';

const LOCAL_STORAGE_KEY = 'scaperoom_metodos_tecnicas_state_v1';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  // Estado básico
  const [teamName, setTeamName] = useState(null); // 'Equipe Alfa' | 'Equipe Beta'
  const [members, setMembers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(1); // 1 a 5, 6 = Vitória
  const [score, setScore] = useState(0);
  const [errorsCount, setErrorsCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [status, setStatus] = useState('idle'); // 'idle' | 'running' | 'completed'
  const [startedAt, setStartedAt] = useState(null);
  const [completedAt, setCompletedAt] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Registro de quais perguntas teóricas já foram acertadas (para liberar a pista do código)
  const [answeredTheory, setAnsweredTheory] = useState({
    1: false,
    2: false,
    3: false,
    4: false
  });

  // Efeitos visuais (Shake e Toast)
  const [isShaking, setIsShaking] = useState(false);
  const [toast, setToast] = useState(null); // { id, message, points, type: 'error' | 'success' }
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Carregar do LocalStorage na inicialização
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.teamName) setTeamName(data.teamName);
        if (data.members) setMembers(data.members);
        if (data.currentRoom) setCurrentRoom(data.currentRoom);
        if (typeof data.score === 'number') setScore(data.score);
        if (typeof data.errorsCount === 'number') setErrorsCount(data.errorsCount);
        if (typeof data.correctCount === 'number') setCorrectCount(data.correctCount);
        if (data.status) setStatus(data.status);
        if (data.startedAt) setStartedAt(data.startedAt);
        if (data.completedAt) setCompletedAt(data.completedAt);
        if (data.answeredTheory) setAnsweredTheory(data.answeredTheory);
      }
    } catch (e) {
      console.error('Erro ao ler LocalStorage:', e);
    }
  }, []);

  // Salvar no LocalStorage sempre que o estado principal mudar
  useEffect(() => {
    if (!teamName) return;
    try {
      const stateToSave = {
        teamName,
        members,
        currentRoom,
        score,
        errorsCount,
        correctCount,
        status,
        startedAt,
        completedAt,
        answeredTheory
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Erro ao salvar no LocalStorage:', e);
    }
  }, [teamName, members, currentRoom, score, errorsCount, correctCount, status, startedAt, completedAt, answeredTheory]);

  // Sincronização em tempo real com o Firestore para a equipe selecionada
  useEffect(() => {
    if (!teamName) return;
    const teamKey = teamName.toLowerCase().includes('alfa') ? 'alfa' : 'beta';
    const docRef = getTeamDocRef(teamKey);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const remote = docSnap.data();
        // Se a sessão foi resetada pelo professor no admin
        if (remote.status === 'idle' && status !== 'idle') {
          setStatus('idle');
          setTeamName(null);
          setMembers([]);
          setCurrentRoom(1);
          setScore(0);
          setErrorsCount(0);
          setCorrectCount(0);
          setStartedAt(null);
          setCompletedAt(null);
          setAnsweredTheory({ 1: false, 2: false, 3: false, 4: false });
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          showToast('Sessão resetada pelo Professor.', '0', 'info');
        }
      }
    }, (err) => {
      console.warn('Escuta em tempo real Firestore:', err);
    });

    return () => unsubscribe();
  }, [teamName, status]);

  // Cronômetro digital contínuo
  useEffect(() => {
    let interval = null;

    if (status === 'running' && startedAt) {
      // Atualização imediata
      setElapsedTime(Math.floor((Date.now() - startedAt) / 1000));

      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startedAt) / 1000));
      }, 1000);
    } else if (status === 'completed' && startedAt && completedAt) {
      setElapsedTime(Math.floor((completedAt - startedAt) / 1000));
    } else if (status === 'idle') {
      setElapsedTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, startedAt, completedAt]);

  // Exibir Toast com auto-dismiss
  const showToast = useCallback((message, points, type = 'success') => {
    const id = Date.now();
    setToast({ id, message, points, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  }, []);

  // Disparar efeito de tremor
  const triggerShake = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }, []);

  // Formatar tempo em HH:MM:SS
  const formatTime = useCallback((totalSeconds) => {
    const s = Math.max(0, Math.floor(totalSeconds || 0));
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  }, []);

  // Iniciar Desafio
  const startChallenge = async (selectedTeam, membersList) => {
    const now = Date.now();
    const teamKey = selectedTeam.toLowerCase().includes('alfa') ? 'alfa' : 'beta';

    setTeamName(selectedTeam);
    setMembers(membersList);
    setStatus('running');
    setCurrentRoom(1);
    setScore(0);
    setErrorsCount(0);
    setCorrectCount(0);
    setStartedAt(now);
    setCompletedAt(null);
    setAnsweredTheory({ 1: false, 2: false, 3: false, 4: false });

    // Salvar no Firestore
    try {
      const docRef = getTeamDocRef(teamKey);
      await setDoc(docRef, {
        teamKey,
        teamName: selectedTeam,
        members: membersList,
        status: 'running',
        currentRoom: 1,
        score: 0,
        errorsCount: 0,
        correctCount: 0,
        startedAt: now,
        completedAt: null,
        totalTimeFormatted: '00:00:00',
        updatedAt: now
      }, { merge: true });
    } catch (e) {
      console.error('Erro ao iniciar no Firestore:', e);
    }

    if (soundEnabled) playCorrectSound();
    showToast(`Desafio iniciado! Boa sorte, ${selectedTeam}!`, '+0', 'info');
  };

  // Submeter Pergunta Teórica (Salas 1 a 4)
  const submitTheoreticalAnswer = async (roomNumber, selectedOption) => {
    if (status !== 'running') return;
    const teamKey = teamName.toLowerCase().includes('alfa') ? 'alfa' : 'beta';
    const roomConfig = ROOMS_CONFIG[roomNumber]?.[teamKey];

    if (!roomConfig) return;

    const isCorrect = selectedOption.trim().toLowerCase() === roomConfig.correctAnswer.trim().toLowerCase();

    if (isCorrect) {
      const newScore = score + 1;
      const newCorrect = correctCount + 1;
      setScore(newScore);
      setCorrectCount(newCorrect);
      setAnsweredTheory((prev) => ({ ...prev, [roomNumber]: true }));

      if (soundEnabled) playCorrectSound();
      showToast('Resposta Teórica Correta! Pista física liberada.', '+1', 'success');

      try {
        const docRef = getTeamDocRef(teamKey);
        await updateDoc(docRef, {
          score: newScore,
          correctCount: newCorrect,
          updatedAt: Date.now()
        });
      } catch (e) {
        console.error('Erro ao atualizar score no Firestore:', e);
      }
    } else {
      const newScore = score - 1;
      const newErrors = errorsCount + 1;
      setScore(newScore);
      setErrorsCount(newErrors);
      triggerShake();

      if (soundEnabled) playErrorSound();
      showToast('Resposta incorreta! Tente novamente.', '-1', 'error');

      try {
        const docRef = getTeamDocRef(teamKey);
        await updateDoc(docRef, {
          score: newScore,
          errorsCount: newErrors,
          updatedAt: Date.now()
        });
      } catch (e) {
        console.error('Erro ao atualizar erro no Firestore:', e);
      }
    }
  };

  // Submeter Código Físico de Validação da Sala (Salas 1 a 4)
  const submitRoomCode = async (roomNumber, enteredCode) => {
    if (status !== 'running') return;
    const teamKey = teamName.toLowerCase().includes('alfa') ? 'alfa' : 'beta';
    const roomConfig = ROOMS_CONFIG[roomNumber]?.[teamKey];

    if (!roomConfig) return;

    // Normalizar entrada (maiúsculo, sem espaços extras)
    const normalizedInput = enteredCode.trim().toUpperCase().replace(/\s+/g, '-');
    const normalizedExpected = roomConfig.secretCode.trim().toUpperCase();

    if (normalizedInput === normalizedExpected) {
      const newScore = score + 1;
      const newCorrect = correctCount + 1;
      const nextRoom = roomNumber + 1;

      setScore(newScore);
      setCorrectCount(newCorrect);
      setCurrentRoom(nextRoom);

      if (soundEnabled) playCorrectSound();
      showToast(`Código Válido! Acesso liberado para a Sala ${nextRoom}.`, '+1', 'success');

      try {
        const docRef = getTeamDocRef(teamKey);
        await updateDoc(docRef, {
          score: newScore,
          correctCount: newCorrect,
          currentRoom: nextRoom,
          updatedAt: Date.now()
        });
      } catch (e) {
        console.error('Erro ao avançar sala no Firestore:', e);
      }
    } else {
      const newScore = score - 1;
      const newErrors = errorsCount + 1;
      setScore(newScore);
      setErrorsCount(newErrors);
      triggerShake();

      if (soundEnabled) playErrorSound();
      showToast('Código de Sala Incorreto! Verifique a pista física.', '-1', 'error');

      try {
        const docRef = getTeamDocRef(teamKey);
        await updateDoc(docRef, {
          score: newScore,
          errorsCount: newErrors,
          updatedAt: Date.now()
        });
      } catch (e) {
        console.error('Erro ao atualizar erro de código no Firestore:', e);
      }
    }
  };

  // Submeter Sala 5 - Diagnóstico Estratégico SWOT (3 Perguntas)
  const submitSwotDiagnostic = async (answers) => {
    if (status !== 'running') return;
    const teamKey = teamName.toLowerCase().includes('alfa') ? 'alfa' : 'beta';
    const swotConfig = ROOMS_CONFIG[5]?.[teamKey];

    if (!swotConfig) return;

    const [diag1, diag2, diag3] = swotConfig.diagnostics;

    const is1Correct = String(answers.diag1 || '').trim() === diag1.correctValue;
    const is2Correct = String(answers.diag2 || '').trim() === diag2.correctValue;
    const is3Correct = String(answers.diag3 || '').trim() === diag3.correctValue;

    if (is1Correct && is2Correct && is3Correct) {
      const now = Date.now();
      const finalScore = score + 3;
      const newCorrect = correctCount + 3;
      const finalTimeSeconds = Math.floor((now - startedAt) / 1000);
      const totalTimeFormatted = formatTime(finalTimeSeconds);

      setScore(finalScore);
      setCorrectCount(newCorrect);
      setStatus('completed');
      setCompletedAt(now);
      setCurrentRoom(6); // 6 = Concluído / Tela de Vitória

      if (soundEnabled) playVictorySound();
      showToast('DIAGNÓSTICO ESTRATÉGICO EXATO! ESCAPE ROOM CONCLUÍDO!', '+3', 'success');

      try {
        const docRef = getTeamDocRef(teamKey);
        await updateDoc(docRef, {
          score: finalScore,
          finalScore: finalScore,
          correctCount: newCorrect,
          currentRoom: 6,
          status: 'completed',
          completedAt: now,
          totalTimeFormatted,
          totalTimeSeconds,
          updatedAt: now
        });
      } catch (e) {
        console.error('Erro ao finalizar no Firestore:', e);
      }
    } else {
      const newScore = score - 1;
      const newErrors = errorsCount + 1;
      setScore(newScore);
      setErrorsCount(newErrors);
      triggerShake();

      if (soundEnabled) playErrorSound();
      showToast('Um ou mais cálculos estratégicos estão incorretos! Revise as fórmulas.', '-1', 'error');

      try {
        const docRef = getTeamDocRef(teamKey);
        await updateDoc(docRef, {
          score: newScore,
          errorsCount: newErrors,
          updatedAt: Date.now()
        });
      } catch (e) {
        console.error('Erro ao salvar erro no Firestore:', e);
      }
    }
  };

  // Resetar Sessão (Usado no Admin ou em testes)
  const resetSession = async (targetTeamKey) => {
    const key = targetTeamKey ? targetTeamKey.toLowerCase() : (teamName?.toLowerCase().includes('alfa') ? 'alfa' : 'beta');
    const isCurrentTeam = teamName && teamName.toLowerCase().includes(key);

    try {
      const docRef = getTeamDocRef(key);
      await setDoc(docRef, {
        teamKey: key,
        teamName: key === 'alfa' ? 'Equipe Alfa' : 'Equipe Beta',
        members: [],
        status: 'idle',
        currentRoom: 1,
        score: 0,
        errorsCount: 0,
        correctCount: 0,
        startedAt: null,
        completedAt: null,
        totalTimeFormatted: '00:00:00',
        updatedAt: Date.now()
      });
    } catch (e) {
      console.error('Erro ao resetar no Firestore:', e);
    }

    if (isCurrentTeam) {
      setStatus('idle');
      setTeamName(null);
      setMembers([]);
      setCurrentRoom(1);
      setScore(0);
      setErrorsCount(0);
      setCorrectCount(0);
      setStartedAt(null);
      setCompletedAt(null);
      setAnsweredTheory({ 1: false, 2: false, 3: false, 4: false });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  return (
    <GameContext.Provider
      value={{
        teamName,
        members,
        currentRoom,
        score,
        errorsCount,
        correctCount,
        status,
        startedAt,
        completedAt,
        elapsedTime,
        answeredTheory,
        isShaking,
        toast,
        soundEnabled,
        setSoundEnabled,
        formatTime,
        startChallenge,
        submitTheoreticalAnswer,
        submitRoomCode,
        submitSwotDiagnostic,
        resetSession,
        showToast
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame deve ser usado dentro de um GameProvider');
  }
  return context;
}
