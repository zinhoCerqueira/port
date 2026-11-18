# vscode-portfolio — Project Brief

> Gerado em 2026-11-18 a partir de 16 arquivos lidos e 12 respostas de entrevista.
> Raiz: `vscode-portfolio/` · Submódulo em `1878641` · Repo guarda-chuva em `32a6255`

Legenda de origem: `[code: caminho]` evidência de arquivo · `[interview]` resposta do dono · `[inference]` dedução, sujeita a revisão.

## 1. Resumo executivo

Portfólio pessoal de Jader Cerqueira construído sobre o template `itsnitinr/vscode-portfolio`, com interface que imita o editor VS Code: sidebar de arquivos, abas, terminal funcional e troca de tema. [code: README.md, components/Layout.tsx]

Tem 8 rotas no App Router, 15 componentes e 22 CSS Modules, sem banco, sem route handlers e sem testes. O código de servidor se resume a duas páginas que fazem `fetch` em tempo de request. [code: app/, styles/, package.json]

Público-alvo declarado: recrutadores, para vagas de frontend, fullstack **e** backend. [interview]

Estado real: **nenhuma das 8 páginas foi considerada pronta pelo dono**, que quer revisar uma por uma. [interview]

Decisão estruturante: o projeto permanece sem backend próprio; a evidência de capacidade de servidor fica nos projetos do GitHub, não neste repositório. [interview]

## 2. Stack e versões

| Camada | Escolha | Origem |
|---|---|---|
| Framework | Next.js `^16.0.0` (App Router) | `[code: package.json]` |
| UI | React `^19.0.0` + React DOM | `[code: package.json]` |
| Linguagem | TypeScript `^5.8.2`, `strict: true`, alias `@/*` → `./*` | `[code: tsconfig.json]` |
| Estilo | CSS Modules (22 arquivos) + 2 CSS globais | `[code: styles/]` |
| Ícones | `react-icons` (família VSC) | `[code: app/*/page.tsx]` |
| Calendário | `react-github-calendar` | `[code: app/github/page.tsx:3]` |
| Lint | ESLint `^9.22.0` + `eslint-config-next ^15.2.3` | `[code: package.json]` |
| Deploy | Vercel (decidido; `vercel` está em dependencies) | `[interview]` + `[code: package.json]` |

## 3. Mapa de rotas

Nenhuma página marcada como pronta. A coluna de status reflete a entrevista, não o volume de código. [interview]

| Rota | Arquivo | Propósito | Status |
|---|---|---|---|
| `/` | `app/page.tsx` | Apresentação e atalhos | pendente |
| `/about` | `app/about/page.tsx` | Bio, skills, experiência, export de currículo | pendente |
| `/projects` | `app/projects/page.tsx` | Lista de projetos | pendente — dados do template |
| `/contact` | `app/contact/page.tsx` | Links de contato via `ContactCode` | pendente |
| `/github` | `app/github/page.tsx` | Perfil e repositórios via API do GitHub | pendente |
| `/articles` | `app/articles/page.tsx` | Artigos do dev.to | pendente |
| `/settings` | `app/settings/page.tsx` | Seletor de tema | pendente |
| `/entertainment` | `app/entertainment/page.tsx` | "Vault" liberado por comando no terminal | stub |

### Revisão página por página (planejada)

- [ ] `/` — home
- [ ] `/about` — bio, skills, experiência
- [ ] `/projects` — substituir dados do template
- [ ] `/contact` — links e formulário
- [ ] `/github` — autenticação da API e estados de erro
- [ ] `/articles` — tratamento de falha e chave do dev.to
- [ ] `/settings` — persistência e acessibilidade
- [ ] `/entertainment` — decidir escopo do vault

## 4. Hierarquia de componentes

```
app/layout.tsx
└── components/Layout.tsx              'use client'
    ├── Titlebar.tsx                   'use client'
    ├── Sidebar.tsx                    'use client'
    ├── Explorer.tsx
    ├── Tabsbar.tsx
    │   └── Tab.tsx                    'use client'
    ├── CommandPalette.tsx             'use client'
    ├── Bottombar.tsx
    └── Terminal.tsx                   'use client'
```

