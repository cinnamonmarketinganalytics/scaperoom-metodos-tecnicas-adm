/**
 * Configuração dos Enigmas, Perguntas, Pistas Físicas e Códigos de Acesso
 * para a Equipe Alfa e Equipe Beta.
 */

export const ROOMS_CONFIG = {
  1: {
    id: 1,
    title: "Sala 1: Gênese do Conhecimento",
    subtitle: "Setzer vs. Bolisani & Bratianu",
    iconName: "Binary",
    alfa: {
      question: "De acordo com Valdemar Setzer, qual elemento é definido estritamente pela sua dimensão sintática, caracterizando-se como uma sequência de símbolos quantificados ou quantificáveis desprovida de significado inerente?",
      options: [
        "Informação",
        "Dado",
        "Conhecimento",
        "Sabedoria"
      ],
      correctAnswer: "Dado",
      fieldClue: "Vá à Secretaria da Direção e procure o envelope 'SETZER'.",
      secretCode: "DADO-SINTAXE-31",
      codeHint: "Formato esperado: DADO-SINTAXE-XX (encontrado no envelope da Secretaria)"
    },
    beta: {
      question: "Segundo a abordagem de Bolisani & Bratianu, o conhecimento organizacional não é meramente um recurso estático de processamento, mas se comporta conceitualmente de forma similar a qual grandeza física contínua?",
      options: [
        "Massa",
        "Energia",
        "Gravidade",
        "Entropia"
      ],
      correctAnswer: "Energia",
      fieldClue: "Vá à Biblioteca e ache o livro marcado com fita amarela.",
      secretCode: "ENERGIA-TERMODINAMICA-84",
      codeHint: "Formato esperado: ENERGIA-TERMODINAMICA-XX (encontrado no livro na Biblioteca)"
    }
  },
  2: {
    id: 2,
    title: "Sala 2: As Quatro Matrizes da Verdade",
    subtitle: "Classificação Epistemológica de Trujillo Ferrari",
    iconName: "Compass",
    alfa: {
      question: "Na taxonomia de Trujillo Ferrari sobre as formas de apreensão da realidade, quais atributos definem com rigor o Conhecimento Filosófico?",
      options: [
        "Factual, contingente, verificável, falível, aproximadamente exato",
        "Valorativo, racional, sistemático, não verificável, infalível",
        "Assistemático, valorativo, empírico, não verificável, falível",
        "Dogmático, infalível, valorativo, de inspiração sobrenatural"
      ],
      correctAnswer: "Valorativo, racional, sistemático, não verificável, infalível",
      fieldClue: "Vá ao Jardim Central e leia o QR Code na árvore de amora.",
      secretCode: "FILOSOFICO-ARISTOTELES-9",
      codeHint: "Formato esperado: FILOSOFICO-ARISTOTELES-X (obtido no QR Code da árvore de amora)"
    },
    beta: {
      question: "Ao calcular a circunferência da Terra medindo a sombra projetada em Alexandria e Siena no solstício de verão, o experimento histórico de Eratóstenes exemplifica qual modalidade de conhecimento segundo Trujillo Ferrari e quais suas características essenciais?",
      options: [
        "Valorativo, racional, sistemático, não verificável",
        "Dogmático, infalível, transcendental, definitivo",
        "Factual, contingente, verificável",
        "Empírico, assistemático, acrítico, transmitido por tradição"
      ],
      correctAnswer: "Factual, contingente, verificável",
      fieldClue: "Vá à Sala de Informática e leia o QR Code no Monitor 01.",
      secretCode: "CIENTIFICO-ERATOSTENES-7",
      codeHint: "Formato esperado: CIENTIFICO-ERATOSTENES-X (obtido no QR Code do Monitor 01)"
    }
  },
  3: {
    id: 3,
    title: "Sala 3: O Labirinto Lógico",
    subtitle: "Métodos de Inferência: Raciocínio Dedutivo vs. Indutivo",
    iconName: "Cpu",
    alfa: {
      question: "Ao analisar a estrutura lógica dos métodos científicos de pesquisa, qual formulação caracteriza com precisão o Silogismo Dedutivo clássico?",
      options: [
        "Observações particulares gerando conclusão provável",
        "Premissas gerais gerando certeza particular",
        "Hipóteses formuladas a partir de intuições espontâneas",
        "Coleta probabilística sem necessidade de premissa maior"
      ],
      correctAnswer: "Premissas gerais gerando certeza particular",
      fieldClue: "Vá à Cantina (fechada/vazia) e busque o envelope lacrado no balcão.",
      secretCode: "DEDUTIVO-PREMISSA-44",
      codeHint: "Formato esperado: DEDUTIVO-PREMISSA-XX (no envelope lacrado da Cantina)"
    },
    beta: {
      question: "No rigor da metodologia científica, qual proposição sintetiza a mecânica fundamental e o limite epistêmico do Raciocínio Indutivo?",
      options: [
        "Premissas gerais universais gerando certeza lógica irrefutável",
        "Observações particulares gerando conclusão provável",
        "Dedução matemática pura independente de evidências empíricas",
        "Axiomas inquestionáveis derivados de autoridade acadêmica"
      ],
      correctAnswer: "Observações particulares gerando conclusão provável",
      fieldClue: "Vá ao Auditório e encontre o envelope na porta lateral direita.",
      secretCode: "INDUTIVO-CASOS-12",
      codeHint: "Formato esperado: INDUTIVO-CASOS-XX (no envelope do Auditório)"
    }
  },
  4: {
    id: 4,
    title: "Sala 4: O Olho da Ciência",
    subtitle: "Técnicas de Observação Científica (Prodanov & Freitas)",
    iconName: "Eye",
    alfa: {
      question: "No âmbito das técnicas de coleta de dados segundo Prodanov & Freitas, o que define especificamente o fenômeno conhecido como Efeito Hawthorne na observação direta?",
      options: [
        "Mudança de comportamento dos indivíduos ao serem observados",
        "Viés do pesquisador ao interpretar registros documentais antigos",
        "Fadiga do observador em estudos etnográficos de longa duração",
        "Inconsistência estatística gerada por amostras não probabilísticas"
      ],
      correctAnswer: "Mudança de comportamento dos indivíduos ao serem observados",
      fieldClue: "Vá ao Auditório e procure sob a poltrona central da primeira fileira.",
      secretCode: "DIRETA-HAWTHORNE-22",
      codeHint: "Formato esperado: DIRETA-HAWTHORNE-XX (sob a poltrona do Auditório)"
    },
    beta: {
      question: "Ao aplicar a técnica de observação indireta (pesquisa documental e análise de registros) conforme Prodanov & Freitas, qual representa a principal limitação inerente ao método?",
      options: [
        "Influência direta da presença física do pesquisador sobre o sujeito",
        "Perda de nuances e falta de interação em tempo real",
        "Inviabilidade de acessar dados históricos de períodos remotos",
        "Obrigatoriedade de consentimento verbal imediato dos sujeitos observados"
      ],
      correctAnswer: "Perda de nuances e falta de interação em tempo real",
      fieldClue: "Vá à Cantina vazia e procure o cartão colado debaixo da mesa 3.",
      secretCode: "INDIRETA-PASSADO-66",
      codeHint: "Formato esperado: INDIRETA-PASSADO-XX (cartão colado debaixo da mesa 3 da Cantina)"
    }
  },
  5: {
    id: 5,
    title: "Sala 5: O Cofre Estratégico",
    subtitle: "Diagnóstico Quantitativo e Matriz SWOT Combinada",
    iconName: "ShieldAlert",
    alfa: {
      fieldClue: "Vá à Sala de Informática e localize os valores de Q1, Q2, Q3 e Q4 atrás do quadro branco.",
      hintValues: "Valores do Quadro Branco: Q1 (Forças) = 80 | Q2 (Oportunidades) = 50 | Q3 (Fraquezas) = 20 | Q4 (Ameaças) = 30",
      diagnostics: [
        {
          id: "diag1",
          label: "1. Capacidade Ofensiva [Q1 - Q3]:",
          formula: "Q1 - Q3",
          options: [
            { value: "40", label: "40 (Ofensiva Restrita)" },
            { value: "60", label: "60 (Ofensiva Seletiva)" },
            { value: "70", label: "70 (Ofensiva Ampla)" },
            { value: "100", label: "100 (Ofensiva Máxima)" }
          ],
          correctValue: "60"
        },
        {
          id: "diag2",
          label: "2. Capacidade Defensiva [Q2 - Q4]:",
          formula: "Q2 - Q4",
          options: [
            { value: "10", label: "10 (Vulnerabilidade Severa)" },
            { value: "20", label: "20 (Equilíbrio Crítico)" },
            { value: "35", label: "35 (Defesa Estável)" },
            { value: "50", label: "50 (Blindagem Total)" }
          ],
          correctValue: "20"
        },
        {
          id: "diag3",
          label: "3. Posição Estratégica Geral [(Q1+Q2) - (Q3+Q4)]:",
          formula: "[(Q1+Q2) - (Q3+Q4)]",
          options: [
            { value: "60", label: "60 (Estabilidade Passiva)" },
            { value: "70", label: "70 (Sobrevivência Ativa)" },
            { value: "80", label: "80 (Desenvolvimento Controlado)" },
            { value: "110", label: "110 (Alavancagem Irrestrita)" }
          ],
          correctValue: "80"
        }
      ]
    },
    beta: {
      fieldClue: "Vá ao Jardim Central e abra a pasta presa nos galhos da árvore de amora.",
      hintValues: "Valores da Pasta: Q1 (Forças) = 90 | Q2 (Oportunidades) = 80 | Q3 (Fraquezas) = 10 | Q4 (Ameaças) = 10",
      diagnostics: [
        {
          id: "diag1",
          label: "1. Capacidade Ofensiva [Q1 - Q3]:",
          formula: "Q1 - Q3",
          options: [
            { value: "60", label: "60 (Ofensiva Seletiva)" },
            { value: "75", label: "75 (Ofensiva Avançada)" },
            { value: "80", label: "80 (Ofensiva Plena)" },
            { value: "100", label: "100 (Super-Ofensiva)" }
          ],
          correctValue: "80"
        },
        {
          id: "diag2",
          label: "2. Capacidade Defensiva [Q2 - Q4]:",
          formula: "Q2 - Q4",
          options: [
            { value: "50", label: "50 (Defesa Moderada)" },
            { value: "65", label: "65 (Resiliência Operacional)" },
            { value: "70", label: "70 (Defesa Estável)" },
            { value: "85", label: "85 (Blindagem Máxima)" }
          ],
          correctValue: "70"
        },
        {
          id: "diag3",
          label: "3. Posição Estratégica Geral [(Q1+Q2) - (Q3+Q4)]:",
          formula: "[(Q1+Q2) - (Q3+Q4)]",
          options: [
            { value: "120", label: "120 (Expansão Tática)" },
            { value: "140", label: "140 (Crescimento Acelerado)" },
            { value: "150", label: "150 (Alavancagem Máxima)" },
            { value: "160", label: "160 (Dominância Global)" }
          ],
          correctValue: "150"
        }
      ]
    }
  }
};
