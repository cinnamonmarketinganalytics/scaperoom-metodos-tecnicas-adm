# 🔐 Escape Room Universitário Híbrido: Métodos e Técnicas em Administração

Aplicação web interativa em tempo real desenvolvida para conduzir uma dinâmica gamificada de Escape Room Universitário, disputada entre a **Equipe Alfa** e a **Equipe Beta**.

---

## ⚡ Tecnologias Utilizadas

- **React 18** + **Vite 6**
- **Tailwind CSS** com animações personalizadas (efeito shake de erro, pulsação e glow)
- **Lucide React** (iconografia moderna e temática)
- **Canvas-Confetti** (celebração visual na tela de vitória)
- **Firebase Firestore (v12 modular)** (banco em tempo real e sincronização de sessões)
- **Web Audio API** nativa (efeitos sonoros sintetizados para acertos, penalidades e fanfarra)

---

## 🏆 Sistema de Pontuação e Cronômetro

- **Pontuação Inicial**: `0 pontos`.
- **Acertos (Perguntas Teóricas e Códigos)**: `+1 ponto`.
- **Erros (Respostas Erradas e Códigos Inválidos)**: `-1 ponto` com tremor na tela (*shake*) e toast vermelho em destaque.
- **Sala 5 (Cofre Estratégico - Matriz SWOT)**: `+3 pontos` ao acertar os 3 diagnósticos e congelamento imediato do cronômetro.
- **Cronômetro Contínuo**: Inicia com o clique em *"Iniciar Desafio"* na tela de cadastro e para na conclusão da Sala 5. Persistente contra recarregamento da página via timestamp `startedAt`.

---

## 🗺️ Guia de Salas e Gabarito do Docente

### Sala 1: Gênese do Conhecimento (Setzer; Bolisani & Bratianu)
- **Alfa**: Pergunta sobre Dado sintático (Setzer) -> **Correta: "Dado"** -> Pista: *"Secretaria da Direção (envelope 'SETZER')"* -> Código: `DADO-SINTAXE-31`
- **Beta**: Pergunta sobre campo contínuo (Bolisani & Bratianu) -> **Correta: "Energia"** -> Pista: *"Biblioteca (livro com fita amarela)"* -> Código: `ENERGIA-TERMODINAMICA-84`

### Sala 2: As Quatro Matrizes da Verdade (Trujillo Ferrari)
- **Alfa**: Conhecimento Filosófico -> **Correta: "Valorativo, racional, sistemático, não verificável, infalível"** -> Pista: *"Jardim Central (QR Code na árvore de amora)"* -> Código: `FILOSOFICO-ARISTOTELES-9`
- **Beta**: Experimento de Eratóstenes (Científico) -> **Correta: "Factual, contingente, verificável"** -> Pista: *"Sala de Informática (QR Code no Monitor 01)"* -> Código: `CIENTIFICO-ERATOSTENES-7`

### Sala 3: O Labirinto Lógico (Dedutivo vs. Indutivo)
- **Alfa**: Silogismo Dedutivo -> **Correta: "Premissas gerais gerando certeza particular"** -> Pista: *"Cantina (envelope lacrado no balcão)"* -> Código: `DEDUTIVO-PREMISSA-44`
- **Beta**: Raciocínio Indutivo -> **Correta: "Observações particulares gerando conclusão provável"** -> Pista: *"Auditório (envelope na porta lateral direita)"* -> Código: `INDUTIVO-CASOS-12`

### Sala 4: O Olho da Ciência (Prodanov & Freitas)
- **Alfa**: Efeito Hawthorne -> **Correta: "Mudança de comportamento dos indivíduos ao serem observados"** -> Pista: *"Auditório (sob a poltrona central da primeira fileira)"* -> Código: `DIRETA-HAWTHORNE-22`
- **Beta**: Limitação da Observação Indireta -> **Correta: "Perda de nuances e falta de interação em tempo real"** -> Pista: *"Cantina (cartão debaixo da mesa 3)"* -> Código: `INDIRETA-PASSADO-66`

### Sala 5: O Cofre Estratégico (Matriz SWOT Combinada)
- **Alfa** (Pista: Sala de Informática, atrás do quadro branco: Q1=80, Q2=50, Q3=20, Q4=30):
  1. Capacidade Ofensiva (Q1 - Q3): `60 (Ofensiva Seletiva)`
  2. Capacidade Defensiva (Q2 - Q4): `20 (Equilíbrio Crítico)`
  3. Posição Geral [(Q1+Q2) - (Q3+Q4)]: `80 (Desenvolvimento Controlado)`
- **Beta** (Pista: Jardim Central, pasta na árvore de amora: Q1=90, Q2=80, Q3=10, Q4=10):
  1. Capacidade Ofensiva (Q1 - Q3): `80 (Ofensiva Plena)`
  2. Capacidade Defensiva (Q2 - Q4): `70 (Defesa Estável)`
  3. Posição Geral [(Q1+Q2) - (Q3+Q4)]: `150 (Alavancagem Máxima)`

---

## 👨‍🏫 Painel do Professor (`/admin`)

- **Acesso**: Link no rodapé ou no cabeçalho, ou navegando para `/admin` (ou `#admin`).
- **Autenticação**: Protegido por hash criptográfico unidirecional SHA-256 com salt. A senha é exclusiva do corpo docente e não consta no repositório.
- **Recursos**:
  - Acompanhamento simultâneo ao vivo das equipes Alfa e Beta.
  - Exibição de: Sala Atual, Cronômetro em tempo real, Pontuação, Quantidade de Erros e Integrantes.
  - Botão de **Resetar Sessão** individual para reiniciar a equipe a qualquer momento.

---

## 🚀 Como Executar Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Para compilar a versão de produção:
   ```bash
   npm run build
   ```