`Layout` é o único ponto de composição global; as páginas entram como conteúdo dentro dele. [code: components/Layout.tsx, app/layout.tsx]

Componentes de página: `ArticleCard`, `ProjectCard`, `RepoCard`, `ContactCode`, `ThemeInfo`, `Illustration`. [code: components/]

`Illustration.tsx` não é importado por ninguém — código morto. [inference] `[code: grep em app/ e components/]`

## 5. Dados e estado

| Fonte | Mecanismo | Onde |
|---|---|---|
| Projetos | Array estático em TS | `data/projects.ts` |
| Temas | Array estático + `data-theme` no `<html>` | `lib/themes.ts`, `app/layout.tsx` |
| Artigos | `fetch` no servidor, `revalidate = 60`, header `api-key` com `DEV_TO_API_KEY` | `app/articles/page.tsx:17` |
| GitHub | `fetch` no servidor em `api.github.com` + `react-github-calendar` | `app/github/page.tsx:18` |
| Tema ativo | `localStorage` lido no cliente e aplicado antes da hidratação por script inline | `app/layout.tsx` |
| Vault | Apenas `useState` local | `app/entertainment/page.tsx:38` |

O tema é aplicado por script inline no `<head>` via `dangerouslySetInnerHTML`, para evitar flash de tema errado na hidratação. `suppressHydrationWarning` no `<html>` cobre a divergência. [code: app/layout.tsx:52-54]

Não há cache próprio, banco, autenticação ou persistência de qualquer dado de usuário. [code: ausência de route.ts/middleware.ts/DB]

## 6. Estilização e tema

- **Estratégia:** CSS Modules por componente/página, importados via `@/styles/*.module.css`; `globals.css` e `themes.css` entram no layout raiz. [code: app/layout.tsx, styles/]
- **Temas:** 6 opções — GitHub Dark, Dracula, Ayu Dark, Ayu Mirage, Nord, Night Owl — aplicadas via `data-theme` no elemento raiz. [code: lib/themes.ts, app/settings/page.tsx]
- **Padrão:** GitHub Dark, usado como fallback no `useState` e no `useEffect`. [interview] `[code: app/settings/page.tsx:13]`
- **Fundo da janela:** grid de pontos de 1px em célula de 40px + brilho radial suave; desligado em telas pequenas. Mantido como está. [interview] `[code: styles/Layout.module.css:9-25]`
- **Responsividade:** a janela de 70% vira tela cheia em breakpoints menores. [code: styles/Layout.module.css:71]

## 7. Build e tooling

| Item | Valor |
|---|---|
| Scripts | `dev`, `build`, `start`, `lint` |
| Alias | `@/*` → raiz do projeto |
| Tipos | `typeRoots` inclui `./types`; `strict: true` |
| Imagens remotas | `res.cloudinary.com`, `avatars.githubusercontent.com`, `imgur.com`, `media2.dev.to` |
| Testes | **nenhum** — sem test runner, sem arquivos `*.test.*` |
| Lockfiles | `bun.lock` **e** `package-lock.json` |

## 8. Lacunas e riscos

| # | Achado | Evidência | Severidade |
|---|---|---|---|
| 1 | `data/projects.ts` ainda lista projetos do template (Driwwwle, Subtrackt, o próprio template) | `data/projects.ts`; ROADMAP 2.4 e A.7 abertos | alta |
| 2 | Segredos permanecem no histórico do git, mesmo após sair do tracking | commit `64d5cc8`, `git log -- .env` | alta |
| 3 | Nenhum teste automatizado | busca vazia por `*.test.*`/`*.spec.*` | média |
| 4 | Vault sem senha: o comando libera direto e o conteúdo é "Em breve" | `app/entertainment/page.tsx:38-50` | média |
| 5 | `Project` declarado duas vezes, com campos idênticos | `types/index.ts`, `data/projects.ts` | baixa |
| 6 | `GITHUB_API_KEY` documentada mas não usada; chamadas à API do GitHub são anônimas | `.env.example`, `app/github/page.tsx` | média |
| 7 | `eslint-config-next ^15.2.3` contra `next ^16.0.0` | `package.json` | média |
| 8 | Dois lockfiles concorrentes | `bun.lock`, `package-lock.json` | baixa |
| 9 | `vercel` como dependência de produção, sem uso em scripts | `package.json` | baixa |
| 10 | `Illustration.tsx` sem importação | `components/Illustration.tsx` | baixa |
| 11 | Bilíngue decidido, mas nada implementado: todo o conteúdo está em inglês | `[interview]` + `app/**` | alta |
| 12 | README ainda é o do template, com instruções do autor original | `README.md` | baixa |

