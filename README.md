# Quero Ler Frontend

Aplicação frontend moderna para a plataforma Quero Ler, construída com as tecnologias mais recentes do ecossistema React/Next.js.

## � Objetivo

A plataforma Quero Ler é uma aplicação social dedicada a usuários que desejam adquirir e manter o hábito de leitura. Os principais recursos incluem:

### Para Leitores

- **Adicionar livros** que deseja ler
- **Metas de leitura** personalizadas
- **Avaliação** dos livros lidos
- **Comentários** sobre a leitura com controle de privacidade:
  - 🔒 Privado
  - 👥 Apenas grupo de amigos
  - 🌐 Público

### Clubes de Leitura

- Criar clubes de leitura
- Leitura conjunta de um mesmo livro
- Marcar encontros presenciais ou online

### Perfis Administrativos

- **Administrador**: Incluir documentos e excluir usuários
- **Moderador**: Excluir comentários que não estão de acordo com as diretrizes

## 🚀 Tecnologias

- **Next.js** 16.2.1 - Framework React com SSR e otimizações
- **React** 19.2.4 - Biblioteca UI
- **TypeScript** 5 - Tipagem estática e segurança de código
- **Tailwind CSS** 4 - Utility-first CSS framework
- **Jest** 30.3.0 - Framework de testes
- **Testing Library** 16.3.2 - Testes de componentes React
- **Cypress** 15.13.0 - Testes end-to-end (E2E)
- **ESLint** 9 - Análise estática de código
- **Prettier** 3.8.1 - Formatação de código
- **CommitLint** 20.5.0 - Validação de mensagens de commit
- **Lefthook** 2.1.4 - Git hooks manager
- **Lucide React** 1.6.0 - Biblioteca de ícones

## 📋 Requisitos

- **Node.js**: 20.12.2 ou superior
- **npm**: 10.5.0 ou superior

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd queroler-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure os Git hooks (Lefthook):

```bash
npx lefthook install
```

## 📊 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev        # Inicia servidor de desenvolvimento (localhost:3000)
npm run build      # Build de produção
npm start          # Inicia servidor de produção
```

### Qualidade de Código

```bash
npm run lint       # Executa ESLint
npm run format     # Formata código com Prettier
npm run typecheck  # Verifica tipos TypeScript
```

### Testes

```bash
npm test           # Executa testes com Jest
npm run test:coverage  # Executa testes com coverage
npm run test:e2e   # Executa testes E2E em modo headless
npm run test:e2e:open  # Abre Cypress em modo interativo
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Layout e página principal do Next.js
│   ├── globals.css        # Estilos globais da aplicação
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Página home
├── presentation/          # Componentes de apresentação
│   ├── pages/            # Páginas da aplicação
│   │   └── login/        # Página de login
│   │       ├── login.tsx
│   │       └── login.spec.tsx
│   └── shared/           # Componentes reutilizáveis
│       └── components/
├── lib/                   # Utilitários e helpers
│   ├── test-utils.tsx    # Setup customizado para testes
│   └── utils.ts          # Funções auxiliares (cn, etc)
├── styles/               # Estilos compartilhados
│   └── globals.css      # Estilos globais
└── tests/               # Testes de exemplo
    └── exemple.spec.tsx

e2e/
└── example.cy.ts         # Primeiro teste E2E de exemplo

cypress/
└── support/
  ├── e2e.ts            # Setup global dos testes E2E
  └── commands.ts       # Comandos customizados do Cypress
```

## ⚙️ Configurações

### ESLint (`eslint.config.mjs`)

- Configurações Next.js (core-web-vitals e typescript)
- Plugin customizado: **no-relative-import-paths**
  - Força uso de alias `@/` em vez de imports relativos
  - `rootDir`: src
- Regras customizadas:
  - `@typescript-eslint/no-unused-vars`: Aviso para argumentos/vars não usadas (prefixo `_`)
  - `no-console`: Erro em console.log

### Prettier (`.prettierrc`)

- Formatação automática de código
- Integrado com ESLint

### CommitLint (`commitlint.config.cjs`)

- Segue padrão **Conventional Commits**
- Tipos: feat, fix, docs, style, refactor, test, chore, ci
- Validação automática via Git hook

### Jest (`jest.config.ts`)

- Ambiente: jsdom
- Setup: `jest.setup.ts` (polyfills para TextEncoder/TextDecoder e crypto)
- Module mapping: `@/*` resolvido via `<rootDir>/src/*`
- Coverage ignora: node_modules, .next, e componentes UI

### Cypress (`cypress.config.ts`)

- `baseUrl`: `http://localhost:3000`
- `specPattern`: `e2e/**/*.cy.{js,jsx,ts,tsx}`
- `supportFile`: `cypress/support/e2e.ts`

## 🪝 Git Hooks (Lefthook)

Configurado automaticamente ao instalar dependências:

### Pre-commit

- ✅ **Prettier**: Formata arquivos staged
- ✅ **ESLint**: Lint com auto-fix

### Commit-msg

- ✅ **CommitLint**: Valida mensagem de commit

### Pre-push

- ✅ **Type Check**: Verifica tipos TypeScript
- ✅ **Tests**: Executa testes com coverage

## 🧪 Testes

### Estrutura

- Testes unitários junto aos componentes (`.spec.tsx`)
- Setup customizado via `src/lib/test-utils.tsx`
- Imports utilizando `@/lib/test-utils` em vez de `@testing-library/react`
- Testes E2E na raiz em `e2e/**/*.cy.ts`

### Testes E2E (Cypress)

1. Inicie a aplicação local:

```bash
npm run dev
```

2. Em outro terminal, execute os testes E2E:

```bash
npm run test:e2e
```

Ou abra a interface do Cypress:

```bash
npm run test:e2e:open
```

### Exemplo E2E

- Arquivo: `e2e/example.cy.ts`
- Cenário atual: acessa `/` e valida o título `Login`

### Exemplo

```tsx
import { render, screen } from '@/lib/test-utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## 🎨 Variáveis CSS Globais

Definidas em `src/app/globals.css`:

- `--color-background`: Cor de fundo principal
- `--color-foreground`: Cor de primeiro plano
- `--color-brand`: Cor de marca
- `--color-text-primary`: Texto principal
- `--color-text-secondary`: Texto secundário
- Cores de status: desired, active, consulting, pause
- Cores temáticas: dark-purple, card-bg, border

## 📝 Utilitários

### `cn()` - Merge de classes Tailwind

```tsx
import { cn } from '@/lib/utils';

// Combina e resolve conflitos de classes Tailwind
const buttonClass = cn('px-4 py-2 rounded', isActive && 'bg-blue-500');
```

## 🚦 Como Contribuir

1. Crie uma branch para sua feature:

```bash
git checkout -b feat/minha-feature
```

2. Faça commits seguindo Conventional Commits:

```bash
git commit -m "feat(login): adicionar validação de email"
```

3. Push para a branch:

```bash
git push origin feat/minha-feature
```

4. Abra um Pull Request

## 📌 Boas Práticas

- ✅ Use alias `@/` para imports (ESLint valida)
- ✅ Escreva testes para novos componentes
- ✅ Mantenha TypeScript strict mode habilitado
- ✅ Formate código com Prettier antes de commitar
- ✅ Siga Conventional Commits para mensagens
- ✅ Evite `console.log` desnecessários (ESLint valida)

## 🔍 Variáveis de Ambiente

O projeto suporta arquivo `.env.local` para variáveis de ambiente (exemplo):

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Jest Documentation](https://jestjs.io)
- [Testing Library](https://testing-library.com)
