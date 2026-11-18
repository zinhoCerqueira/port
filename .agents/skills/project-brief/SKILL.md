---
name: project-brief
description: Entrevista o usuário e analisa o código para gerar ou atualizar um PROJECT.md na raiz do repositório, descrevendo as características reais do frontend e separando fato de código [code], resposta de entrevista [interview] e dedução [inference]. Use quando o usuário pedir "entrevista o projeto", "analisa o projeto e gera um md", "documenta esse projeto", "project brief", "gera um documento do projeto", ou quando quiser saber o que o projeto é, como está organizado e o que falta nele.
---

# Project Brief

Produz um `PROJECT.md` que combina **evidência do código** com **o que só o usuário sabe**.

O valor está na rastreabilidade: toda afirmação declara de onde veio. Não é um README de vitrine — é um retrato verificável do projeto, focado no frontend.

## Quando usar

- "Entrevista o projeto e gera um md"
- "Documenta esse projeto"
- "O que esse projeto é / como está organizado?"
- Antes de retomar um projeto parado ou de passar o repositório para outra pessoa
- Quando o README está desatualizado ou é só boilerplate

## Regras não negociáveis

1. **Um único arquivo de saída:** `PROJECT.md` na raiz do repositório analisado.
2. **Nunca leia segredos.** `.env`, `.env.local`, `.env.*.local` estão proibidos. Apenas `.env.example`.
3. **Análise estática.** Não rode `npm install`, `npm run build`, `npm run dev` nem testes. Leia arquivos.
4. **Não invente.** Sem evidência, escreva `não identificado`. Nunca preencha lacuna com texto plausível.
5. **Não pergunte o que o código responde.** Se está no repositório, leia e marque `[code]`.
6. **Rodadas curtas.** No máximo 4 perguntas por vez, no máximo 12 no total.
7. **Toda pergunta tem recomendação.** Use a tool `question`; a opção recomendada vem primeiro, com "(Recomendado)" e o porquê em uma linha.

## Passo 0 — Localizar a raiz

1. `package.json` no cwd → essa é a raiz.
2. Senão, procure subdiretórios com `package.json`, ignorando `node_modules` e `.next`.
3. Um único candidato → use-o e informe o caminho.
4. Mais de um candidato → **uma** pergunta com a tool `question`.
5. Nenhum → pergunte qual diretório analisar antes de continuar.

Registre a raiz escolhida; ela vira o cabeçalho do documento.

## Passo 1 — Varredura (fatos, em silêncio)

Leia, nesta ordem, e anote o caminho de cada achado:

| Alvo | O que extrair |
|---|---|
| `package.json` | nome, versão, scripts, deps vs. devDeps, framework e versões |
| `next.config.*` / `vite.config.*` | imagens remotas, rewrites, flags |
| `tsconfig.json` | path aliases, `strict`, `typeRoots` |
| Árvore de `app/` (ou `pages/`, `src/`) | rotas, layouts, route handlers, `use client` |
| `components/` | componentes e quem importa quem |
| `lib/`, `data/`, `types/` | dados estáticos, temas, contratos |
| `styles/` | CSS Modules vs. global vs. Tailwind |
| `README.md`, `ROADMAP.md`, `AGENTS.md` | intenção declarada (marque `[code: README]`, não `[interview]`) |
| `git log --oneline -20` | o que mudou recentemente, ritmo |

Comandos úteis (ajuste conforme a stack):

```bash
rg -n "use client|use server" app components
rg -n "process\.env" --glob '!node_modules' .
rg -n "fetch\(" app components lib
rg -n "export const metadata" app
```

Checagens que costumam render achados:

- Existe `route.ts`/`route.js`/`middleware.ts`? (se não, diga explicitamente)
- Existe suíte de testes? Procure `*.test.*`, `*.spec.*`, `playwright`, `vitest`, `jest`.
- Alguma chamada de rede acontece no cliente?
- `.env` está versionado? (`git ls-files | grep -i '^\.env'`)
- Há dependência declarada e não usada, ou `any` espalhado?

## Passo 2 — Entrevista

Só pergunte o que o código **não** conta. Cubra estes eixos, descartando o que já estiver respondido:

1. **Propósito e público** — para quem é, que problema resolve, o que diferencia.
2. **Estado real** — o que está pronto, o que é protótipo, o que está quebrado.
3. **Dados e conteúdo** — de onde vêm hoje, de onde deveriam vir.
4. **Restrições** — prazo, hospedagem, custo, stack imposta, acessibilidade.
5. **Lacunas** — o que você sabe que falta e vinha adiando.
6. **Critério de pronto** — como você decide que o projeto "acabou".

Formato de cada pergunta:

> **P: <pergunta objetiva>**
> Recomendado: <opção> — <porquê em uma linha>

Pare quando as seis frentes estiverem cobertas ou ao atingir 12 perguntas, o que vier primeiro.

## Passo 3 — Escrever `PROJECT.md`

Marque cada afirmação:

- `[code: caminho/do/arquivo]` — veio de arquivo, grep ou git
- `[interview]` — veio de resposta do usuário
- `[inference]` — dedução sua; sujeita a revisão

Estrutura:

```markdown
# <Nome do projeto> — Project Brief

> Gerado em <data> a partir de <N> arquivos analisados e <M> respostas de entrevista.
> Raiz: `<caminho>` · Commit: `<sha curto>`

## 1. Resumo executivo
Até 5 linhas: o que é, para quem, estado atual.

## 2. Stack e versões
Tabela: runtime, framework, linguagem, estilo, ícones, libs relevantes.

## 3. Mapa de rotas
Tabela: rota | arquivo | propósito | componentes principais.
Rotas inexistentes planejadas vão marcadas como `[interview]`.

## 4. Hierarquia de componentes
Árvore a partir do layout raiz. Só o que for relevante para entender a composição.

## 5. Dados e estado
O que é estático, o que vem de rede, onde vive o estado de UI.
Cite os arquivos de dados e o formato dos contratos.

## 6. Estilização e tema
Estratégia (CSS Modules/global/Tailwind), tokens, troca de tema, responsividade.

## 7. Build e tooling
Scripts, alias de import, configuração de imagem, lint, tipos.

## 8. Lacunas e riscos
Só o que foi observado, com evidência. Sem evidência não entra.
Ex.: ausência de testes, `.env` versionado, dependência não usada.

## 9. Decisões e racional
`[interview]` — escolhas feitas e o porquê. O que foi descartado também conta.

## 10. Critério de pronto
`[interview]` — como o dono decide que terminou.

## Apêndice A — Evidências
Lista de arquivos lidos e achados de grep que sustentam o documento.

## Apêndice B — Entrevista
Respostas literais, na ordem. É o que permite auditar o que é fato e o que é opinião.
```

Alvo: 150–250 linhas. Se passar de 300, você está copiando código em vez de descrever.

## Passo 4 — Fechar

1. Grave o arquivo.
2. Imprima: caminho, nº de linhas, contagem de itens `[code]` / `[interview]` / `[inference]` e a lista de lacunas.
3. Se `PROJECT.md` já existir, resuma o que mudaria e peça confirmação antes de sobrescrever.
4. Pergunte se o usuário quer commitar.

## Anti-padrões

- Copiar o `package.json` inteiro em vez de resumir stack e versões.
- Listar cada arquivo de `styles/` um por um; descreva a estratégia.
- Transformar o documento em changelog ou roadmap — isso é papel do `ROADMAP.md`.
- Preencher seção vazia com "boas práticas recomendadas". Lacuna é informação.
- Tratar `README.md` como verdade absoluta: ele descreve a intenção, não o código.
