# 🚀 Roadmap: Portfólio VS Code em Modo Janela

Este guia contém o passo a passo completo para transformar o template `itsnitinr/vscode-portfolio` em um portfólio personalizado com interface de janela e fundo customizado.

---

## 📋 Lista de Tarefas (TODO List)

### Parte 0: Setup Inicial do Ambiente
- [ ] **0.1. Preparar Pasta:** Criar o diretório local para o projeto.
- [ ] **0.2. Clonar Template:** Trazer os arquivos do repositório original.
- [ ] **0.3. Limpar Git:** Remover o histórico do autor original e iniciar o seu próprio.
- [ ] **0.4. Instalar Dependências:** Configurar as bibliotecas necessárias usando NPM ou Bun.
- [ ] **0.5. Teste Inicial:** Rodar o projeto localmente para garantir que o "puro" está funcionando.

### Parte 1: Implementando a Estrutura de Janela
- [ ] **1.1. Criar o Wrapper de Fundo:** Adicionar um container que ocupará 100% da tela com a imagem/gradiente de fundo.
- [ ] **1.2. Criar a Moldura da Janela:** Envolver a aplicação em uma `div` com largura de 70%, bordas arredondadas e sombra.
- [ ] **1.3. Barra de Título (Decorativa):** Adicionar os botões de fechar/minimizar/maximizar (estilo Mac/Windows) no topo da janela.
- [ ] **1.4. Ajuste de Layout Principal:** Modificar o arquivo `Layout.jsx` para aceitar as novas dimensões sem quebrar os componentes internos.
- [ ] **1.5. Responsividade:** Garantir que em telas menores a janela vire "tela cheia".

### Parte 2: Substituindo os Dados Originais (Surgical Cleaning)
- [ ] **2.1. Identificar Arquivos de Dados:** Localizar o diretório de dados (geralmente em `/data/` ou arquivos JSON/JS específicos).
- [ ] **2.2. Atualizar Informações Pessoais:** Nome, cargo, bio e links sociais.
- [ ] **2.3. Customizar Sidebar:** Definir quais "arquivos" (abas) seu VS Code terá (Sobre, Projetos, Contato, etc.).
- [ ] **2.4. Atualizar Projetos:** Substituir os exemplos pelos seus próprios repositórios e descrições.
- [ ] **2.5. Troca de Favicon e Título:** Atualizar as meta-tags para o seu nome.

### Parte 3: Estética e Polimento
- [ ] **3.1. Escolha da Imagem de Fundo:** Definir a imagem que ficará atrás da janela.
- [ ] **3.2. Escolha do Tema Padrão:** Configurar qual tema do VS Code (Dracula, Nord, etc.) será o inicial.
- [ ] **3.3. Configurar dev.to (Opcional):** Se tiver blog, configurar a chave de API ou remover a seção.

### Parte 4: Deploy e Finalização
- [ ] **4.1. Build de Produção:** Testar se o site compila corretamente para produção.
- [ ] **4.2. Deploy:** Subir para Vercel, Netlify ou GitHub Pages.
- [ ] **4.3. Teste Final:** Verificar links, formulário de contato e visual em diferentes navegadores.

---

## 🛠️ Comandos de Inicialização (Cheat Sheet)

```bash
# 1. Clonar o repositório
git clone https://github.com/itsnitinr/vscode-portfolio.git .

# 2. Reiniciar o Git (opcional, mas recomendado para o seu próprio histórico)
rm -rf .git
git init
git add .
git commit -m "Initial commit from template"

# 3. Instalar dependências (use npm ou bun)
npm install

# 4. Rodar em desenvolvimento
npm run dev
```

---

## 💡 Dicas de Customização
- **Dados:** Quase tudo que você precisa mudar está na pasta `components/` ou arquivos de dados.
- **Cores:** O projeto usa variáveis CSS. Se quiser mudar o roxo padrão da janela, procure no `globals.css`.
- **Imagens:** Coloque sua foto de perfil e imagem de fundo na pasta `public/`.
