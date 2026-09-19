/**
 * Configuração dos Enigmas, Perguntas, Pistas Físicas e Códigos de Acesso
 * para a Equipe Alfa e Equipe Beta.
 * Enigmas crípticos de campo sem menção explícita de nomes de salas.
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
      fieldClue: "Onde os decretos ganham chancela e a alta gestão traça as diretrizes da instituição, guardiões silenciosos arquivam registros e decisões. Procure no epicentro do comando administrativo o invólucro que ostenta o selo 'SETZER'.",
      secretCode: "DADO-SINTAXE-31",
      codeHint: "Formato esperado: DADO-XXXX-XX"
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
      fieldClue: "No templo do silêncio sagrado onde mil mentes repousam impressas em estantes infinitas, procure onde o conhecimento humano foi encadernado. Entre as fileiras do saber catalogado, um tomo misterioso foi marcado com a cor do ouro solar.",
      secretCode: "ENERGIA-TERMODINAMICA-84",
      codeHint: "Formato esperado: ENERGIA-XXXX-XX"
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
      fieldClue: "Ao ar livre, onde raízes abraçam a terra no coração geográfico do campus, procure o ser vivo que floresce e oferta pequenos frutos escuros sob o céu. Em sua casca rústica, um portal geométrico bidimensional aguarda a leitura óptica.",
      secretCode: "FILOSOFICO-ARISTOTELES-9",
      codeHint: "Formato esperado: FILOSOFICO-XXXX-X"
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
      fieldClue: "No laboratório dos circuitos lógicos e feixes de silício, onde dezenas de mentes navegam pela malha de redes digitais. Encontre o primeiríssimo posto de visualização tecnológica, onde o monitor inicial esconde o código.",
      secretCode: "CIENTIFICO-ERATOSTENES-7",
      codeHint: "Formato esperado: CIENTIFICO-XXXX-X"
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
      fieldClue: "No espaço onde a comunidade busca o sustento do corpo e os aromas se dissipam nos intervalos, agora desprovido do movimento costumeiro. Sobre a grande bancada de atendimento onde os pedidos costumam ser entregues, repousa um segredo lacrado.",
      secretCode: "DEDUTIVO-PREMISSA-44",
      codeHint: "Formato esperado: DEDUTIVO-XXXX-XX"
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
      fieldClue: "No majestoso recinto solene onde palestras magnas e assembleias ecoam para uma plateia imensa. Sem adentrar a nave principal, examine o portal lateral à destra de quem cruza a entrada.",
      secretCode: "INDUTIVO-CASOS-12",
      codeHint: "Formato esperado: INDUTIVO-XXXX-XX"
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
      fieldClue: "Retorne ao salão das grandes apresentações acadêmicas. Vá até a primeiríssima fileira diante do tablado e localize o assento do meio: olhe onde os olhos comuns não enxergam, sob a estrutura do assento.",
      secretCode: "DIRETA-HAWTHORNE-22",
      codeHint: "Formato esperado: DIRETA-XXXX-XX"
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
      fieldClue: "No salão das refeições agora despovoado, onde as mesas guardam os ecos das conversas passadas. Procure o terceiro refúgio dos comensais e tateie o plano oculto fixado sob o tampo.",
      secretCode: "INDIRETA-PASSADO-66",
      codeHint: "Formato esperado: INDIRETA-XXXX-XX"
    }
  },
  5: {
    id: 5,
    title: "Sala 5: O Cofre Estratégico",
    subtitle: "Diagnóstico Quantitativo e Matriz SWOT Combinada",
    iconName: "ShieldAlert",
    alfa: {
      fieldClue: "O cofre final exige as variáveis ocultas da estratégia. Retorne ao ambiente das máquinas de computação onde os dados fluem. Busque o grande painel branco onde diagramas e ideias são rascunhados: os 4 quadrantes numéricos estão camuflados nas costas da estrutura onde a tinta nunca é vista pela turma.",
      diagnostics: [
        {
          id: "diag1",
          label: "1. Capacidade Ofensiva:",
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
          label: "2. Capacidade Defensiva:",
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
          label: "3. Posição Estratégica Geral:",
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
      fieldClue: "A chave mestra do diagnóstico não repousa entre paredes de concreto. No coração verde ao ar livre do campus, procure a guardiã natural que oferta pequenos frutos escuros e projeta sua sombra sobre a terra. Erga os olhos: entre sua copa e galhos elevados, um dossiê oculto guarda os quatro quadrantes do destino estratégico.",
      diagnostics: [
        {
          id: "diag1",
          label: "1. Capacidade Ofensiva:",
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
          label: "2. Capacidade Defensiva:",
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
          label: "3. Posição Estratégica Geral:",
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