## 9. Decisões e racional

| Decisão | Racional |
|---|---|
| Manter `fetch` no servidor com `revalidate = 60` para `/articles` e `/github` | Frescor de conteúdo sem build manual; aceita depender de API key em runtime. `[interview]` |
| Sem backend próprio neste repositório | Reduz superfície de manutenção; evidência de backend fica nos projetos do GitHub. Trade-off aceito: o portfólio não demonstra código de servidor próprio. `[interview]` |
| Deploy na Vercel | Já é dependência e suporta Server Components, `revalidate` e futuros route handlers sem adaptação. `[interview]` |
| Vault como easter egg | Encenação proposital, sem promessa de privacidade; o ROADMAP deve sair de `[x]` para `[/]`. `[interview]` |
| Tema padrão GitHub Dark | Fallback já implementado e visual mais neutro para recrutador. `[interview]` |
| Fundo: grid + brilho | Custo zero, combina com a metáfora de editor, já responsivo. `[interview]` |
| Conteúdo bilíngue (PT/EN) | Alcança recrutador brasileiro e remoto internacional; exige rotas ou dicionário. `[interview]` |
| Rotacionar `DEV_TO_API_KEY` e `GITHUB_API_KEY` | Remover do HEAD não apaga o histórico. `[interview]` |

## 10. Critério de pronto

O projeto é considerado terminado quando: **todos os itens abertos do ROADMAP estiverem fechados e o site estiver no ar em produção**. `[interview]`

Itens abertos no momento da geração (10): 2.3, 2.4, A.5, A.7, 3.1, 3.2, 4.0, 4.1, 4.2, 4.3. [code: ROADMAP.md]

> Obs.: 3.1 e 3.2 foram decididos nesta entrevista (manter grid; GitHub Dark), então podem ser fechados sem trabalho de design. [interview]

## Apêndice A — Evidências

**Lidos:** `package.json`, `next.config.ts`, `tsconfig.json`, `app/layout.tsx`, `app/articles/page.tsx`, `app/projects/page.tsx`, `app/settings/page.tsx`, `app/entertainment/page.tsx`, `app/contact/page.tsx`, `components/Sidebar.tsx`, `lib/themes.ts`, `data/projects.ts`, `types/index.ts`, `README.md`, `.env.example`, `ROADMAP.md`.

**Buscas estruturais:** `use client`, `use server`, `process.env`, `fetch(`, `: any`, `route.ts`/`middleware.ts`, arquivos de teste, `.env` versionado, grafo de imports de `components/`, contagem de `styles/*.module.css`.

**Git:** `git log --oneline` do submódulo (`1878641`) e do repo guarda-chuva (`32a6255`); `git log -- .env` em `64d5cc8`.

## Apêndice B — Entrevista

1. **Público:** "Recrutadores", não só vaga frontend — "pode ser vaga fullstack ou backend também". `[interview]`
2. **Projetos do template:** pendência, ainda não substituídos. `[interview]`
3. **Fetch no servidor:** manter com `revalidate`. `[interview]`
4. **`.env` no histórico:** documentar e rotacionar as chaves. `[interview]`
5. **Páginas prontas:** "Nenhuma está feita ainda, deixe isso registrado no `.md` de saída, eu vou querer ver depois uma por uma." `[interview]`
6. **Backend próprio:** manter sem backend próprio. `[interview]`
7. **Deploy:** Vercel. `[interview]`
8. **Critério de pronto:** ROADMAP zerado + deploy no ar. `[interview]`
9. **Tema padrão:** GitHub Dark. `[interview]`
10. **Fundo:** manter grid + brilho atual. `[interview]`
11. **Idioma:** bilíngue. `[interview]`
12. **Vault:** stub proposital / easter egg. `[interview]`
